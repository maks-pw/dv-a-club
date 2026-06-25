import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Stories from "@/components/Stories";

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
  title: "A-Club",
  description: "A premium social dashboard application layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
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

