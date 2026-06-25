"use client";

export default function Club() {
  return (
    <div className="main-program-container">
      <header className="main-program-header">
        <h1 className="main-program-title">
          Эстетический
          <br />
          Клуб
        </h1>
        <p className="main-program-description">
          Закрытое сообщество ценителей искусства, дизайна и путешествий. Особые условия проживания и эксклюзивные сценарии.
        </p>
      </header>
      
      <div className="main-program-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/story_japan.png"
          alt="Клуб Япония"
          className="main-program-image"
        />
      </div>
    </div>
  );
}
