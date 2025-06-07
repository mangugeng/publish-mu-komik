# Dokumentasi Coin System Platform Komik

---

## Bagian 1: Untuk Frontend Developer (Aplikasi Reader)

# Coin System untuk Frontend Developer (Aplikasi Reader)

## 1. Jenis Coin
- **Reader Coin**: Untuk membeli/membaca komik. Didapat dari top-up atau konversi reward.
- **Reward Coin**: Didapat dari aktivitas (misal: membaca halaman). Harus dikonversi sebelum dipakai.
- **Diamond**: Coin premium, bisa di-withdraw ke rupiah. Didapat dari konversi reward atau event khusus.
- **Creator Coin**: Untuk creator membeli fitur/platform (tidak dipakai di aplikasi reader, hanya info).

## 2. Alur Reward & Konversi
- Setiap user membaca halaman komik, dapat **+1 Reward Coin**.
- **Reward Coin** bisa:
  - Dikoversi ke **Reader Coin** (untuk membaca komik berbayar)
  - Dikoversi ke **Diamond** (untuk withdraw ke rupiah)
- **Tidak bisa** konversi Reward Coin ke Creator Coin atau sebaliknya.
- **Tidak bisa** konversi Reader Coin ke Diamond.

## 3. Rate & Limit
- **Rate konversi** diambil dari config backend (bisa berubah):
  - `reward_to_reader`: 1 (1 reward = 1 reader coin)
  - `reward_to_diamond`: 0.01 (100 reward = 1 diamond, contoh)
- **Withdraw Diamond** hanya bisa jika saldo diamond sudah cukup:
  - **Reader:** minimal Rp 20.000 (diamond x rate diamond)
  - **Creator:** minimal Rp 300.000 (diamond x rate diamond)
- **Diamond** adalah satu-satunya coin yang bisa di-withdraw ke rupiah.

## 4. Struktur Data User (contoh)
```json
{
  "coins": {
    "reader": 100,
    "reward": 50,
    "diamond": 2
  },
  "role": "reader" // atau "creator", "both"
}
```

## 5. API/UX
- **Tampilkan saldo** per jenis coin (reader, reward, diamond).
- **Tampilkan tombol konversi** reward → reader dan reward → diamond jika saldo cukup.
- **Tampilkan tombol withdraw** diamond jika saldo diamond sudah cukup (dan tampilkan batas minimal withdraw sesuai role).
- **Tampilkan rate konversi** yang berlaku (ambil dari config backend).
- **Setiap transaksi** (konversi, withdraw, pembelian) harus dicatat di log transaksi (untuk histori user).

## 6. Contoh Alur Penggunaan
1. User membaca halaman → dapat 1 reward coin.
2. User konversi reward coin ke reader coin (untuk baca komik premium) **atau** ke diamond (untuk withdraw).
3. Jika diamond sudah cukup, user bisa withdraw ke rupiah (minimal Rp 20.000 untuk reader, Rp 300.000 untuk creator).

## 7. Catatan
- **Reward Coin** tidak bisa langsung dipakai, harus dikonversi dulu.
- **Reader Coin** hanya untuk pembelian komik, tidak bisa di-withdraw.
- **Diamond** bisa di-withdraw, rate dan limit tergantung role user.
- **Konversi dan rate** bisa berubah sewaktu-waktu (ambil dari backend/config).

---

**Frontend wajib:**
- Ambil rate dan limit dari backend/config.
- Validasi saldo dan limit sebelum menampilkan tombol withdraw/konversi.
- Tampilkan histori transaksi ke user.

---

## Bagian 2: Untuk Frontend Developer (Aplikasi Author/Creator)

# Coin System untuk Frontend Developer (Aplikasi Author/Creator)

## 1. Jenis Coin
- **Creator Coin**: Untuk membeli fitur/platform (promosi, template, dsb) oleh creator.
- **Reward Coin**: Didapat dari aktivitas tertentu (event, bonus, dsb). Harus dikonversi sebelum dipakai.
- **Diamond**: Coin premium, bisa di-withdraw ke rupiah. Didapat dari hasil penjualan komik/halaman, konversi reward, atau event khusus.
- **Reader Coin**: Hanya untuk pembaca, tidak bisa dipakai creator.

## 2. Alur Reward, Penjualan & Konversi
- Creator mendapat **Diamond** dari hasil penjualan komik/halaman.
- **Reward Coin** bisa didapat dari event/platform, bisa dikonversi ke diamond (untuk withdraw) atau creator coin (untuk beli fitur).
- **Creator Coin** hanya bisa didapat dari konversi reward atau pembelian khusus, dan hanya untuk fitur platform.
- **Tidak bisa** konversi Diamond ke Creator Coin atau sebaliknya.
- **Tidak bisa** konversi Reader Coin ke Creator Coin.

## 3. Rate & Limit
- **Rate konversi** diambil dari config backend (bisa berubah):
  - `reward_to_creator`: 1 (1 reward = 1 creator coin, contoh)
  - `reward_to_diamond`: 0.01 (100 reward = 1 diamond, contoh)
- **Withdraw Diamond** hanya bisa jika saldo diamond sudah cukup:
  - **Creator:** minimal Rp 300.000 (diamond x rate diamond)
- **Diamond** adalah satu-satunya coin yang bisa di-withdraw ke rupiah.

## 4. Struktur Data User (contoh)
```json
{
  "coins": {
    "creator": 20,
    "reward": 50,
    "diamond": 2
  },
  "role": "creator" // atau "both"
}
```

## 5. API/UX
- **Tampilkan saldo** per jenis coin (creator, reward, diamond).
- **Tampilkan tombol konversi** reward → creator dan reward → diamond jika saldo cukup.
- **Tampilkan tombol withdraw** diamond jika saldo diamond sudah cukup (dan tampilkan batas minimal withdraw sesuai role).
- **Tampilkan rate konversi** yang berlaku (ambil dari config backend).
- **Setiap transaksi** (konversi, withdraw, pembelian fitur, penjualan) harus dicatat di log transaksi (untuk histori user).

## 6. Contoh Alur Penggunaan
1. Creator menjual komik/halaman → dapat diamond.
2. Creator dapat reward dari event/platform.
3. Creator konversi reward ke creator coin (untuk beli fitur) **atau** ke diamond (untuk withdraw).
4. Jika diamond sudah cukup, creator bisa withdraw ke rupiah (minimal Rp 300.000).

## 7. Catatan
- **Reward Coin** tidak bisa langsung dipakai, harus dikonversi dulu.
- **Creator Coin** hanya untuk fitur platform, tidak bisa di-withdraw.
- **Diamond** bisa di-withdraw, rate dan limit tergantung role user.
- **Konversi dan rate** bisa berubah sewaktu-waktu (ambil dari backend/config).

---

**Frontend wajib:**
- Ambil rate dan limit dari backend/config.
- Validasi saldo dan limit sebelum menampilkan tombol withdraw/konversi.
- Tampilkan histori transaksi ke user.

---

## Bagian 3: Untuk Admin/Owner Platform

# Coin System untuk Admin/Owner Platform

## 1. Jenis Coin yang Dikelola
- **Reader Coin**: Untuk pembaca membeli/membaca komik.
- **Creator Coin**: Untuk creator membeli fitur/platform.
- **Reward Coin**: Untuk reward aktivitas user (baca, event, dsb).
- **Diamond**: Coin premium, bisa di-withdraw ke rupiah.

## 2. Pengelolaan Rate & Limit
- **Rate konversi** antar coin dan ke rupiah diatur di config backend:
  - `reward_to_reader`, `reward_to_creator`, `reward_to_diamond`, dsb.
  - `diamond_to_rupiah` (rate diamond ke rupiah)
- **Limit withdraw** diatur per role:
  - Reader: minimal Rp 20.000
  - Creator: minimal Rp 300.000
- **Rate dan limit bisa diubah sewaktu-waktu** (misal: promo, event, kebijakan baru).

## 3. Audit & Monitoring
- **Semua transaksi coin** (topup, konversi, withdraw, pembelian, hadiah) harus dicatat di collection `coin_transactions`:
  - userId, type, from, to, amount, rate, timestamp, note
- **Admin bisa monitoring:**
  - Saldo coin semua user
  - Riwayat transaksi per user
  - Withdraw request dan statusnya
  - Statistik penggunaan coin (harian, mingguan, bulanan)

## 4. Aturan & Proses Withdraw
- **Withdraw diamond** hanya diproses jika saldo diamond user cukup dan sudah diverifikasi.
- **Admin bisa approve/reject withdraw** (manual/otomatis).
- **Log withdraw** harus mencatat: user, jumlah, rate, waktu, status, note.

## 5. Pengelolaan Reward & Event
- Admin bisa menambah reward coin ke user (event, promo, dsb).
- Admin bisa mengatur rate konversi khusus untuk event tertentu.

## 6. Catatan
- **Coin tidak bisa dikonversi sembarangan** (hanya sesuai aturan di config).
- **Audit trail wajib** untuk semua transaksi coin.
- **Perubahan rate/limit** harus dicatat (untuk histori dan audit).

---

**Admin wajib:**
- Menjaga integritas data coin dan transaksi.
- Monitoring withdraw dan approve sesuai SOP.
- Update rate/limit sesuai kebutuhan bisnis.
- Audit transaksi secara berkala. 