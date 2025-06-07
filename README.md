# Publish Mu-Komik

Aplikasi untuk mengelola dan mempublish komik di platform Mu-Komik.

## Fitur

- Sistem login untuk creator
- Upload dan edit komik
- Manajemen chapter dan halaman
- Preview komik
- Publish komik

## Teknologi

- Next.js 15
- Firebase (Authentication & Firestore)
- Tailwind CSS
- TypeScript

## Instalasi

1. Clone repository
```bash
git clone [repository-url]
cd publish-mu-komik
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
Buat file `.env.local` dengan konfigurasi berikut:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Jalankan development server
```bash
npm run dev
```

## Penggunaan

1. Login sebagai creator
2. Upload komik baru atau edit komik yang sudah ada
3. Kelola chapter dan halaman
4. Preview komik
5. Publish komik

## Lisensi

Hak Cipta © 2024 Mu-Komik
