import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BlueLotus - Tempat nonton drama china gratis.",
  description: "Website untuk nonton drama china secara gratis.",
  icons: {
    icon: "/images/bluelotus.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`
          ${fontJakarta.className}
          min-h-screen
          antialiased
          bg-gradient-to-br
          from-black
          via-zinc-900
          to-black
        `}
      >
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.08),_transparent_60%)]" />
        <main className="px-4 sm:px-6 md:px-10 lg:px-24 py-5">{children}</main>
      </body>
    </html>
  );
}
