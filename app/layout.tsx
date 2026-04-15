import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ProgressBar from "@/components/ProgressBar";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bảo tàng Dừa Sáp | Cầu Kè, Trà Vinh",
  description:
    "Bảo tàng lưu giữ và giới thiệu giá trị văn hóa, lịch sử của giống dừa quý hiếm Dừa Sáp Cầu Kè, Trà Vinh.",
  keywords: ["dừa sáp", "Cầu Kè", "Trà Vinh", "bảo tàng", "du lịch"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-amber-50 text-amber-950">
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
