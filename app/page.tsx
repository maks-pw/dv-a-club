"use client";

import { useState } from "react";
import Link from "next/link";
import { EVENTS_DATA } from "./data/events";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "future" | "past">("all");

  const filteredEvents = EVENTS_DATA.filter((event) => {
    if (activeTab === "future") return event.status === "анонс";
    if (activeTab === "past") return event.status === "отчет";
    return true;
  });

  return (
    <div className="main-program-container">
      <div className="events-filter-container">
        <div className="events-filter-tabs">
          <button
            onClick={() => setActiveTab("all")}
            className={`events-filter-tab ${activeTab === "all" ? "active" : ""}`}
          >
            Все
          </button>
          <button
            onClick={() => setActiveTab("future")}
            className={`events-filter-tab ${activeTab === "future" ? "active" : ""}`}
          >
            Будущие
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`events-filter-tab ${activeTab === "past" ? "active" : ""}`}
          >
            Прошедшие
          </button>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="event-card"
          >
            <div className="event-card-image-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title}
                className="event-card-image"
              />
              <div className="event-card-overlay" />
            </div>

            <div className="event-card-info">
              <div className="event-card-meta">
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
              <h2 className="event-card-title">{event.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
