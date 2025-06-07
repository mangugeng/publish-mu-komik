import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import HeaderNav from "@/components/header-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MU Komik",
  description: "Platform komik digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <HeaderNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
