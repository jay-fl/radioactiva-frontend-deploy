import type { Metadata } from "next";
import { Outfit } from 'next/font/google'
import "./globals.css";
//import MainNav from "@/components/ui/MainNav";

const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Radio Activa",
  description: "Radio Activa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} `}
      >
        {/* <MainNav /> */}
        {children}
      </body>
    </html>
  );
}
