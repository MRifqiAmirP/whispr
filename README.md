# Whispr

Whispr adalah aplikasi chat anonim berbasis web yang memungkinkan pengguna bergabung ke global chat dan grup tanpa perlu login. Setiap pengguna hanya perlu memasukkan username saat masuk.

Dibangun menggunakan Next.js App Router, dengan fokus pada UI modern, responsif, dan real-time interaction.

🚀 Fitur Utama
- Global Chat (public room)
- Group Chat
- Kirim gambar
- Username custom (tanpa sistem login)
- Report user
- UI modern minimalis
- Fully responsive (soon)

---

🛠 Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Database: Supabase
- ORM: Prisma
- Deployment: VPS

📦 Installation

Clone repository:
```
git clone https://github.com/your-username/whispr.git
cd whispr
```

Install dependencies:
```
npm install
# or
yarn install
# or
pnpm install
```
---
🔑 Environment Variables

Buat file .env dan isi:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=

# Connect to Supabase via connection pooling
DATABASE_URL=

# Direct connection to the database. Used for migrations
DIRECT_URL=

```

Pastikan Supabase project sudah dibuat dan Prisma sudah dikonfigurasi.

---

🧪 Development

Jalankan development server:
```
npm run dev
```

Buka:
```
http://localhost:3000
```

Edit file utama di:
```
app/page.tsx
```

---
🗄 Prisma Setup

Generate Prisma client:
```
npx prisma generate
```

Migrasi database:
```
npx prisma migrate dev
```
---

📁 Project Structure (Simplified)
```
app/
 ├── api/
        ├── profile/
        ├── services/
 ├── components/
        ├── 
 └── page.tsx
prisma/
 └── schema.prisma
```
---

🎯 Goals

Whispr dibuat untuk:
- Menghadirkan pengalaman chat anonim yang ringan
- Fokus pada kecepatan dan simplicity
- Menghindari kompleksitas sistem autentikasi