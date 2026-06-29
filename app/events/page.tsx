import type { Metadata } from "next";
import EventsList from "@/components/EventsList";
import { EVENTS_DATA } from "../data/events";
import { createPageMetadata, DEFAULT_DESCRIPTION } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "События и путешествия",
  description: DEFAULT_DESCRIPTION,
  path: "/events",
  image: EVENTS_DATA[0]?.image,
});

export default function EventsPage() {
  return <EventsList events={EVENTS_DATA} />;
}
