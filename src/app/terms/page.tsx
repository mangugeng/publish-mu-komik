import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-12 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-6 text-primary">Syarat & Ketentuan Platform Komik</h1>
        <div className="space-y-6 text-gray-900 text-base bg-white p-6 rounded-lg shadow-sm">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Definisi</h2>
            <p>
              Platform Komik adalah layanan digital yang memungkinkan pengguna untuk mengunggah, membaca, dan menjual komik secara online.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Pendaftaran & Akun</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Pengguna wajib mendaftar dan membuat akun untuk dapat mengunggah atau menjual komik.</li>
              <li>Data yang diberikan saat pendaftaran harus akurat dan dapat dipertanggungjawabkan.</li>
              <li>Pengguna bertanggung jawab menjaga kerahasiaan akun dan password.</li>
              <li>Dilarang menggunakan identitas palsu atau akun milik orang lain tanpa izin.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Hak Cipta & Kepemilikan</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Seluruh karya komik yang diunggah tetap menjadi hak milik pencipta/penulis komik.</li>
              <li>Pengguna bertanggung jawab penuh atas orisinalitas dan legalitas karya yang diunggah.</li>
              <li>Platform berhak menghapus atau menonaktifkan komik yang terbukti melanggar hak cipta atau peraturan hukum yang berlaku.</li>
              <li>Pengguna dilarang mengunggah karya yang melanggar hak cipta, merek dagang, atau hak kekayaan intelektual pihak lain.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Konten & Larangan</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Dilarang mengunggah konten yang mengandung SARA, pornografi, kekerasan berlebihan, ujaran kebencian, atau melanggar hukum.</li>
              <li>Platform berhak melakukan moderasi dan menolak/menghapus konten yang tidak sesuai.</li>
              <li>Pengguna dilarang melakukan spam, penipuan, phishing, atau aktivitas merugikan pengguna lain.</li>
              <li>Konten yang diunggah tidak boleh mengandung virus, malware, atau kode berbahaya lainnya.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Privasi & Keamanan</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Platform berkomitmen menjaga privasi data pengguna sesuai kebijakan privasi yang berlaku.</li>
              <li>Pengguna dilarang membagikan data pribadi pengguna lain tanpa izin.</li>
              <li>Platform tidak bertanggung jawab atas kebocoran data akibat kelalaian pengguna sendiri.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Lisensi & Penggunaan</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Dengan mengunggah komik, pengguna memberikan lisensi non-eksklusif kepada platform untuk menampilkan, mempromosikan, dan mendistribusikan komik di platform.</li>
              <li>Platform tidak akan menggunakan karya untuk tujuan komersial di luar platform tanpa izin tertulis dari pemilik hak cipta.</li>
              <li>Platform dapat menggunakan karya untuk keperluan promosi platform dengan tetap mencantumkan kredit kepada kreator.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Pembagian Hasil & Monetisasi</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Pendapatan dari penjualan komik akan dibagi sesuai ketentuan yang berlaku di platform.</li>
              <li>Platform berhak memotong biaya administrasi atau komisi sesuai kebijakan.</li>
              <li>Pembayaran kepada kreator akan dilakukan secara berkala sesuai prosedur platform.</li>
              <li>Pengguna wajib memastikan data pembayaran yang diberikan benar dan valid.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">8. Pelaporan & Penangguhan Akun</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Pengguna dapat melaporkan pelanggaran atau konten yang tidak sesuai melalui fitur pelaporan di platform.</li>
              <li>Platform berhak menangguhkan atau menonaktifkan akun yang melanggar syarat & ketentuan tanpa pemberitahuan terlebih dahulu.</li>
              <li>Keputusan platform bersifat final dan tidak dapat diganggu gugat.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">9. Perubahan Layanan & Syarat</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Platform berhak mengubah, menambah, atau menghapus fitur layanan sewaktu-waktu.</li>
              <li>Perubahan syarat & ketentuan akan diinformasikan melalui platform.</li>
              <li>Penggunaan platform setelah perubahan dianggap sebagai persetujuan pengguna terhadap syarat & ketentuan baru.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">10. Kontak & Bantuan</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Untuk pertanyaan, bantuan, atau pelaporan pelanggaran, silakan hubungi tim support platform melalui email: <a href="mailto:support@mu-komik.com" className="underline text-primary">support@komikplatform.com</a></li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">11. Penutup</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Dengan menggunakan platform, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh syarat & ketentuan ini.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 