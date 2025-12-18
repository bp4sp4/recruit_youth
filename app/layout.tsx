import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "에듀바이저스 - 채용 반창고",
  description: "에듀바이저스 - 채용 반창고",
  openGraph: {
    title: "에듀바이저스 - 채용 반창고",
    description: "에듀바이저스 - 채용 반창고",
    images: [
      {
        url: "/open.graph.png",
        width: 200,
        height: 30,
        alt: "한평생 에듀바이저스",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "에듀바이저스 - 채용 반창고",
    description: "에듀바이저스 - 채용 반창고",
    images: ["/open.graph.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: 'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
