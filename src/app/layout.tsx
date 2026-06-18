import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Damini Shukla | Content Creator & Vedic Astrologer",
  description: "The personal brand hub for Damini Shukla — content creator and professional Vedic astrologer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="m-0 p-0 bg-[#0A0A12] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
