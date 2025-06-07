"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import dayjs from 'dayjs';

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [chapterAnalytics, setChapterAnalytics] = useState<any[]>([]);
  const [allPurchases, setAllPurchases] = useState<{ [comicId: string]: any[] }>({});
  const [loadingPurchases, setLoadingPurchases] = useState(false);

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/comics/analytics?userId=${user.uid}`)
      .then(res => res.json())
      .then(setChapterAnalytics);
  }, [user]);

  useEffect(() => {
    if (!chapterAnalytics.length) return;
    setLoadingPurchases(true);
    Promise.all(
      chapterAnalytics.map(comic =>
        fetch(`/api/comics/${comic.comicId}/purchases`).then(res => res.json().then(data => [comic.comicId, data]))
      )
    ).then(results => {
      setAllPurchases(Object.fromEntries(results));
      setLoadingPurchases(false);
    });
  }, [chapterAnalytics]);

  const pembelianPerChapterMap = useMemo(() => {
    const result: { [comicId: string]: Record<string, number> } = {};
    Object.entries(allPurchases).forEach(([comicId, purchases]) => {
      const map: Record<string, number> = {};
      const purchasesArr = Array.isArray(purchases) ? purchases : [];
      purchasesArr.forEach((p: any) => {
        const chapterId = p.chapterId || "unknown";
        map[chapterId] = (map[chapterId] || 0) + 1;
      });
      result[comicId] = map;
    });
    return result;
  }, [allPurchases]);

  if (!user && !loading) return null;

  return (
    <div className="main-content mt-32 mb-16">
      <div className="min-h-screen flex flex-col items-center py-8">
        <h1 className="text-3xl font-extrabold text-primary  mb-12">Analytik Komik</h1>
        {chapterAnalytics.length > 0 ? (
          chapterAnalytics.map(comic => {
            const purchases = allPurchases[comic.comicId] || [];
            const pembelianPerChapter = pembelianPerChapterMap[comic.comicId] || {};
            return (
              <div key={comic.comicId} className="mb-8 p-4 border rounded-xl bg-white shadow w-full max-w-6xl">
                <h3 className="font-bold text-lg mb-2">{comic.title}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    {comic.chapters.map((chap: any) => (
                      <div key={chap.id} className="p-3 border rounded-lg bg-gray-50 mb-2">
                        <div className="font-semibold">{chap.title}</div>
                        <div className="text-xs text-gray-500 mb-1">Urutan: {chap.order}</div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <b>View:</b> {chap.viewCount || 0} (baru), Total: {chap.totalViews || 0}
                            <br />Terakhir: {chap.lastViewTime ? new Date(chap.lastViewTime).toLocaleString() : "-"}
                          </div>
                          <div>
                            <b>Komentar:</b> {chap.commentCount || 0} (baru), Total: {chap.totalComments || 0}
                            <br />Terakhir: {chap.lastCommentTime ? new Date(chap.lastCommentTime).toLocaleString() : "-"}
                          </div>
                          <div>
                            <b>Pembelian:</b> {chap.totalPurchases || 0}x
                            <br />Terakhir: {chap.lastPurchaseTime ? new Date(chap.lastPurchaseTime).toLocaleString() : "-"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Chart for this comic */}
                  <div className="w-full md:w-96 h-72 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={comic.chapters.map((chap: any) => ({
                        name: chap.title,
                        Views: chap.totalViews,
                        Purchases: pembelianPerChapter[chap.id] || 0, // realtime dari Firestore
                        Comments: chap.totalComments,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Views" fill="#8884d8" />
                        <Bar dataKey="Purchases" fill="#82ca9d" />
                        <Bar dataKey="Comments" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Grafik pembelian per chapter dari Firestore purchases */}
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-2">Grafik Pembelian per Chapter</h3>
                  {loadingPurchases ? (
                    <div>Loading grafik pembelian...</div>
                  ) : purchases.length === 0 ? (
                    <div className="text-gray-500">Belum ada pembelian pada komik ini.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={Object.entries(pembelianPerChapter).map(([chapterId, count]) => ({
                        chapterId,
                        count,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="chapterId" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#4ade80" name="Pembelian" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500">Loading statistik...</div>
        )}
      </div>
    </div>
  );
} 