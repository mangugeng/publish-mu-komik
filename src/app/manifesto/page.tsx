"use client";
import HeaderNav from "@/components/header-nav";
import { CheckCircle, Users, Heart, Shield, Lightbulb, Globe, BookOpen, Palette, Zap, Eye } from "lucide-react";

export default function ManifestoPage() {
  return (
    <>
      <HeaderNav />
      <div className="main-content mt-16 md:mt-32 mb-20 md:mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              📜 Manifesto Etika AI & Komitmen Kreatif
            </h1>
            <p className="text-xl text-gray-600">
              di mu-komik.com
            </p>
          </div>

          {/* Visi Kami */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-800">✨ Visi Kami</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              mu-komik.com adalah platform kreatif yang memanfaatkan teknologi kecerdasan buatan (AI) untuk mempercepat dan memperluas produksi komik digital, tanpa menghilangkan peran manusia sebagai inti dari proses kreatif. Kami percaya bahwa AI adalah alat bantu, bukan pengganti seniman. Kami hadir untuk memberdayakan penulis, ilustrator, pendidik, dan komunitas kreatif, agar bisa mewujudkan ide-ide mereka dalam bentuk visual dengan cara baru yang inklusif, cepat, dan kolaboratif.
            </p>
          </div>

          {/* Prinsip-Prinsip Etika AI */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8" />
              🧭 Prinsip-Prinsip Etika AI Kami
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-800">1. Kreativitas Manusia Adalah Inti</h3>
                </div>
                <p className="text-gray-600">
                  Kami menempatkan manusia—penulis cerita, pembuat konsep, ilustrator, editor—sebagai inti dari setiap karya. AI hanya membantu mewujudkan ide yang berasal dari manusia.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-800">2. AI sebagai Mitra Kolaboratif</h3>
                </div>
                <p className="text-gray-600">
                  Kami memosisikan AI sebagai asisten kreatif, bukan mesin otomatis pembuat karya. Model kerja kami berbasis kolaborasi manusia + AI, bukan penghapusan salah satu pihak.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-800">3. Transparansi dalam Proses Produksi</h3>
                </div>
                <p className="text-gray-600">
                  Setiap komik di platform kami mencantumkan sumber keterlibatan: siapa penulis cerita, apakah menggunakan AI dalam visual, apakah visual di-retouch atau dikurasi oleh manusia.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-800">4. Keadilan dan Penghargaan terhadap Kreator</h3>
                </div>
                <p className="text-gray-600">
                  Kreator tetap mendapatkan kredit dan potensi pendapatan berdasarkan peran dan kontribusinya, baik dari sisi cerita, arahan, maupun pengolahan akhir.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-800">5. Menggunakan Model AI Secara Etis</h3>
                </div>
                <p className="text-gray-600">
                  Kami berkomitmen untuk menggunakan model AI yang tidak dilatih dari karya artis tanpa izin, dan memilih teknologi yang mematuhi prinsip hak cipta serta lisensi terbuka.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="w-6 h-6 text-pink-500" />
                  <h3 className="text-lg font-semibold text-gray-800">6. Ruang untuk Semua Gaya dan Teknik</h3>
                </div>
                <p className="text-gray-600">
                  Kami tidak hanya mendukung komik berbasis AI, tetapi juga manual, digital painting, sketsa, hingga mixed media. AI bukan satu-satunya jalan, tapi salah satu pilihan.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-800">7. Tidak Mengejar Kuantitas Tanpa Kualitas</h3>
                </div>
                <p className="text-gray-600">
                  Meskipun AI memungkinkan produksi cepat, kami tetap melakukan kurasi terhadap konten agar tidak menjadi "spam visual" tanpa substansi. Cerita dan pesan tetap menjadi prioritas utama.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-6 h-6 text-teal-500" />
                  <h3 className="text-lg font-semibold text-gray-800">8. Komunitas sebagai Ruang Belajar</h3>
                </div>
                <p className="text-gray-600">
                  mu-komik.com terbuka sebagai ruang belajar bersama, di mana pengguna dapat mencoba, gagal, bereksperimen, dan bertumbuh—baik mereka ilustrator berpengalaman maupun penulis pemula.
                </p>
              </div>
            </div>
          </div>

          {/* Tanya Jawab */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              ❓ Tanya Jawab: Pro-Kontra AI di Dunia Komik
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q1: "Apakah AI akan menghancurkan profesi seniman?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Tidak. Seperti Photoshop atau tablet digital yang dulu ditolak, AI adalah alat baru. Justru banyak seniman kini memakai AI sebagai alat bantu referensi, pewarnaan, atau eksplorasi ide.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q2: "Apakah karya AI tidak punya jiwa?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Benar, jika murni dari mesin tanpa arahan manusia. Tapi di mu-komik.com, semua AI diarahkan oleh manusia—baik melalui prompt, naskah, layout, atau pilihan gaya visual.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q3: "Apakah mu-komik.com mencuri karya seniman dari internet?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Tidak. Kami tidak melatih model sendiri dari karya artis tanpa izin. Kami menggunakan model yang tersedia secara legal dan menjaga etika dalam penggunaan teknologi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q4: "Kenapa tidak fokus saja pada komik manual?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Kami mendukung komik manual. Bahkan kami menyediakan ruang pamer untuk komik non-AI. Namun AI membuka akses bagi mereka yang tidak bisa menggambar tetapi punya cerita bagus.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q5: "Apakah hasil AI lebih rendah kualitasnya?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Belum tentu. Hasil AI yang diarahkan dengan konsep kuat bisa menyaingi karya manual. Kami memadukan AI dengan editing manual dan pengawasan kreator agar hasilnya berkualitas.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q6: "Bagaimana saya tahu mana komik yang dibuat AI?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Kami akan mencantumkan label pada karya berbasis AI. Transparansi adalah bagian dari etika kami.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Q7: "Apakah saya bisa tetap berkarya tanpa AI di platform ini?"</h3>
                <p className="text-gray-600 mb-3">
                  <strong>A:</strong> Tentu. Kami ingin merangkul semua jenis kreator. Silakan kirim karya manual, dan kami akan bantu mempromosikannya secara setara.
                </p>
              </div>
            </div>
          </div>

          {/* Komitmen Kami */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8" />
              🤝 Komitmen Kami ke Depan
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Kami akan terus:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Melibatkan komunitas kreator dalam pengembangan fitur baru</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Membuka ruang diskusi dan pelatihan tentang penggunaan AI secara etis</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Memastikan pembagian pendapatan yang adil dan transparan</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Menyediakan versi open-call untuk seniman manual dan kolaborator naskah</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mendorong budaya kolaborasi antara manusia dan teknologi</span>
              </div>
            </div>
          </div>

          {/* Penutup */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              🔓 Penutup: AI Bukan Ancaman, Tapi Kesempatan Baru
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Teknologi akan selalu berkembang. Yang menentukan arah penggunaannya adalah manusianya. Di mu-komik.com, kami ingin membuktikan bahwa AI bisa digunakan untuk menyuburkan ekosistem kreatif, bukan menghancurkannya.
            </p>
            <p className="text-xl font-semibold text-purple-700">
              Mari kita bertumbuh bersama.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 