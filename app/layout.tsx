import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Nav } from "@/components/layouts/nav/nav";
import { Footer } from "@/components/layouts/footer/footer";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Definisikan konstanta untuk waktu revalidasi
const REVALIDATE_TIMES = {
  NEVER: false,        // Tidak pernah revalidate
  MINUTE: 60,         // Setiap menit
  HOUR: 3600,        // Setiap jam
  DAY: 86400,        // Setiap hari
  WEEK: 604800,      // Setiap minggu
  MONTH: 2592000,    // Setiap bulan
} as const;

export const metadata: Metadata = {
  title: "UKM PENRISTEK UT",
  description:
    "Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
  metadataBase: new URL("https://ukmpenristekut.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const revalidate = REVALIDATE_TIMES.DAY; // 24 jam

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}