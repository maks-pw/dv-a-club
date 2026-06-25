import Link from "next/link";
import { EVENTS_DATA } from "../../data/events";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({
    id: event.id,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = EVENTS_DATA.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="main-program-container">
        <Link href="/" className="event-details-back-link">
          ← Назад к событиям
        </Link>
        <header className="main-program-header">
          <h1 className="main-program-title">Событие не найдено</h1>
          <p className="main-program-description">
            Запрошенное вами событие не существует или было перенесено.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="main-program-container event-details-container">
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
        <Link href="/" className="event-details-back-link">
          ← Назад к событиям
        </Link>
      </div>
    </div>
  );
}
