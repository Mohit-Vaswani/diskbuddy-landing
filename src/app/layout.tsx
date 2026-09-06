import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { RegionScript } from "@/components/region";
import { SITE_URL } from "@/lib/product";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Google Analytics 4 measurement id, from the GA property's data stream. */
const GA_MEASUREMENT_ID = "G-5S8N8M6Q9V";

const description =
  "DiskBuddy is a Mac disk space analyzer that maps every byte on your drive, eight ways to see it, duplicate and leftover detection, and a staged cleanup that never deletes anything behind your back.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DiskBuddy - See what's eating your Mac's disk",
    template: "%s · DiskBuddy",
  },
  description,
  keywords: [
    "mac disk space analyzer",
    "macos storage cleaner",
    "treemap disk usage",
    "duplicate file finder mac",
    "app uninstaller mac",
  ],
  openGraph: {
    title: "DiskBuddy - See what's eating your Mac's disk",
    description,
    url: "/",
    siteName: "DiskBuddy",
    type: "website",
    images: [{ url: "/screens/treemap.jpeg", width: 2940, height: 1846 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiskBuddy - See what's eating your Mac's disk",
    description,
    images: ["/screens/treemap.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <RegionScript />
        {children}
        {/* DataFast analytics. In the root layout so it loads on every route. */}
        <Script
          src="https://datafa.st/js/script.js"
          data-website-id="dfid_4cL0Ro3JBk8saXdezj9ds"
          data-domain="diskbuddy.com"
          strategy="afterInteractive"
        />
        {/*
          Google Analytics 4. Client-side navigations are counted by GA's
          enhanced measurement, which listens for history changes, so the tag
          only has to load once here.
        */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
