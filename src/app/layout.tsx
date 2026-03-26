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
  metadataBase: new URL("https://hassanrazadev.tech"),
  title: "Hassan Raza | Odoo Implementer & Functional Technical Consultant",
  description:
    "Portfolio of Hassan Raza, an Odoo implementer with expertise in both functional and technical consulting, ERP workflows, automation, and AI solutions.",
  keywords: [
    "Hassan Raza",
    "Odoo Implementer",
    "Functional Technical Consultant",
    "ERP Consultant",
    "Odoo Specialist",
    "AI Solutions Developer",
    "Full Stack Developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hassan Raza | Odoo Implementer & Functional Technical Consultant",
    description:
      "Explore the portfolio of Hassan Raza featuring Odoo implementation, ERP consulting, AI solutions, and full-stack development work.",
    url: "https://hassanrazadev.tech",
    siteName: "Hassan Raza Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hassan Raza portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Raza | Odoo Implementer & Functional Technical Consultant",
    description:
      "Portfolio of Hassan Raza featuring Odoo implementation, ERP consulting, automation, AI solutions, and full-stack development.",
    images: ["/opengraph-image"],
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
      className={`${inter.variable} ${poppins.variable} ${greatVibes.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#06080d] text-[#f5fbff] antialiased">
        {children}
      </body>
    </html>
  );
}
