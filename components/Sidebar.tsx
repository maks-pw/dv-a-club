"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Crown, Phone } from "lucide-react";

const navItems = [
  { name: "Клуб", path: "/", icon: <Crown size={20} strokeWidth={1.5} /> },
  { name: "События", path: "/events", icon: <CalendarDays size={20} strokeWidth={1.5} /> },
  { name: "Контакты", path: "/contacts", icon: <Phone size={20} strokeWidth={1.5} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar-container">
      {/* Mobile-only Header */}
      <header className="sidebar-mobile-header">
        <Link href="/" className="brand-logo-link-mobile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-logo.svg" alt="DVAC Crest" className="brand-crest-mobile" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/text-logo.svg" alt="DVAesthetic Club" className="brand-text-logo-mobile" />
        </Link>
      </header>

      {/* Slanted Panel (Desktop only) */}
      <div className="sidebar-slant-panel">
        {/* Ornate Gold Logo Crest */}
        <Link href="/" className="brand-logo-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-logo.svg" alt="DVAC Crest" className="brand-crest" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/text-logo.svg" alt="DVAesthetic Club" className="brand-text-logo" />
        </Link>

        {/* Navigation Menu */}
        <nav className="sidebar-slant-nav">
          {navItems.map((item) => {
            const isActive =
              item.path === "/events"
                ? pathname === "/events" || pathname.startsWith("/events/")
                : pathname === item.path;
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

      {/* Mobile Fixed Navigation Bottom Bar */}
      <nav className="sidebar-mobile-nav">
        {navItems.map((item) => {
          const isActive =
            item.path === "/events"
              ? pathname === "/events" || pathname.startsWith("/events/")
              : pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`sidebar-mobile-link ${isActive ? "active" : ""}`}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              <span className="mobile-nav-label">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Privacy links at the bottom left - Desktop only */}
      <footer className="sidebar-privacy-footer sidebar-desktop-only">
        <Link href="/privacy" className="privacy-link">
          Политика конфиденциальности
        </Link>
        <Link href="/consent" className="privacy-link">
          Согласие на обработку персональных данных
        </Link>
      </footer>
    </div>
  );
}
