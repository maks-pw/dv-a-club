"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Программы", path: "/" },
  { name: "Клуб", path: "/club" },
  { name: "Контакты", path: "/contacts" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar-container">
      {/* Slanted top panel matching reference */}
      <div className="sidebar-slant-panel">
        {/* Ornate Gold Logo Crest */}
        <div className="brand-logo-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-logo.svg" alt="DVAC Crest" className="brand-crest" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/text-logo.svg" alt="DVAesthetic Club" className="brand-text-logo" />
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-slant-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`sidebar-slant-link ${isActive ? "active" : ""}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Privacy links at the bottom left - Desktop only */}
      <footer className="sidebar-privacy-footer sidebar-desktop-only">
        <a href="/privacy" className="privacy-link">
          Политика конфиденциальности
        </a>
        <a href="/consent" className="privacy-link">
          Согласие на обработку персональных данных
        </a>
      </footer>
    </div>
  );
}
