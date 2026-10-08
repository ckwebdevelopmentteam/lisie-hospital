import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Alex_Brush } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import TopBar from "@/components/hero/TopBar";
import StitchFooter from "@/components/footer/StitchFooter";
import { ModalProvider } from "@/context/ModalContext";
import ChatWidget from "@/components/chat/ChatWidget";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lisie Hospital | Care Beyond Cure Since 1956 | Kochi, Kerala",
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
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#17202A] font-sans antialiased selection:bg-[#1677B8] selection:text-white">
        <ModalProvider>
          <TopBar />
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <StitchFooter />
          <ChatWidget />
        </ModalProvider>
      </body>
    </html>
  );
}
