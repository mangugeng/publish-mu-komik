"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, AppWindow, Image, GalleryHorizontal, Book, DollarSign, FileText, LayoutDashboard, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AccountMenu from "@/components/AccountMenu";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload", mobile: false },
  { href: "/list", label: "List Komik", mobile: false },
  { href: "/pendapatan", label: "Pendapatan", mobile: false },
  { href: "/analytics", label: "Analitik", mobile: false },
  { href: "/about", label: "About", mobile: false },
];

function renderCreatorRewardCoins(user: any) {
  try {
    if (!user?.coins) return null;
    
    const coins = user.coins;
    const creator = typeof coins.creator === 'number' ? coins.creator : 0;
    const reward = typeof coins.reward === 'number' ? coins.reward : 0;
    
    if (typeof creator !== 'number' || typeof reward !== 'number') return null;
    
  return (
    <div className="flex items-center gap-2 mr-2">
      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Creator: {creator}</span>
      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Reward: {reward}</span>
    </div>
  );
  } catch (error) {
    console.error('Error rendering coins:', error);
    return null;
  }
}

export default function HeaderNav() {
  const pathname = usePathname();
  const [coins, setCoins] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  const [isSuperadmin, setIsSuperadmin] = useState(false);

  useEffect(() => {
    // Ambil dari localStorage jika ada
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user_coins");
      setCoins(stored ? parseInt(stored, 10) : 0);
      // Listen perubahan coin dari halaman lain
      const handler = () => {
        const updated = localStorage.getItem("user_coins");
        setCoins(updated ? parseInt(updated, 10) : 0);
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  }, []);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(token => {
        setIsSuperadmin(token.claims.role === "superadmin");
      });
    } else {
      setIsSuperadmin(false);
    }
  }, [user]);

  return (
    <>
      {/* Desktop header nav */}
      <header className="w-full bg-white shadow fixed top-0 left-0 z-[99999] hidden md:block">
        <nav className="container mx-auto flex items-center gap-6 px-4 py-3">
          <Link href="/" className="flex items-center">
            <Logo size="sm" variant="default" compact={true} />
          </Link>
          {navLinks.map(link => {
            if (["/upload", "/list", "/pendapatan", "/analytics"].includes(link.href) && !user) return null;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  `transition-colors hover:text-primary text-lg` +
                  (pathname === link.href || (link.href !== "/" && (pathname ?? '').startsWith(link.href))
                    ? " text-primary font-bold"
                    : " text-gray-700")
                }
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex-1" />
          {user && renderCreatorRewardCoins(user)}
          {/* Ganti semua tombol kanan dengan AccountMenu */}
          <AccountMenu />
        </nav>
      </header>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow z-[9999] flex justify-around md:hidden border-t">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors ${pathname === '/' ? 'text-primary font-bold' : 'text-gray-500'}`}
        >
          <div className="w-8 h-4 mb-1">
            <Logo size="xs" variant="default" compact={true} />
          </div>
          <span className="mt-1">Home</span>
        </Link>
        {/* Upload Komik icon, only show if user is logged in */}
        {user && (
          <Link
            href="/upload"
            className={`flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors ${pathname === '/upload' ? 'text-primary font-bold' : 'text-gray-500'}`}
            title="Upload Komik"
          >
            <Upload className="h-5 w-5 mb-0.5" />
            <span className="mt-1">Upload</span>
          </Link>
        )}
        {user && renderCreatorRewardCoins(user)}
        <div className="flex-1 flex items-center justify-center py-2">
          <AccountMenu />
        </div>
      </nav>
    </>
  );
} 