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

// Absolute base for resolving OG/Twitter image URLs. Auto-detects the Vercel
// production domain; override with NEXT_PUBLIC_SITE_URL for a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Cloak — a private remote for your coding agent";
const description =
  "See and take over every Claude Code session on your Mac from your phone — full terminal and chat, over a direct end-to-end-encrypted tunnel. No account, no cloud, self-hosted, free. npx cloak-remote.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description: "See and take over every Claude Code session on your Mac from your phone. Nothing leaves your machines. npx cloak-remote",
    type: "website",
    siteName: "Cloak",
    url: "/",
    // Image is supplied automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "See and take over every Claude Code session on your Mac from your phone. Nothing leaves your machines. npx cloak-remote",
    // Image is supplied automatically by app/twitter-image.tsx
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
