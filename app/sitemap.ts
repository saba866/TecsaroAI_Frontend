import type { MetadataRoute } from "next"

const BASE_URL = "https://ai.tecsaro.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Homepage ──────────────────────────────────────────────
    {
      url:             `${BASE_URL}/`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
    },

    // ── High-priority marketing ───────────────────────────────
    {
      url:             `${BASE_URL}/pricing`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             `${BASE_URL}/features`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/product`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/how-it-works`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/who-its-for`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${BASE_URL}/solutions`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.7,
    },
    

    // ── Company ───────────────────────────────────────────────
    {
      url:             `${BASE_URL}/about`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${BASE_URL}/contact`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.6,
    },
    {
      url:             `${BASE_URL}/faq`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.6,
    },
    {
      url:             `${BASE_URL}/security`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.5,
    },
    {
      url:             `${BASE_URL}/help`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.5,
    },

    // ── Auth ──────────────────────────────────────────────────
    {
      url:             `${BASE_URL}/signup`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.6,
    },
    {
      url:             `${BASE_URL}/login`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.5,
    },
    {
      url:             `${BASE_URL}/forgot-password`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.3,
    },
    {
      url:             `${BASE_URL}/reset-password`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.3,
    },

    // ── Legal ─────────────────────────────────────────────────
    {
      url:             `${BASE_URL}/privacy`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.4,
    },
    {
      url:             `${BASE_URL}/terms`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.4,
    },
    {
      url:             `${BASE_URL}/cookies`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.3,
    },
    {
      url:             `${BASE_URL}/refund`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.3,
    },
  ]
}