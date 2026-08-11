// The Work Mode sandbox does not expose the process data used by Node's
// native memoryUsage call. Load this file only for local build verification.
const memoryUsage = () => ({
  rss: 0,
  heapTotal: 0,
  heapUsed: 0,
  external: 0,
  arrayBuffers: 0,
});

memoryUsage.rss = () => 0;

Object.defineProperty(process, "memoryUsage", {
  configurable: true,
  value: memoryUsage,
  writable: true,
});
