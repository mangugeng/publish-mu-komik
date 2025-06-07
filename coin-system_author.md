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