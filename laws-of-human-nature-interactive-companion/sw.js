const SCOPE_PATH = "/laws-of-human-nature-interactive-companion/";
const CACHE_NAME = "human-nature-static-v1";
const PART_ROOT = "/static-sites/laws-of-human-nature-interactive-companion/site.tar.gz.part-";
const PARTS = ["00", "01", "02", "03", "04", "05", "06"].map((part) => PART_ROOT + part);

let preparing;

self.addEventListener("install", (event) => {
  event.waitUntil(prepare().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data !== "prepare") return;
  event.waitUntil(
    prepare()
      .then(() => event.ports[0]?.postMessage("ready"))
      .catch((error) => event.ports[0]?.postMessage({ error: String(error) })),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;
    if (event.request.mode === "navigate") {
      const fallback = await cache.match(SCOPE_PATH + "404.html");
      if (fallback) return fallback;
    }
    return fetch(event.request);
  })());
});

async function prepare() {
  if (preparing) return preparing;
  preparing = (async () => {
    const cache = await caches.open(CACHE_NAME);
    if (await cache.match(SCOPE_PATH + "__ready")) return;

    const responses = await Promise.all(PARTS.map(async (url) => {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`Archive part unavailable: ${url}`);
      return new Uint8Array(await response.arrayBuffer());
    }));

    const total = responses.reduce((sum, part) => sum + part.byteLength, 0);
    const compressed = new Uint8Array(total);
    let cursor = 0;
    for (const part of responses) {
      compressed.set(part, cursor);
      cursor += part.byteLength;
    }

    const decompressed = new Blob([compressed])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    const tar = new Uint8Array(await new Response(decompressed).arrayBuffer());
    const decoder = new TextDecoder();

    for (let offset = 0; offset + 512 <= tar.byteLength;) {
      const header = tar.subarray(offset, offset + 512);
      if (header.every((byte) => byte === 0)) break;

      const name = readString(header, 0, 100, decoder);
      const prefix = readString(header, 345, 155, decoder);
      const path = (prefix ? prefix + "/" : "") + name;
      const sizeText = readString(header, 124, 12, decoder).trim();
      const size = Number.parseInt(sizeText || "0", 8);
      const type = String.fromCharCode(header[156] || 48);
      const dataStart = offset + 512;

      if (type !== "5" && size >= 0) {
        const cleanPath = path.replace(/^\.\//, "");
        if (cleanPath) {
          const bytes = tar.slice(dataStart, dataStart + size);
          const headers = { "Content-Type": contentType(cleanPath), "Cache-Control": "public, max-age=31536000, immutable" };
          const response = new Response(bytes, { status: 200, headers });
          const fileUrl = new URL(SCOPE_PATH + cleanPath, self.location.origin).href;
          await cache.put(fileUrl, response.clone());

          if (cleanPath === "index.html") {
            await cache.put(new URL(SCOPE_PATH, self.location.origin).href, response.clone());
          } else if (cleanPath.endsWith("/index.html")) {
            const directory = cleanPath.slice(0, -"index.html".length);
            await cache.put(new URL(SCOPE_PATH + directory, self.location.origin).href, response.clone());
          }
        }
      }

      offset = dataStart + Math.ceil(size / 512) * 512;
    }

    await cache.put(SCOPE_PATH + "__ready", new Response("ready", { headers: { "Content-Type": "text/plain" } }));
  })().catch((error) => {
    preparing = undefined;
    throw error;
  });
  return preparing;
}

function readString(bytes, start, length, decoder) {
  const slice = bytes.subarray(start, start + length);
  const end = slice.indexOf(0);
  return decoder.decode(end === -1 ? slice : slice.subarray(0, end));
}

function contentType(path) {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (path.endsWith(".json") || path.endsWith(".map")) return "application/json; charset=utf-8";
  if (path.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".txt")) return "text/plain; charset=utf-8";
  return "application/octet-stream";
}
