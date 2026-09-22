import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/signature/Preloader";
import CustomCursor from "@/components/signature/CustomCursor";
import CropMarks from "@/components/signature/CropMarks";
import SectionIndex from "@/components/signature/SectionIndex";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "kern dev — Studio de développement web",
    template: "%s — kern dev",
  },
  description:
    "kern dev conçoit des sites vitrines d'exception, des produits SaaS robustes et des automatisations IA qui travaillent pour vous.",
  metadataBase: new URL("https://kerndev.fr"),
};

export const viewport: Viewport = {
  themeColor: "#0e0c09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="grain">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Preloader />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <CustomCursor />
        <CropMarks />
        <SectionIndex />
      </body>
    </html>
  );
}
