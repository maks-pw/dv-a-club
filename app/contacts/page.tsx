import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты",
  description:
    "Свяжитесь с DV Aesthetic Club: телефон, Telegram, WhatsApp и почта для вопросов об участии в закрытых событиях и путешествиях.",
  path: "/contacts",
  image: "/interior_suzdal.png",
});

const phoneDisplay = "+7 (968) 429-00-00";
const phoneHref = "tel:+79684290000";
const telegramHref = "https://t.me/+79684290000";
const whatsappHref = "https://wa.me/79684290000";
const email = "info@dv-a-club.ru";

export default function Contacts() {
  return (
    <div className="contacts-page">
      <header className="contacts-hero">
        <h1>Контакты</h1>
      </header>

      <section className="contacts-panel" aria-label="Контактная информация">
        <div className="contacts-row">
          <span className="contacts-label">Телефон</span>
          <div className="contacts-value-group">
            <a className="contacts-value" href={phoneHref}>
              {phoneDisplay}
            </a>
            <a
              className="contacts-action"
              href={telegramHref}
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
            <a
              className="contacts-action"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="contacts-row">
          <span className="contacts-label">Почта</span>
          <a className="contacts-value" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
      </section>
    </div>
  );
}
