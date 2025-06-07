"use client";

import React, { useState, useEffect } from "react";
import { Comic } from "@/types/comic";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ListPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [comics, setComics] = useState<Comic[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchComics = async () => {
      try {
        const response = await fetch(`/api/comics?authorId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setComics(data);
        }
      } catch (error) {
        // handle error
      }
    };
    fetchComics();
  }, [user]);

  if (!user && !loading) return null;

  return (
    <div className="main-content mt-32 mb-16">
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
        <h1 className="text-3xl font-extrabold text-primary  mb-20">Daftar Komik</h1>
        <div className="space-y-4 w-full max-w-6xl">
          {comics.map(comic => (
            <div key={comic.id} className="p-4 border rounded-lg bg-white flex flex-col md:flex-row gap-4 items-start">
              <Image src={comic.cover} alt="Cover" width={128} height={176} className="w-32 h-44 object-cover rounded shadow" />
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-lg">{comic.title}</h3>
                <div className="text-gray-600 text-sm overflow-y-auto pr-2" style={{ maxHeight: '176px' }}>{comic.synopsis}</div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {comic.genre && <span className="bg-gray-200 rounded px-2 py-0.5">Genre: {comic.genre}</span>}
                  {comic.category && <span className="bg-gray-200 rounded px-2 py-0.5">Kategori: {comic.category}</span>}
                  {comic.language && <span className="bg-gray-200 rounded px-2 py-0.5">Bahasa: {comic.language}</span>}
                  {comic.status && (
                    <span className={
                      comic.status === 'review'
                        ? 'bg-yellow-200 text-yellow-800 font-semibold rounded px-2 py-0.5'
                        : comic.status === 'published'
                        ? 'bg-green-200 text-green-800 font-semibold rounded px-2 py-0.5'
                        : 'bg-gray-200 text-gray-700 rounded px-2 py-0.5'
                    }>
                      Status: {comic.status}
                    </span>
                  )}
                  {comic.year && <span className="bg-gray-200 rounded px-2 py-0.5">Tahun: {comic.year}</span>}
                  {comic.audience && <span className="bg-gray-200 rounded px-2 py-0.5">Usia: {comic.audience}</span>}
                </div>
                {comic.tags && comic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {comic.tags.map((tag: string) => (
                      <span key={tag} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">Penulis: {comic.authorAlias || comic.authorId}</span>
                  {comic.authorBioUrl && (
                    <a href={comic.authorBioUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs">Biografi</a>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => setPreviewId(comic.id)} title="Lihat Komik di mu-komik.com">Lihat Komik</button>
                  <button className="px-3 py-1 rounded bg-primary text-white"><Edit2 className="w-4 h-4 inline" /> Edit</button>
                  {comic.status !== 'review' && comic.status !== 'published' && (
                    <button className="px-3 py-1 rounded bg-green-500 text-white">Submit untuk Review</button>
                  )}
                  <button className="px-3 py-1 rounded bg-red-500 text-white"><Trash2 className="w-4 h-4 inline" /> Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal Preview Komik */}
        {previewId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setPreviewId(null)}>
            <div
              className="bg-black rounded-xl shadow-lg p-2 relative"
              style={{ width: 393, height: 852 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-white bg-gray-800 rounded-full px-3 py-1 text-lg"
                onClick={() => setPreviewId(null)}
              >
                &times;
              </button>
              <iframe
                src={`https://mu-komik.com/${previewId}`}
                width={393}
                height={852}
                className="rounded-lg border-0"
                style={{ background: 'white' }}
                title="Preview Komik"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 