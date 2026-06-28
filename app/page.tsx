import type { Metadata } from "next";
import EventsList from "@/components/EventsList";
import { EVENTS_DATA } from "./data/events";
import { createPageMetadata, DEFAULT_DESCRIPTION, SITE_NAME } from "./lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `События и путешествия | ${SITE_NAME}`,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  image: EVENTS_DATA[0]?.image,
});

export default function Home() {
  return <EventsList events={EVENTS_DATA} />;
}
