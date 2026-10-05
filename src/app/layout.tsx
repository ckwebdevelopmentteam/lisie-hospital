import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Lisie Hospital | Care with Love | Ernakulam, Kerala",
  description:
    "Lisie Hospital, established in 1956 in Ernakulam, Kochi, is a premier NABH and NABL accredited tertiary hospital providing compassionate and ethical healthcare.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#17202A] antialiased selection:bg-[#1677B8] selection:text-white">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
