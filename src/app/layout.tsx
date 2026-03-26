import type { Metadata } from "next";
import { Great_Vibes, Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hassan Raza | ERP Functional Consultant & Full-Stack Developer",
  description:
    "Professional portfolio of Hassan Raza - ERP Functional Consultant, Odoo Specialist, and AI Solutions Developer.",
  keywords: [
    "Hassan Raza",
    "ERP Functional Consultant",
    "Odoo Specialist",
    "Full Stack Developer",
    "AI Solutions Developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${greatVibes.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#06080d] text-[#f5fbff] antialiased">
        {children}
      </body>
    </html>
  );
}
