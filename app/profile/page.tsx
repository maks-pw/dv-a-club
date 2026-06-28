import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = createPageMetadata({
  title: "Профиль",
  description: "Демо-страница профиля DV Aesthetic Club.",
  path: "/profile",
  noIndex: true,
});

export default function Profile() {
  return <ProfileClient />;
}
