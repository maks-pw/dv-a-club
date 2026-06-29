import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENTS_DATA } from "../../data/events";
import { createPageMetadata, eventJsonLd, JsonLdScript } from "../../lib/seo";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS_DATA.find((e) => e.id === id);

  if (!event) {
    return createPageMetadata({
      title: "Событие не найдено",
      description: "Запрошенное событие не найдено.",
      path: `/events/${id}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: event.title,
    description: event.shortDescription,
    path: `/events/${event.id}`,
    image: event.image,
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = EVENTS_DATA.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="main-program-container event-details-container">
      <JsonLdScript data={eventJsonLd(event)} />
      <header className="main-program-header event-details-header">
        <h1 className="main-program-title">{event.title}</h1>
        <p className="main-program-description">{event.shortDescription}</p>
        <div className="event-details-header-meta" style={{ marginTop: "8px" }}>
          <span className="event-card-date">{event.dates}</span>
          <span
            className={`event-card-status-badge ${
              event.status === "анонс"
                ? "status-announcement"
                : "status-report"
            }`}
          >
            {event.status === "анонс" ? "анонс" : "отчет"}
          </span>
        </div>
      </header>

      <div className="main-program-image-wrapper event-details-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="main-program-image"
        />
      </div>

      <div className="event-content-blocks">
        {event.content.map((block, index) => (
          <div key={index} className="event-content-block">
            {block.title && (
              <h2 className="event-block-heading">{block.title}</h2>
            )}

            {block.text && <p className="event-block-text">{block.text}</p>}

            {block.items && (
              <div className="event-block-items-list">
                {block.items.map((item, itemIdx) => {
                  const colonIndex = item.indexOf(":");
                  if (colonIndex !== -1) {
                    const title = item.substring(0, colonIndex + 1);
                    const description = item.substring(colonIndex + 1);
                    return (
                      <div key={itemIdx} className="event-block-list-item">
                        <span className="event-block-list-dot" />
                        <p className="event-block-text event-block-list-text">
                          <span className="event-block-list-item-title">{title}</span>
                          {description}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div key={itemIdx} className="event-block-list-item">
                      <span className="event-block-list-dot" />
                      <p className="event-block-text event-block-list-text">{item}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {block.image && (
              <div className="event-block-image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.image}
                  alt={event.title}
                  className="event-block-image"
                />
              </div>
            )}

            {block.link && (
              <div className="event-block-link-wrapper">
                <a
                  href={block.link.url}
                  target={
                    block.link.url.startsWith("http") ? "_blank" : "_self"
                  }
                  rel="noopener noreferrer"
                  className="event-block-link"
                >
                  {block.link.text}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="event-details-back-link-wrapper" style={{ marginTop: "40px" }}>
        <Link href="/events" className="event-details-back-link">
          ← Назад к событиям
        </Link>
      </div>
    </div>
  );
}
