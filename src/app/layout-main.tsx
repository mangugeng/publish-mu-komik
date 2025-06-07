import { Suspense } from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderNav from "@/components/header-nav";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mu-Komik | Publish Your Comic",
  description: "Buat prompt yang optimal untuk menghasilkan komik dengan bantuan AI",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Background dinamis berdasarkan waktu
  const hour = new Date().getHours();
  let bgNumber = 0;
  if (hour >= 5 && hour < 11) {
    bgNumber = 1; // pagi
  } else if (hour >= 11 && hour < 16) {
    bgNumber = 2; // siang
  } else if (hour >= 16 && hour < 19) {
    bgNumber = 3; // sore
  } else if (hour >= 19 && hour <= 23) {
    bgNumber = 4; // malam
  } else {
    bgNumber = 0; // dini hari
  }
  const bgImage = `/bg${bgNumber}.png`;

  return (
    <AuthProvider>
      <div
        className="min-h-screen bg-gray-50 w-full"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <HeaderNav />
        <main className="pt-16 md:pt-20 flex flex-col items-center">
          <div className="w-full max-w-7xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
