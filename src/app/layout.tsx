import type { Metadata, Viewport } from "next";
import { Martian_Mono, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Martian_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cloak — a private remote for your coding agent",
  description:
    "Drive Claude Code from your phone over a direct, end-to-end-encrypted tunnel. No account, no cloud, self-hosted, free. npx cloak-remote.",
  openGraph: {
    title: "Cloak — a private remote for your coding agent",
    description:
      "Drive Claude Code from your phone. Nothing leaves your machines. npx cloak-remote",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
