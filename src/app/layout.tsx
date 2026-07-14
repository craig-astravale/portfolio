import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Nav } from "@/components/layout/Nav";
import { ContactDock } from "@/components/layout/ContactDock";
import { profile } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const siteUrl = "https://craigdutoit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.role}, Motion & 3D Web`,
  description: profile.summary,
  keywords: [
    "Craig du Toit",
    "Front-End Engineer",
    "GSAP",
    "Three.js",
    "React Three Fiber",
    "Motion",
    "Framer Motion",
    "Interactive 3D",
    "Motion Design",
    "South Africa",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="noise relative min-h-full overflow-x-hidden bg-bg text-ink">
        <SmoothScroll>
          <CustomCursor />
          <Nav />
          {children}
          <ContactDock />
        </SmoothScroll>
      </body>
    </html>
  );
}
