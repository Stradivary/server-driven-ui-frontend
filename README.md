# Server-Driven UI: Frontend

Frontend ini dibangun menggunakan **Next.js 15** dengan TailwindCSS sebagai framework styling. UI pada aplikasi ini **sepenuhnya dikendalikan dari server**, di mana frontend hanya mengambil JSON dari backend dan merender UI sesuai dengan data yang diberikan.

## 🎯 Tujuan
- Memisahkan logika UI dari frontend agar dapat diperbarui tanpa perlu deployment ulang.
- Memungkinkan perubahan UI secara **dinamis** hanya dengan mengubah response API dari backend.
- Menyediakan pengalaman pengguna yang fleksibel dan terintegrasi dengan **autentikasi berbasis token**.

## 🛠️ Teknologi yang Digunakan
- **Next.js 15** - Framework React untuk aplikasi full-stack.
- **TailwindCSS** - Styling berbasis utility untuk desain yang cepat dan konsisten.
- **Axios / fetch** - Untuk mengambil data UI dari backend.
- **LocalStorage** - Menyimpan token autentikasi untuk sesi pengguna.

## 📌 Alur Kerja Frontend
1. **Fetch UI dari backend**
   Saat halaman dimuat, frontend akan memanggil endpoint `/ui/:page` di backend untuk mendapatkan struktur UI dalam format JSON.

2. **Render UI sesuai JSON**
   JSON yang diterima akan digunakan untuk merender komponen seperti input, button, dan link secara **dinamis**.

3. **Interaksi dengan API**
   Semua tombol dan input yang dikonfigurasi dalam JSON akan melakukan request ke backend sesuai dengan endpoint yang telah ditentukan dalam JSON.

4. **Autentikasi & Routing**
   - Token login disimpan di `localStorage` setelah berhasil login.
   - Jika pengguna tidak memiliki token, mereka akan diarahkan kembali ke halaman login (`/auth`).

---

## 📂 Project Structure

### Frontend (Next.js)
```
frontend/

├── app/  --> folder aplikasi
│   ├── auth --> folder autentikasi untuk login
│   │   ├── page.tsx  --> halaman untuk login
│   ├── dashboard/  --> folder halaman dashboard
│   │   ├── page.tsx --> halaman dashboard ketika berhasil login
│   ├── register/ --> folder halaman register
│   │   ├── page.tsx --> halaman register
│   ├── favicon.ico --> icon aplikasi
│   ├── globals.css --> css global styling aplikasi
│   ├── layout.tsx  --> layout aplikasi
│   ├── page.tsx  --> page utama aplikasi
├── components/  --> folder komponents aplikasi
│   ├── ui/  --> folder ui aplikasi
│   │  ├── button.tsx --> komponent tombol usable
│   │  ├── card.tsx  --> komponent card usable
│   │  ├── input.tsx  --> komponent input usable
│   │  ├── label.tsx  --> komponent label usable
├── lib/ folder lib aplikasi
│   ├── utils.ts --> file utils untuk merge tailwind
├── utils/ --> folder utils aplikasi
│   ├── fetchUI.ts file fetchUI usable
├── package.json file list package module untuk membangun dan instalasi aplikasi
```
---

## 🧭 Arsitektur Frontend

```
[User]
  ↓
[Next.js Page] ───────── fetch(`/ui/:endpoint`)
  ↓                                 ↓
[fetch-ui.ts]               [Backend UIController]
  ↓
[Render Dynamic UI Components]

Login/Register flow:
[Login/Register Page] ──── POST /auth/login
                          ──── POST /auth/register
                                    ↓
                             [Backend AuthModule]
                                      ↓
                                 [Supabase DB]

Dashboard flow:
[Dashboard Page] ───────── GET /auth/profile ─────▶ [Backend AuthModule]
                                      ↓
                                 [Supabase DB]
```

📌 **Endpoint yang diakses dari Frontend ke Backend:**

- `GET /ui/home` → Menampilkan halaman utama
- `GET /ui/auth` → Menampilkan struktur form login
- `GET /ui/register` → Menampilkan struktur form register
- `POST /auth/login` → Proses login user
- `POST /auth/register` → Proses pendaftaran user baru
- `GET /auth/profile` → Mendapatkan data profil user yang sedang login

Penjelasan:
- Frontend hanya bertugas menampilkan UI yang sudah disiapkan backend dalam bentuk JSON.
- Komponen dibentuk secara dinamis berdasarkan struktur dari endpoint `/ui/:endpoint`.
- Semua interaksi (login, register, profile) mengarah ke backend.
- Arsitektur ini membuat frontend ringan dan fleksibel, karena backend bertanggung jawab atas logika dan desain UI.


---

## 🚀 Cara Menjalankan

### 2️⃣ Frontend (Next.js)
#### Install dependencies:
```sh
cd frontend
npm install
```

#### Jalankan server frontend:
```sh
npm run dev
```

Akses aplikasi di **http://localhost:3000**

---

## 🎨 Server-Driven UI : Contoh Response
contoh response endpoint /ui/home dari Backend mengirimkan JSON seperti berikut:
```json
{
  "title": "Authentication",
  "navTitle": "Server-Driven UI App",
  "navLinks": [
    { "text": "Home", "route": "/" },
    { "text": "Login", "route": "/auth" }
  ],
  "fields": [
    { "type": "input", "placeholder": "Username", "name": "username" },
    { "type": "input", "placeholder": "Password", "name": "password", "secure": true }
  ],
  "actions": [
    { "type": "button", "text": "Login", "endpoint": "/auth/login" },
    { "type": "button", "text": "Register", "endpoint": "/auth/register" }
  ]
}
```

Frontend akan merender UI berdasarkan data ini secara dinamis.

---

## 📢 Catatan
- Gunakan **Node.js 18+** untuk memastikan kompatibilitas.
- Pastikan **backend dan frontend** berjalan di server yang benar.

- Pastikan frontend mengambil data dengan **fetchUI()** agar sesuai dengan JSON dari backend.

---

## 📜 Lisensi
This project is licensed under the MIT License.
