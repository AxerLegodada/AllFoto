# 📸 Fotoğraf Yazdırma Uygulaması

Modern ve kullanıcı dostu bir fotoğraf yükleme ve yazdırma uygulaması. Kullanıcılar fotoğraf yükleyebilir, önizleme görebilir ve XP-80C yazıcısından otomatik yazdırma yapabilir.

## ✨ Özellikler

- 📤 **Fotoğraf Yükleme**: Drag & drop veya dosya seçme ile kolay yükleme
- 👁️ **Önizleme**: Yüklemeden önce fotoğraf önizlemesi
- 🖨️ **Otomatik Yazdırma**: XP-80C yazıcısına otomatik yazdırma
- 📋 **Son Resimler**: Yüklenen son fotoğrafları görüntüleme
- 🔄 **Durum Takibi**: Sırada, Yazdırılıyor, Yazdırıldı durumları
- 🎨 **Modern UI**: Tailwind CSS ile güzel ve responsive tasarım

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- XP-80C yazıcısı (yerel yazdırma için)

### Adımlar

1. **Projeyi klonlayın veya indirin**

```bash
cd pos
```

2. **Bağımlılıkları yükleyin**

```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**

```bash
npm run dev
```

4. **Tarayıcıda açın**

```
http://localhost:3000
```

## 🖨️ Yazdırma Yapılandırması

**ÖNEMLİ NOT**: Vercel gibi bulut platformlarında doğrudan yazıcıya erişim mümkün değildir. Yazdırma işlemi için iki seçenek vardır:

### Seçenek 1: Yerel Yazdırma Servisi (Önerilen)

Bilgisayarınızda çalışan bir yazdırma servisi oluşturun:

1. `print-service` klasöründe bir Node.js servisi oluşturun
2. Bu servis, yazdırma isteklerini dinler ve yerel yazıcıya yazdırır
3. Vercel'deki uygulama, yazdırma isteklerini bu servise webhook ile gönderir

### Seçenek 2: API Endpoint ile Yazdırma

`app/api/print/route.ts` dosyasındaki yazdırma komutunu düzenleyin:

```typescript
// Windows için
const printCommand = `powershell -Command "Start-Process -FilePath '${photoPath}' -Verb Print"`

// Linux/Mac için
const printCommand = `lp -d "XP-80C" "${photoPath}"`
```

**Not**: Bu yöntem sadece uygulamanın yazıcıya doğrudan erişebildiği yerel ortamlarda çalışır.

## 📦 Vercel'e Deploy Etme

### Adım 1: GitHub'a Yükleyin

```bash
git init
git add .
git commit -m "İlk commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Adım 2: Vercel'e Bağlayın

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Framework Preset: **Next.js** olarak ayarlayın
5. Root Directory: **./** (varsayılan)
6. Build Command: `npm run build` (otomatik)
7. Output Directory: `.next` (otomatik)
8. Install Command: `npm install` (otomatik)

### Adım 3: Environment Variables (Gerekirse)

Eğer yazdırma servisi için webhook URL'i kullanıyorsanız:

- `PRINT_SERVICE_URL`: Yazdırma servisinin URL'i

### Adım 4: Deploy

"Deploy" butonuna tıklayın. Vercel otomatik olarak:
- Bağımlılıkları yükler
- Projeyi build eder
- Production'a deploy eder

### Adım 5: Domain Ayarları

Deploy tamamlandıktan sonra:
- Vercel otomatik bir URL verir (örn: `your-app.vercel.app`)
- Custom domain ekleyebilirsiniz (Settings > Domains)

## 📁 Proje Yapısı

```
pos/
├── app/
│   ├── api/
│   │   ├── upload/      # Fotoğraf yükleme endpoint'i
│   │   ├── photos/      # Fotoğrafları listeleme endpoint'i
│   │   └── print/       # Yazdırma endpoint'i
│   ├── globals.css      # Global stiller
│   ├── layout.tsx       # Ana layout
│   └── page.tsx         # Ana sayfa
├── components/
│   ├── PhotoUpload.tsx  # Fotoğraf yükleme bileşeni
│   └── RecentPhotos.tsx # Son fotoğraflar bileşeni
├── public/
│   └── uploads/         # Yüklenen fotoğraflar (gitignore'da)
├── data/
│   └── photos.json      # Fotoğraf metadata (gitignore'da)
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Yapılandırma

### Yazıcı Adını Değiştirme

`app/api/print/route.ts` dosyasında:

```typescript
const printerName = 'XP-80C' // Buraya yazıcı adınızı yazın
```

### Fotoğraf Limitini Değiştirme

`app/api/upload/route.ts` dosyasında:

```typescript
const recentPhotos = photos.slice(0, 50) // 50 yerine istediğiniz sayıyı yazın
```

## 🐛 Sorun Giderme

### Yazdırma Çalışmıyor

1. Yazıcının bilgisayarınıza bağlı olduğundan emin olun
2. Yazıcı adının doğru olduğunu kontrol edin
3. Yerel yazdırma servisi kullanıyorsanız servisin çalıştığından emin olun

### Fotoğraflar Görünmüyor

1. `public/uploads` klasörünün oluşturulduğundan emin olun
2. Dosya izinlerini kontrol edin
3. Browser console'da hata mesajlarını kontrol edin

### Vercel'de Deploy Hatası

1. Build loglarını kontrol edin
2. `package.json`'daki bağımlılıkları kontrol edin
3. Node.js versiyonunu kontrol edin (18+ gerekli)

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce:
1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

---

**Not**: Bu uygulama eğitim amaçlıdır. Production kullanımı için güvenlik ve performans iyileştirmeleri yapılmalıdır.

