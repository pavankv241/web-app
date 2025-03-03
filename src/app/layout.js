import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider"; // ✅ Import the provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto Price Tracker",
  description: "Live cryptocurrency price updates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider> {/* ✅ Wrap with Provider */}
      </body>
    </html>
  );
}
