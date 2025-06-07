"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Loader2, Chrome } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading, loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.replace("/profile");
    }
  }, [user, loading, router]);

  if (user && !loading) {
    return null;
  }

  const handleGoogle = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      router.replace("/profile");
    } catch (e: any) {
      setError(e.message || "Gagal login dengan Google");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password, displayName);
      } else {
        await loginWithEmail(email, password);
      }
      router.replace("/profile");
    } catch (e: any) {
      setError(e.message || "Gagal login/register");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">{isRegister ? "Daftar Akun" : "Login"}</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>}
        <Button
          onClick={handleGoogle}
          disabled={isSubmitting}
          className="w-full flex items-center gap-2 justify-center bg-white border text-gray-700 hover:bg-gray-50"
          variant="outline"
        >
          <Chrome className="w-5 h-5" />
          Lanjutkan dengan Google
        </Button>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <form onSubmit={handleEmail} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium mb-1">Nama</label>
              <Input
                type="text"
                placeholder="Nama Lengkap"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Password</label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isRegister ? "Daftar" : "Login"}
          </Button>
        </form>
        <div className="text-center text-sm mt-2">
          {isRegister ? (
            <>
              Sudah punya akun?{' '}
              <button className="text-primary underline" onClick={() => setIsRegister(false)} disabled={isSubmitting}>
                Login
              </button>
            </>
          ) : (
            <>
              Belum punya akun?{' '}
              <button className="text-primary underline" onClick={() => setIsRegister(true)} disabled={isSubmitting}>
                Daftar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 