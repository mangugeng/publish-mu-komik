"use client";
import Link from "next/link";
import HeaderNav from "@/components/header-nav";

export default function Page() {
  return (
    <>
      <HeaderNav />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-6xl w-full mx-auto mt-24">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Ayo Upload Komikmu dan Raih Keuntungan!</h1>
          <p className="text-lg text-gray-700 mb-6">Bagikan karya komikmu ke ribuan pembaca di seluruh Indonesia.<br />Dapatkan penghasilan dari setiap halaman komik yang dibaca atau dibeli.<br />Promosikan dirimu sebagai kreator dan bangun komunitas penggemar.</p>
          <Link href="/upload">
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-primary/90 transition mb-8">Upload Komik Sekarang</button>
          </Link>
          <div className="border border-gray-200 rounded-xl p-6 text-left mt-4">
            <h2 className="text-xl font-bold mb-3 text-primary">Syarat & Ketentuan Upload Komik:</h2>
            <ol className="list-decimal ml-6 text-gray-700 space-y-1 text-base">
              <li>Karya komik harus orisinal dan tidak melanggar hak cipta pihak lain.</li>
              <li>Konten tidak mengandung unsur SARA, pornografi, atau kekerasan berlebihan.</li>
              <li>Komik yang diupload akan melalui proses review sebelum dipublikasikan.</li>
              <li>Penjualan komik tunduk pada aturan dan pembagian hasil platform.</li>
              <li>Dengan mengupload, Anda setuju dengan <a href="/terms" className="underline text-primary" target="_blank">Syarat & Ketentuan Platform</a>.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
} 