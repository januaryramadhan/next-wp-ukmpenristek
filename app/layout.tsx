import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Nav } from "@/components/layouts/nav/nav";
import { Footer } from "@/components/layouts/footer/footer";
import { cn } from "@/libs/utils";
import { Suspense } from "react";
import Loading from "./loading";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ukmpenristekut.site"),
  title: {
    default: "UKM PENRISTEK UT",
    template: "%s | UKM PENRISTEK UT",
  },
  description:
    "Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
  keywords: [
    "UKM PENRISTEK",
    "Universitas Terbuka",
    "Pendidikan",
    "Riset", 
    "Teknologi",
    "Mahasiswa",
  ],
  authors: [
    {
      name: "UKM PENRISTEK UT",
      url: "https://ukmpenristekut.site",
    },
  ],
  creator: "UKM PENRISTEK UT",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ukmpenristekut.site",
    title: "UKM PENRISTEK UT",
    description: "Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
    siteName: "UKM PENRISTEK UT",
    images: [
      {
        url: "https://i.ibb.co.com/tz7M615/og-image.jpg", // Pastikan gambar ini ada di direktori public/images
        width: 1200,
        height: 630,
        alt: "UKM PENRISTEK UT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UKM PENRISTEK UT", 
    description: "Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
    creator: "@ukmpenristekut",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

// Using static value for revalidation
export const revalidate = 7200; 

// Dynamic params config
export const dynamicParams = false;

// Generate static params
export const generateStaticParams = async () => {
  return [];
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// Loading component for navigation
function NavLoading() {
  return <div className="h-16 bg-background/80 backdrop-blur-sm" />;
}

// Loading component for footer
function FooterLoading() {
  return <div className="h-[400px] bg-muted/50" />;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Suspense fallback={<NavLoading />}>
              <Nav />
            </Suspense>

            <main className="flex-1">
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </main>

            <Suspense fallback={<FooterLoading />}>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}