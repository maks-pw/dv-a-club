import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Stories from "@/components/Stories";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  JsonLdScript,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from "./lib/seo";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <JsonLdScript data={[organizationJsonLd(), websiteJsonLd()]} />
        <div className="layout-container">
          <aside className="layout-sidebar">
            <Sidebar />
          </aside>
          <div className="layout-content-scrollable">
            <div className="layout-stories">
              <Stories />
            </div>
            <main className="layout-main">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
