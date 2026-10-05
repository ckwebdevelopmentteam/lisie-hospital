import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Alex_Brush } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import StitchNavbar from "@/components/navbar/StitchNavbar";
import StitchFooter from "@/components/footer/StitchFooter";

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
  title: "Lisie Hospital Kochi | Care Beyond Cure Since 1956",
  description:
    "For over 68 years, delivering empathetic tertiary healthcare, pioneering advanced cardiology, and providing healing with human warmth across Kochi, Kerala.",
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
      <body className="min-h-screen flex flex-col bg-warmgray-50 text-stone-800 font-sans antialiased selection:bg-burgundy-700 selection:text-white">
        <ModalProvider>
          <StitchNavbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <StitchFooter />
        </ModalProvider>
      </body>
    </html>
  );
}
