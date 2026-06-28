"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for smooth entry after load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-wrapper">
      <div className="cookie-banner-content">
        <p className="cookie-banner-text">
          Мы используем cookies для улучшения работы сайта. Продолжая
          пользоваться сайтом, вы соглашаетесь с использованием cookies и{" "}
          <Link href="/privacy" className="cookie-banner-link">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="cookie-banner-button"
        >
          принять
        </button>
      </div>
    </div>
  );
}
