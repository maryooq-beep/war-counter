import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://war-counter-online-realtime.vercel.app"),
  title: "Russian War Counter — Real-Time Cost of Russia’s War in Ukraine",
  description:
    "A real-time online counter showing Russia’s estimated spending on the war in Ukraine, deaths, drones and missiles launched, and what this money could have built instead.",
  icons: {
    icon: [
      {
        url: "/images/favicon.ico",
        sizes: "any",
      },
      {
        url: "/images/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://war-counter-online-realtime.vercel.app/",
    title: "Russian War Counter — Real-Time Cost of Russia’s War in Ukraine",
    description:
      "A real-time online counter showing Russia’s estimated spending on the war in Ukraine, deaths, drones and missiles launched, and what this money could have built instead.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Russian War Counter — Real-Time Cost of Russia’s War in Ukraine",
    description:
      "A real-time online counter showing Russia’s estimated spending on the war in Ukraine, deaths, drones and missiles launched, and what this money could have built instead.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
