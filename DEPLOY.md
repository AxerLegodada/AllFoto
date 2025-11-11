# 🚀 Vercel'e Deploy Etme - Adım Adım Rehber

Bu rehber, fotoğraf yazdırma uygulamanızı Vercel'e deploy etmeniz için adım adım talimatlar içerir.

## 📋 Ön Hazırlık

1. **GitHub Hesabı**: GitHub hesabınız olmalı
2. **Vercel Hesabı**: [vercel.com](https://vercel.com) üzerinden ücretsiz hesap oluşturun
3. **Node.js**: Yerel test için Node.js 18+ yüklü olmalı

## 🔧 Adım 1: Projeyi Hazırlama

### 1.1 Bağımlılıkları Yükleyin

```bash
npm install
```

### 1.2 Yerel Olarak Test Edin

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın ve uygulamanın çalıştığını kontrol edin.

## 📦 Adım 2: GitHub'a Yükleme

### 2.1 Git Repository Oluşturma

Eğer henüz git repository yoksa:

```bash
git init
git add .
git commit -m "İlk commit - Fotoğraf yazdırma uygulaması"
```

### 2.2 GitHub'da Yeni Repository Oluşturma

1. [GitHub](https://github.com) hesabınıza giriş yapın
2. Sağ üstteki "+" butonuna tıklayın
3. "New repository" seçin
4. Repository adını girin (örn: `photo-print-app`)
5. Public veya Private seçin
6. "Create repository" butonuna tıklayın

### 2.3 Kodu GitHub'a Push Etme

GitHub'da oluşturduğunuz repository'nin URL'ini kullanın:

```bash
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git branch -M main
git push -u origin main
```

**Not**: `KULLANICI_ADI` ve `REPO_ADI` kısımlarını kendi bilgilerinizle değiştirin.

## 🌐 Adım 3: Vercel'e Deploy Etme

### 3.1 Vercel'e Giriş

1. [vercel.com](https://vercel.com) adresine gidin
2. "Sign Up" veya "Log In" butonuna tıklayın
3. GitHub hesabınızla giriş yapın (önerilir)

### 3.2 Yeni Proje Oluşturma

1. Vercel dashboard'da "Add New..." butonuna tıklayın
2. "Project" seçin
3. GitHub repository'nizi seçin
4. Eğer repository görünmüyorsa, "Adjust GitHub App Permissions" linkine tıklayın ve gerekli izinleri verin

### 3.3 Proje Ayarları

Vercel otomatik olarak Next.js projesini algılayacaktır. Ayarlar şöyle olmalı:

- **Framework Preset**: Next.js (otomatik algılanır)
- **Root Directory**: `./` (varsayılan)
- **Build Command**: `npm run build` (otomatik)
- **Output Directory**: `.next` (otomatik)
- **Install Command**: `npm install` (otomatik)

### 3.4 Environment Variables (İsteğe Bağlı)

Eğer yazdırma servisi kullanıyorsanız, "Environment Variables" bölümüne ekleyin:

- `PRINT_SERVICE_URL`: Yazdırma servisinin URL'i (örn: `http://your-ip:3001`)
- `PRINT_SERVICE_API_KEY`: API anahtarı (güvenlik için)

**Not**: Vercel'de deploy edilen uygulama, yerel yazıcıya doğrudan erişemez. Yazdırma için yerel bir servis gerekir (bkz. `print-service/README.md`).

### 3.5 Deploy

1. "Deploy" butonuna tıklayın
2. Vercel otomatik olarak:
   - Bağımlılıkları yükler
   - Projeyi build eder
   - Production'a deploy eder

### 3.6 Deploy Sonrası

Deploy tamamlandıktan sonra:
- Vercel otomatik bir URL verir (örn: `your-app.vercel.app`)
- Bu URL'i kopyalayın ve test edin

## 🔗 Adım 4: Custom Domain (İsteğe Bağlı)

### 4.1 Domain Ekleme

1. Vercel dashboard'da projenize gidin
2. "Settings" sekmesine tıklayın
3. "Domains" bölümüne gidin
4. Domain'inizi ekleyin

### 4.2 DNS Ayarları

Vercel size DNS kayıtlarını gösterecek. Domain sağlayıcınızın DNS ayarlarına bu kayıtları ekleyin.

## 🖨️ Adım 5: Yazdırma Servisi Kurulumu (Önemli!)

Vercel'de deploy edilen uygulama, yerel yazıcıya doğrudan erişemez. Yazdırma için:

### Seçenek 1: Yerel Yazdırma Servisi (Önerilen)

1. `print-service` klasörüne gidin:
```bash
cd print-service
npm install
```

2. `.env` dosyası oluşturun:
```
PORT=3001
PRINTER_NAME=XP-80C
API_KEY=your-secret-key-here
```

3. Servisi başlatın:
```bash
npm start
```

4. `app/api/print/route.ts` dosyasını güncelleyin (yazdırma servisi URL'ini ekleyin)

### Seçenek 2: Ngrok ile Yerel Servisi Dışarı Açma

1. [ngrok](https://ngrok.com) indirin ve kurun
2. Yerel servisi başlatın (port 3001)
3. Ngrok ile tünel oluşturun:
```bash
ngrok http 3001
```
4. Ngrok'un verdiği URL'i `PRINT_SERVICE_URL` olarak Vercel'e ekleyin

## ✅ Adım 6: Test Etme

1. Vercel'de deploy edilen uygulamanızı açın
2. Bir fotoğraf yükleyin
3. Yazdırma işleminin çalıştığını kontrol edin
4. "Son Resimler" bölümünde fotoğrafın göründüğünü kontrol edin

## 🔄 Adım 7: Güncellemeler

Kodunuzu güncellediğinizde:

```bash
git add .
git commit -m "Güncelleme açıklaması"
git push
```

Vercel otomatik olarak yeni deploy başlatacaktır.

## 🐛 Sorun Giderme

### Build Hatası

- Build loglarını kontrol edin
- `package.json`'daki bağımlılıkları kontrol edin
- Node.js versiyonunu kontrol edin (18+ gerekli)

### Yazdırma Çalışmıyor

- Yerel yazdırma servisinin çalıştığından emin olun
- Environment variables'ları kontrol edin
- Network bağlantısını kontrol edin

### Fotoğraflar Görünmüyor

- Vercel'de dosya sistemi read-only'dir
- Fotoğrafları veritabanı veya cloud storage'da saklamanız gerekir
- Şu an için sadece development'ta çalışır

## 📝 Notlar

- Vercel'de dosya sistemi geçicidir, her deploy'da sıfırlanır
- Production için fotoğrafları cloud storage'da (S3, Cloudinary, vb.) saklamanız önerilir
- Yazdırma için yerel bir servis veya cloud printing API'si gerekir

## 🎉 Tamamlandı!

Artık uygulamanız Vercel'de yayında! Herhangi bir sorunuz varsa issue açabilirsiniz.

