"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import HeaderNav from "@/components/header-nav";
import { Coins, Pencil } from "lucide-react";
import Image from "next/image";
import { updateProfile, updatePassword } from "firebase/auth";
import { useRouter } from 'next/navigation';

interface UserData {
  displayName: string;
  email: string;
  photoURL: string;
  coins: {
    creator: number;
    reward: number;
    diamond: number;
    reader: number;
  };
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            displayName: data.displayName || user.displayName || "",
            email: data.email || user.email || "",
            photoURL: data.photoURL || user.photoURL || "",
            coins: {
              creator: Number(data.coins?.creator) || 0,
              reward: Number(data.coins?.reward) || 0,
              diamond: Number(data.coins?.diamond) || 0,
              reader: Number(data.coins?.reader) || 0,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user]);

  const handleEdit = () => {
    if (!userData) return;
    setEditName(userData.displayName);
    setEditPhoto(userData.photoURL);
    setEditMode(true);
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        displayName: editName,
        photoURL: editPhoto,
      });
      // Update Auth profile (displayName, photoURL)
      await updateProfile(user, { displayName: editName, photoURL: editPhoto });
      // Update password jika diisi
      if (editPassword) {
        await updatePassword(user, editPassword);
      }
      setUserData(prev => prev ? { ...prev, displayName: editName, photoURL: editPhoto } : prev);
      setEditMode(false);
      setSuccessMsg("Profile updated successfully!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user && !loading) return null;
  if (!userData) return null;

  if (loading) {
    return (
      <div className="min-h-screen">
        <HeaderNav />
        <div className="container mx-auto px-4 py-8 mt-24">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content mt-24 mb-16">
      <HeaderNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-6 mb-8">
              {userData.photoURL ? (
                <Image
                  src={userData.photoURL}
                  alt={userData.displayName}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl text-primary/60">
                    {userData.displayName?.[0]?.toUpperCase() || "U"}
                  </span>
              </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.displayName}</h1>
                <p className="text-gray-600">{userData.email}</p>
                <button
                  className="mt-2 flex items-center gap-1 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 transition text-sm"
                  onClick={handleEdit}
                >
                  <Pencil className="w-4 h-4" /> Edit Profile
                </button>
              </div>
            </div>

            {editMode && (
              <form onSubmit={handleSave} className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                  />
          </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    value={userData.email}
                    readOnly
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Photo URL</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={editPhoto}
                    onChange={e => setEditPhoto(e.target.value)}
                  />
                  </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password Baru (opsional)</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    value={editPassword}
                    onChange={e => setEditPassword(e.target.value)}
                  />
                  </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                    onClick={() => setEditMode(false)}
                    disabled={saving}
                  >
                    Batal
                  </button>
                    </div>
                {successMsg && <div className="text-green-600 text-sm mt-2">{successMsg}</div>}
                {errorMsg && <div className="text-red-600 text-sm mt-2">{errorMsg}</div>}
              </form>
            )}

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                Coin Balance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-yellow-500/10 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600">Creator</div>
                  <div className="text-xl font-bold text-yellow-700">{userData.coins.creator}</div>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg">
                  <div className="text-sm text-green-600">Reward</div>
                  <div className="text-xl font-bold text-green-700">{userData.coins.reward}</div>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-lg">
                  <div className="text-sm text-blue-600">Diamond</div>
                  <div className="text-xl font-bold text-blue-700">{userData.coins.diamond}</div>
                </div>
                <div className="bg-purple-500/10 p-4 rounded-lg">
                  <div className="text-sm text-purple-600">Reader</div>
                  <div className="text-xl font-bold text-purple-700">{userData.coins.reader}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 