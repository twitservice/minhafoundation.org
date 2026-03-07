import "./globals.css";
import { Poppins, Noto_Sans, Noto_Sans_Bengali } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary-en",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-secondary-en",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const fontVariables = `${poppins.variable} ${notoSans.variable} ${notoSansBengali.variable}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
