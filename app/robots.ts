import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",      // private — logged-in only
          "/onboarding/",     // private — logged-in only
          "/auth/",           // auth callbacks
          "/api/",            // API routes
          "/reset-password",  // no value indexing this
        ],
      },
    ],
    sitemap: "https://ai.tecsaro.com/sitemap.xml",
  }
}