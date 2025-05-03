# SilangID Test Project

Repositori ini berisi dua bagian utama:
- `silangid-laravel`: Backend menggunakan Laravel
- `silangid-reactjs`: Frontend menggunakan ReactJS + Vite

---

## ✅ Prasyarat

Sebelum menjalankan project ini, pastikan perangkat Anda sudah terinstall:

### Global Dependencies
- [Node.js & npm](https://nodejs.org/) — untuk frontend
- [Composer](https://getcomposer.org/) — untuk backend
- [PHP ≥ 8.1](https://www.php.net/) — untuk Laravel
- [MySQL](https://www.mysql.com/) — untuk database

---

## 🚀 Instalasi dan Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/your-username/silangid-test.git
cd silangid-test
```

---

## ⚙️ Setup Backend Laravel (`silangid-laravel`)
```bash
cd silangid-laravel
composer install
cp .env.example .env
php artisan key:generate
```

### Konfigurasi `.env`
Edit file `.env` untuk menyesuaikan database:

```env
APP_NAME=SilangID
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=silangid
DB_USERNAME=root
DB_PASSWORD=
```

### Jalankan migrasi & seed (opsional)
```bash
php artisan migrate --seed
```

### Jalankan server Laravel
```bash
php artisan serve
```

---

## ⚙️ Setup Frontend ReactJS (`silangid-reactjs`)
```bash
cd ../silangid-reactjs
npm install
```

### Buat file `.env` React
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

> Ganti URL jika backend berjalan pada port berbeda atau domain lain.

### Jalankan React App
```bash
npm run dev
```

---

## 📦 Struktur Direktori

```
silangid-test/
├── silangid-laravel/   # Laravel backend
└── silangid-reactjs/   # ReactJS frontend
```

---

## Menjalankan web aplikasi:

Setelah menjalankan semua perintah diatas, masuk ke web aplikasi react js untuk login. setelah melakukan migrasi dan seed pada directory Laravel maka akan generate contoh user yang bisa di gunakan (dummy) dengan akses akun:

- email: test@example.com
- password: password

---

## 📝 Lisensi

Proyek ini menggunakan lisensi MIT. Silakan digunakan dan dimodifikasi sesuai kebutuhan.
