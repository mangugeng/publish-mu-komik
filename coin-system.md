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