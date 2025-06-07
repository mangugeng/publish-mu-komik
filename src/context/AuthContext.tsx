"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createSessionCookie = async (idToken: string) => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create session');
      }
    } catch (error) {
      console.error('Session creation error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Get ID token and create session cookie
      const idToken = await user.getIdToken();
      await createSessionCookie(idToken);

      // Cek apakah dokumen user sudah ada
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          coins: {
            creator: 1000,
            reader: 500,
            reward: 0,
            diamond: 0
          },
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date().toISOString()
        });
      }
      setUser(user);
      // Update localStorage coin
      const latestDoc = await getDoc(doc(db, "users", user.uid));
      const coins = latestDoc.exists() ? latestDoc.data().coins || { creator: 0, reader: 0, reward: 0, diamond: 0 } : { creator: 0, reader: 0, reward: 0, diamond: 0 };
      if (typeof window !== "undefined") {
        localStorage.setItem("user_coins", JSON.stringify(coins));
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Get ID token and create session cookie
      const idToken = await user.getIdToken();
      await createSessionCookie(idToken);

      if (user) {
        setUser(user);
        // Update localStorage coin
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const coins = userDoc.exists() ? userDoc.data().coins || { creator: 0, reader: 0, reward: 0, diamond: 0 } : { creator: 0, reader: 0, reward: 0, diamond: 0 };
        if (typeof window !== "undefined") {
          localStorage.setItem("user_coins", JSON.stringify(coins));
        }
      }
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  };

  const registerWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }

      // Get ID token and create session cookie
      const idToken = await cred.user.getIdToken();
      await createSessionCookie(idToken);

      await setDoc(doc(db, "users", cred.user.uid), {
        coins: {
          creator: 1000,
          reader: 500,
          reward: 0,
          diamond: 0
        },
        email,
        displayName,
        createdAt: new Date().toISOString()
      });
      setUser(auth.currentUser);
      // Update localStorage coin
      if (typeof window !== "undefined") {
        localStorage.setItem("user_coins", JSON.stringify({ creator: 1000, reader: 500, reward: 0, diamond: 0 }));
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      // Clear session cookie
      await fetch('/api/auth/session', { method: 'DELETE' });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}; 