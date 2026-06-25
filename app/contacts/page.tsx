"use client";

export default function Contacts() {
  return (
    <div className="main-program-container">
      <header className="main-program-header">
        <h1 className="main-program-title">
          Наши
          <br />
          Контакты
        </h1>
        <p className="main-program-description">
          Свяжитесь с нами для бронирования путешествий и вступления в Aesthetic Club.
        </p>
      </header>
      
      <div className="contacts-details-list">
        <div className="contact-item-row">
          <span className="contact-label">Телефон:</span>
          <span className="contact-value">+7 (999) 123-45-67</span>
        </div>
        <div className="contact-item-row">
          <span className="contact-label">Email:</span>
          <span className="contact-value">info@dvaesthetic.club</span>
        </div>
        <div className="contact-item-row">
          <span className="contact-label">Адрес:</span>
          <span className="contact-value">Суздаль, ул. Ленина, д. 24</span>
        </div>
      </div>
    </div>
  );
}
