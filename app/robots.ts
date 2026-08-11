import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/writing/", "/work/ld-operating-manual/", "/work/role-based-learning-paths/", "/work/marriott-culture-week/"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
