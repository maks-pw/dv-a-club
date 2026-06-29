import type { MetadataRoute } from "next";
import { EVENTS_DATA } from "./data/events";
import { absoluteUrl } from "./lib/seo";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/events"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/contacts"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const eventRoutes: MetadataRoute.Sitemap = EVENTS_DATA.map((event) => ({
    url: absoluteUrl(`/events/${event.id}`),
    lastModified,
    changeFrequency: event.status === "анонс" ? "weekly" : "monthly",
    priority: event.status === "анонс" ? 0.9 : 0.6,
    images: [absoluteUrl(event.image)],
  }));

  return [...staticRoutes, ...eventRoutes];
}
