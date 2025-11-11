# 📁 GitHub'a Yüklenecek Dosyalar

Bu dosya, GitHub'a hangi dosyaların yükleneceğini ve hangilerinin yüklenmeyeceğini açıklar.

## ✅ GitHub'a YÜKLENECEK Dosyalar

### Ana Proje Dosyaları
```
pos/
├── app/                          ✅ Tüm app klasörü
│   ├── api/                      ✅ API endpoint'leri
│   ├── globals.css               ✅ Global stiller
│   ├── layout.tsx                ✅ Layout dosyası
│   └── page.tsx                  ✅ Ana sayfa
├── components/                   ✅ Tüm bileşenler
│   ├── PhotoUpload.tsx           ✅
│   └── RecentPhotos.tsx          ✅
├── print-service/                ✅ Yazdırma servisi (sadece kaynak kodlar)
│   ├── server.js                 ✅
│   ├── package.json              ✅
│   ├── README.md                 ✅
│   ├── KURULUM.md                ✅
│   ├── start.bat                 ✅
│   └── start-ngrok.bat           ✅
├── .gitignore                    ✅ Git ignore dosyası
├── next.config.js                ✅ Next.js yapılandırması
├── package.json                  ✅ Proje bağımlılıkları
├── postcss.config.js             ✅ PostCSS yapılandırması
├── tailwind.config.js            ✅ Tailwind yapılandırması
├── tsconfig.json                 ✅ TypeScript yapılandırması
├── README.md                     ✅ Ana README
├── DEPLOY.md                     ✅ Deploy rehberi
├── HIZLI_BASLANGIC.md            ✅ Hızlı başlangıç
├── VERCEL_AYARLARI.md            ✅ Vercel ayarları
└── YAZDIRMA_SERVISI.md           ✅ Yazdırma servisi özeti
```

## ❌ GitHub'a YÜKLENMEYECEK Dosyalar

### Otomatik Olarak İgnore Edilenler (.gitignore sayesinde)
```
node_modules/                     ❌ Bağımlılıklar (npm install ile yüklenir)
.next/                           ❌ Next.js build dosyaları
out/                             ❌ Build çıktıları
.vercel/                         ❌ Vercel yapılandırması
.env                             ❌ Environment variables (gizli bilgiler)
.env.local                       ❌ Local environment variables
.env*.local                      ❌ Tüm local env dosyaları
public/uploads/                  ❌ Yüklenen fotoğraflar
data/                            ❌ Fotoğraf metadata (JSON)
print-service/node_modules/      ❌ Print service bağımlılıkları
print-service/temp/              ❌ Geçici dosyalar
print-service/.env               ❌ Print service environment variables
*.log                            ❌ Log dosyaları
.DS_Store                        ❌ macOS sistem dosyası
```

## 🔒 Güvenlik Notları

**ASLA GitHub'a yüklemeyin:**
- `.env` dosyaları (API key'ler, şifreler içerir)
- `print-service/.env` dosyası
- Gerçek API key'ler
- Kişisel bilgiler

## 📋 GitHub'a Yüklemeden Önce Kontrol Listesi

- [ ] `.env` dosyası var mı? → `.gitignore`'da olduğundan emin olun
- [ ] `print-service/.env` dosyası var mı? → `.gitignore`'da olduğundan emin olun
- [ ] `node_modules` klasörü yok mu? → `.gitignore` sayesinde otomatik ignore edilir
- [ ] `data/` klasörü yok mu? → `.gitignore`'a eklendi
- [ ] `public/uploads/` klasörü yok mu? → `.gitignore`'da zaten var
- [ ] Tüm kaynak kodlar mevcut mu? → `app/`, `components/` klasörleri
- [ ] Yapılandırma dosyaları mevcut mu? → `package.json`, `next.config.js`, vb.

## 🚀 GitHub'a Yükleme Komutları

```bash
# Git repository'yi başlat (eğer yoksa)
git init

# Tüm dosyaları ekle (.gitignore'daki dosyalar otomatik ignore edilir)
git add .

# Commit yap
git commit -m "İlk commit - Fotoğraf yazdırma uygulaması"

# GitHub repository'nizi ekleyin (URL'i kendi repository'nizle değiştirin)
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git

# Main branch'e push edin
git branch -M main
git push -u origin main
```

## 📝 Önemli Notlar

1. **Environment Variables**: `.env` dosyaları GitHub'a yüklenmez, bu yüzden Vercel'de manuel olarak ayarlamanız gerekir.

2. **Print Service**: `print-service` klasörü GitHub'a yüklenir, ancak `.env` dosyası ve `node_modules` yüklenmez. Kullanıcılar `npm install` yapmalıdır.

3. **Fotoğraflar**: Yüklenen fotoğraflar GitHub'a yüklenmez. Production'da cloud storage kullanmanız önerilir.

4. **Build Dosyaları**: `.next/` ve `out/` klasörleri yüklenmez. Vercel otomatik olarak build eder.

## ✅ Hazır!

Artık GitHub'a güvenli bir şekilde yükleyebilirsiniz. `.gitignore` dosyası hassas bilgileri otomatik olarak koruyacaktır.

