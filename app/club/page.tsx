const clubMoments = [
  "Литературный вечер при свечах.",
  "Закрытый концерт в необычном пространстве.",
  "Ужин, где разговоры становятся важнее меню.",
  "Путешествие, раскрывающее не достопримечательности, а душу места.",
  "Лекция, после которой хочется смотреть на мир иначе.",
  "Творческий проект, который помогает открыть новые грани себя.",
];

const luxuryStatements = [
  "Впечатления, которые невозможно купить в открытом доступе.",
  "Люди, с которыми хочется продолжать разговор.",
  "Время, проведенное осознанно.",
  "Возможность не спешить.",
  "Возможность чувствовать.",
];

export default function Club() {
  return (
    <div className="club-page">
      <section className="club-hero" aria-labelledby="club-title">
        <div className="club-hero-copy">
          <p className="club-eyebrow">Закрытое сообщество</p>
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
            src="/interior_suzdal.png"
            alt="Интерьер для камерной встречи DV Aesthetic Club"
            className="club-hero-image"
          />
        </figure>
      </section>

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

      <section className="club-section" aria-labelledby="club-stories-title">
        <div className="club-section-heading">
          <p className="club-kicker">Каждое событие клуба</p>
          <h2 id="club-stories-title">Отдельная история</h2>
        </div>

        <div className="club-moments-grid">
          {clubMoments.map((moment, index) => (
            <article className="club-moment" key={moment}>
              <span className="club-moment-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{moment}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="club-luxury" aria-labelledby="club-luxury-title">
        <div className="club-luxury-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/story_japan_2.png"
            alt="Культурное путешествие DV Aesthetic Club"
            className="club-luxury-image"
          />
        </div>
        <div className="club-luxury-content">
          <p className="club-kicker">Тихая роскошь</p>
          <h2 id="club-luxury-title">
            Мы верим, что настоящая роскошь сегодня - это не вещи.
          </h2>
          <div className="club-luxury-list">
            {luxuryStatements.map((statement) => (
              <p key={statement}>{statement}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="club-closing" aria-label="Для кого клуб">
        <p>
          DV Aesthetic Club - это пространство для тех, кто выбирает жить не
          поверхностно, а глубоко.
        </p>
      </section>
    </div>
  );
}
