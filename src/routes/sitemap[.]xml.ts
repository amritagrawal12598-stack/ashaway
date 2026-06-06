import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/lib/products";

const BASE_URL = "https://ashaway.ashaway300.workers.dev";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          { path: "/", priority: "1.0" },
          { path: "/shop", priority: "0.9" },
          { path: "/about", priority: "0.7" },
          { path: "/faq", priority: "0.6" },
          { path: "/contact", priority: "0.6" },
          { path: "/shipping", priority: "0.4" },
          { path: "/privacy", priority: "0.3" },
          { path: "/terms", priority: "0.3" },
          ...products.map((p) => ({ path: `/shop/${p.slug}`, priority: "0.8" })),
        ];
        const urls = paths
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});