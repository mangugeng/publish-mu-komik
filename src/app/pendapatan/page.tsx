"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import dayjs from 'dayjs';

export default function PendapatanPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [chapterAnalytics, setChapterAnalytics] = useState<any[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('OVO');
  const [withdrawNumber, setWithdrawNumber] = useState('');

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/comics/analytics?userId=${user.uid}`)
      .then(res => res.json())
      .then(setChapterAnalytics);
  }, [user]);

  // Rekap harian, mingguan, bulanan
  const pendapatanRekap = useMemo(() => {
    let total = 0, hari = 0, minggu = 0, bulan = 0;
    let pembelianTotal = 0, pembelianHari = 0, pembelianMinggu = 0, pembelianBulan = 0;
    const now = dayjs();
    chapterAnalytics.forEach(comic => {
      comic.chapters.forEach((ch: any) => {
        total += ch.totalRevenue || 0;
        pembelianTotal += ch.totalPurchases || 0;
        if (ch.lastPurchaseTime) {
          const t = dayjs(ch.lastPurchaseTime);
          if (t.isSame(now, 'day')) {
            hari += ch.totalRevenue || 0;
            pembelianHari += ch.totalPurchases || 0;
          }
          if (t.isSame(now, 'week')) {
            minggu += ch.totalRevenue || 0;
            pembelianMinggu += ch.totalPurchases || 0;
          }
          if (t.isSame(now, 'month')) {
            bulan += ch.totalRevenue || 0;
            pembelianBulan += ch.totalPurchases || 0;
          }
        }
      });
    });
    return {
      total, hari, minggu, bulan,
      pembelianTotal, pembelianHari, pembelianMinggu, pembelianBulan
    };
  }, [chapterAnalytics]);

  if (!user && !loading) return null;

  return (
    <div className="main-content mt-32 mb-16">
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
        <h1 className="text-3xl font-extrabold text-primary mb-12">Pendapatan Komik</h1>
        {/* Tombol Withdraw */}
        <div className="mb-4 flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded bg-primary text-white font-semibold shadow ${pendapatanRekap.total >= 300000 ? 'hover:bg-primary/90' : 'opacity-50 cursor-not-allowed'}`}
            disabled={pendapatanRekap.total < 300000}
            onClick={() => {
              setWithdrawAmount(pendapatanRekap.total);
              setShowWithdrawModal(true);
              setWithdrawError('');
              setWithdrawSuccess('');
              setWithdrawNumber('');
              setWithdrawMethod('OVO');
            }}
          >
            Tarik Saldo
          </button>
          {pendapatanRekap.total < 300000 && (
            <span className="text-xs text-red-500">Minimal saldo untuk penarikan adalah Rp300.000</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 w-full max-w-4xl">
          <div className="p-4 border rounded-lg bg-green-50">
            <div className="font-semibold text-gray-700 mb-1">Realtime (Total)</div>
            <div className="text-2xl font-bold text-green-700">Rp{pendapatanRekap.total.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Pembelian: {pendapatanRekap.pembelianTotal}</div>
          </div>
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="font-semibold text-gray-700 mb-1">Hari Ini</div>
            <div className="text-2xl font-bold text-blue-700">Rp{pendapatanRekap.hari.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Pembelian: {pendapatanRekap.pembelianHari}</div>
          </div>
          <div className="p-4 border rounded-lg bg-yellow-50">
            <div className="font-semibold text-gray-700 mb-1">Minggu Ini</div>
            <div className="text-2xl font-bold text-yellow-700">Rp{pendapatanRekap.minggu.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Pembelian: {pendapatanRekap.pembelianMinggu}</div>
          </div>
          <div className="p-4 border rounded-lg bg-purple-50">
            <div className="font-semibold text-gray-700 mb-1">Bulan Ini</div>
            <div className="text-2xl font-bold text-purple-700">Rp{pendapatanRekap.bulan.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Pembelian: {pendapatanRekap.pembelianBulan}</div>
          </div>
        </div>
        {/* Statistik per komik */}
        <div className="w-full max-w-4xl">
          {chapterAnalytics.map(comic => (
            <div key={comic.comicId} className="mb-8 p-4 border rounded-xl bg-white shadow">
              <h3 className="font-bold text-lg mb-2">{comic.title}</h3>
              <div className="flex flex-col gap-2">
                {comic.chapters.map((chap: any) => (
                  <div key={chap.id} className="p-3 border rounded-lg bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <div className="font-semibold">{chap.title}</div>
                      <div className="text-xs text-gray-500 mb-1">Urutan: {chap.order}</div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm mt-2 md:mt-0">
                      <div>
                        <b>Pendapatan:</b> Rp{chap.totalRevenue?.toLocaleString() || 0}
                      </div>
                      <div>
                        <b>Pembelian:</b> {chap.totalPurchases || 0}x
                      </div>
                      <div>
                        <b>Terakhir Dibeli:</b> {chap.lastPurchaseTime ? new Date(chap.lastPurchaseTime).toLocaleString() : "-"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Grafik pendapatan per chapter */}
              <div className="w-full md:w-96 h-72 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={comic.chapters.map((chap: any) => ({
                    name: chap.title,
                    Pendapatan: chap.totalRevenue,
                    Pembelian: chap.totalPurchases,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Pendapatan" fill="#4ade80" />
                    <Bar dataKey="Pembelian" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
        {/* Modal Withdraw */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <h2 className="text-xl font-bold mb-4">Penarikan Saldo</h2>
              <form className="flex flex-col gap-4 w-full" onSubmit={e => { e.preventDefault(); }}>
                <div>
                  <label className="block text-sm font-medium mb-1">Jumlah Penarikan</label>
                  <input
                    type="number"
                    className="w-full border rounded px-2 py-1"
                    min={300000}
                    max={pendapatanRekap.total}
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(Number(e.target.value))}
                  />
                  <div className="text-xs text-gray-500">Minimal Rp300.000, maksimal Rp{pendapatanRekap.total.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Metode Penarikan</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={withdrawMethod}
                    onChange={e => setWithdrawMethod(e.target.value)}
                  >
                    <option value="OVO">OVO</option>
                    <option value="DANA">DANA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nomor {withdrawMethod}</label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={withdrawNumber}
                    onChange={e => setWithdrawNumber(e.target.value)}
                    placeholder={`Masukkan nomor ${withdrawMethod}`}
                  />
                </div>
                {withdrawError && <div className="text-red-500 text-sm">{withdrawError}</div>}
                {withdrawSuccess && <div className="text-green-600 text-sm">{withdrawSuccess}</div>}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-primary text-white"
                    onClick={() => {
                      // Validasi
                      if (withdrawAmount < 300000) {
                        setWithdrawError('Minimal penarikan Rp300.000');
                        setWithdrawSuccess('');
                        return;
                      }
                      if (withdrawAmount > pendapatanRekap.total) {
                        setWithdrawError('Jumlah melebihi saldo');
                        setWithdrawSuccess('');
                        return;
                      }
                      if (!withdrawNumber.trim()) {
                        setWithdrawError('Nomor wajib diisi');
                        setWithdrawSuccess('');
                        return;
                      }
                      // Submit dummy
                      setWithdrawError('');
                      setWithdrawSuccess('Permintaan penarikan sedang diproses.');
                      // Tutup modal setelah 2 detik
                      setTimeout(() => setShowWithdrawModal(false), 2000);
                    }}
                  >
                    Konfirmasi Penarikan
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200"
                    onClick={() => setShowWithdrawModal(false)}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 