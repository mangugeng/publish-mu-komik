"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, LogIn, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from 'next/image';

export default function AccountMenu() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coins, setCoins] = useState<{ creator: number; reward: number; diamond: number; reader: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (typeof data.coins === 'object' && data.coins !== null) {
            setCoins({
              creator: Number(data.coins.creator) || 0,
              reward: Number(data.coins.reward) || 0,
              diamond: Number(data.coins.diamond) || 0,
              reader: Number(data.coins.reader) || 0
            });
          } else {
            setCoins({ creator: 0, reward: 0, diamond: 0, reader: 0 });
          }
        } else {
          setCoins({ creator: 0, reward: 0, diamond: 0, reader: 0 });
        }
      } else {
        setCoins(null);
      }
    };
    fetchCoins();
    // Listen for coin-updated event
    const handler = () => fetchCoins();
    window.addEventListener("coin-updated", handler);
    return () => window.removeEventListener("coin-updated", handler);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.replace("/login");
  };

  const getTotalCoins = () => {
    if (!coins) return 0;
    return coins.creator + coins.reward + coins.diamond + coins.reader;
  };

  return (
    <div className="relative">
      {/* Overlay untuk close dropdown - dipindah ke atas agar tidak menutupi dropdown */}
      {open && (
        <div className="fixed inset-0 z-[99998]" onClick={() => setOpen(false)} />
      )}
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
      >
        {user && user.photoURL ? (
          <Image src={user.photoURL || ''} alt={user.displayName || 'avatar'} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary/60" />
          </div>
        )}
        <span className="hidden md:inline font-semibold text-sm">
          {user ? user.displayName || user.email?.split("@")[0] : "Akun"}
        </span>
      </button>
      {open && (
        <div
          className={
            isMobile
              ? "fixed left-2 right-2 bottom-14 mx-auto w-[95vw] max-w-xs bg-white rounded-xl shadow-lg border z-[99999] animate-fade-in"
              : "absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-[99999] animate-fade-in"
          }
          style={isMobile ? { minWidth: 220 } : {}}
        >
          <div className="p-4 border-b flex items-center gap-3">
            {user && user.photoURL ? (
              <Image src={user.photoURL || ''} alt={user.displayName || 'avatar'} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary/60" />
              </div>
            )}
            <div>
              <div className="font-bold text-base">{user ? user.displayName || "User" : "Tamu"}</div>
              <div className="text-xs text-muted-foreground break-all">{user ? user.email : "Belum login"}</div>
            </div>
          </div>
          {user && coins && (
            <div className="flex items-center gap-2 px-4 py-3 border-b">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-yellow-700">{getTotalCoins()} Coins</span>
            </div>
          )}
          <div className="py-2">
            {user ? (
              <>
                <Link href="/profile" className="block px-4 py-2 hover:bg-muted/50 transition text-sm" onClick={() => setOpen(false)}>Profile</Link>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition text-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-4 py-2 text-primary hover:bg-primary/10 transition text-sm flex items-center gap-2" onClick={() => setOpen(false)}>
                <LogIn className="w-4 h-4 mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 