# OnkoSob

OnkoSob adalah aplikasi mobile-first edukasi dan referensi cepat di bidang onkologi radiasi.

## Stack
- React + Vite
- React Router
- Frontend only (tanpa backend, tanpa login, tanpa API eksternal)
- Penyimpanan lokal menggunakan `localStorage`

## Fitur
- Home dashboard + shortcuts + recent activity + bookmarked items
- Calculators: BED, EQD2, dose/fraction helper
- References + Atlas (data lokal JSON)
- Notes pribadi (create, edit, delete, tag, template)
- Bookmarks lintas fitur
- About + disclaimer edukasi

## Menjalankan
```bash
npm install
npm run dev
```

## Build produksi
```bash
npm run build
npm run preview
```

## Deploy ke Vercel
Project ini siap deploy sebagai static Vite app (framework preset: **Vite**).
