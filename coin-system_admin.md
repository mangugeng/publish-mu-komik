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