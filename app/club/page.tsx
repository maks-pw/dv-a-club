import type { Metadata } from "next";
import { BookOpen, Lightbulb, Map, Music, Palette, Utensils } from "lucide-react";
import { createPageMetadata } from "../lib/seo";

const clubMoments = [
  {
    icon: BookOpen,
    text: "Литературный вечер при свечах.",
  },
  {
    icon: Music,
    text: "Закрытый концерт в необычном пространстве.",
  },
  {
    icon: Utensils,
    text: "Ужин, где разговоры становятся важнее меню.",
  },
  {
    icon: Map,
    text: "Путешествие, раскрывающее не достопримечательности, а душу места.",
  },
  {
    icon: Lightbulb,
    text: "Лекция, после которой хочется смотреть на мир иначе.",
  },
  {
    icon: Palette,
    text: "Творческий проект, который помогает открыть новые грани себя.",
  },
];

const luxuryStatements = [
  "Настоящая роскошь — это впечатления, которые невозможно купить в открытом доступе.",
  "Люди, с которыми хочется продолжать разговор.",
  "Время, проведенное осознанно.",
  "Возможность не спешить.",
  "Возможность чувствовать.",
];

export const metadata: Metadata = createPageMetadata({
  title: "Клуб",
  description:
    "DV Aesthetic Club — закрытое сообщество для тех, кто выбирает культуру, красоту, развитие и камерные впечатления.",
  path: "/club",
  image: "/interior_suzdal.png",
});

export default function Club() {
  return (
    <div className="club-page">
      {/* Hero Section */}
      <section className="club-hero" aria-labelledby="club-title">
        <div className="club-hero-copy">
          {/* <p className="club-eyebrow">Закрытое сообщество</p> */}
          <h1 id="club-title" className="club-title">
            DV Aesthetic Club
          </h1>
          <p className="club-subtitle">
            Закрытое сообщество людей, объединенных любовью к культуре,
            красоте, развитию и осмысленным впечатлениям.
          </p>
          <p className="club-lead">
            Мы создали DV Aesthetic Club для тех, кто ищет не развлечения, а
            переживания. Не массовые события, а моменты, которые остаются с
            нами на годы.
          </p>
        </div>

        <figure className="club-hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/club-2.jpg"
            alt="Интерьер для камерной встречи DV Aesthetic Club"
            className="club-hero-image"
          />
        </figure>
      </section>

      {/* Manifesto Section */}
      <section className="club-manifesto" aria-label="Манифест клуба">
        <div className="club-manifesto-lines">
          <p>Не все путешествия оставляют след.</p>
          <p>Не каждое мероприятие становится воспоминанием.</p>
          <p>Не каждая встреча меняет человека.</p>
        </div>
        <div className="club-manifesto-text">
          <p>
            Это сообщество людей, объединенных любознательностью, вкусом к
            жизни и стремлением окружать себя красотой во всех ее проявлениях.
          </p>
          <p>
            Мы исследуем искусство и культуру, открываем новые города и страны,
            обсуждаем идеи, создаем, вдохновляемся и вдохновляем друг друга.
          </p>
        </div>
      </section>

      {/* Moments Table Section */}
      <section className="club-section" aria-labelledby="club-stories-title">
        <div className="club-section-heading">
          <h2 id="club-stories-title">Каждое событие клуба — это отдельная история.</h2>
        </div>

        <div className="club-moments-grid">
          {clubMoments.map(({ icon: Icon, text }) => (
            <article className="club-moment" key={text}>
              <span className="club-moment-icon" aria-hidden="true">
                <Icon />
              </span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quiet Luxury Section */}
      <section className="club-luxury" aria-labelledby="club-luxury-title">
        <figure className="club-luxury-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/club-1.jpg"
            alt="Культурное путешествие DV Aesthetic Club"
            className="club-luxury-image"
          />
        </figure>
        <div className="club-luxury-content">
          <h2 id="club-luxury-title">
            Мы знаем, что настоящая роскошь сегодня — это не вещи.
          </h2>
          <div className="club-luxury-list">
            {luxuryStatements.map((statement) => (
              <p key={statement}>{statement}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Signature Section */}
      <section className="club-closing" aria-label="Для кого клуб">
        <p>
          DV Aesthetic Club — это пространство для тех, кто выбирает жить не
          поверхностно, а глубоко.
        </p>
      </section>
    </div>
  );
}
