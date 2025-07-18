"use client";

import React from "react";
import UploadKomikForm from "@/components/UploadKomikForm";
import HeaderNav from "@/components/header-nav";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);
  if (!user && !loading) return null;
  return (
    <>
      <HeaderNav />
      <div className="main-content mt-16 md:mt-32 mb-20 md:mb-16">
        <UploadKomikForm />
      </div>
    </>
  );
} 