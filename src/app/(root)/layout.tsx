import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SapiHive | Workforce-as-a-Service",
  description: "Human Intelligence, organized like a Hive.",
};

export default function RootLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
