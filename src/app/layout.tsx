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
    <html lang="en">
      <body
        className={`
          ${fontJakarta.className}
          min-h-screen
          antialiased
          bg-linear-to-br
          from-black
          via-zinc-900
          to-black
        `}
      >
        <div className="bg-primary" />
        <main className="px-4 sm:px-6 md:px-10 lg:px-24 py-5">{children}</main>
      </body>
    </html>
  );
}
