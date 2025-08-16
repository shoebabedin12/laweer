import type { Metadata } from "next";
import { Mulish, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "./NextAuthProvider";

const mulish = Mulish({
  display: 'swap',
  subsets: ["latin"],
  variable: "--font-mulish",
  preload: true,
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  display: 'swap',
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  preload: true,
});

export const metadata: Metadata = {
  title: "Lawyer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${plus_jakarta_sans.variable} font-mulish`}
      >
        <NextAuthProvider>
          <ToastContainer />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
