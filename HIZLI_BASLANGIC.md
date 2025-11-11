# 🚀 Hızlı Başlangıç Rehberi

Bu rehber, uygulamayı hızlıca çalıştırmanız için özet talimatlar içerir.

## 📦 1. Projeyi Hazırlama

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## 🖨️ 2. Yazdırma Servisini Başlatma

### Windows için:

1. `print-service` klasörüne gidin
2. `start.bat` dosyasını çift tıklayın (veya terminalde çalıştırın)
3. Yeni bir terminal açın ve `start-ngrok.bat` dosyasını çalıştırın
4. Ngrok'un verdiği URL'yi kopyalayın (örn: `https://abc123.ngrok-free.app`)

### Manuel Başlatma:

```bash
cd print-service
npm install
npm start
```

Yeni terminal:
```bash
ngrok http 3001
```

## ⚙️ 3. Vercel'e Deploy

1. GitHub'a push edin
2. Vercel'de yeni proje oluşturun
3. Environment Variables ekleyin:
   - `PRINT_SERVICE_URL`: Ngrok URL'iniz
   - `PRINT_SERVICE_API_KEY`: print-service/.env dosyasındaki API_KEY
   - `NEXT_PUBLIC_APP_URL`: Vercel'deki uygulama URL'iniz

## ✅ 4. Test

1. Vercel'deki uygulamanızı açın
2. Bir fotoğraf yükleyin
3. Yazdırma işleminin çalıştığını kontrol edin

## 📚 Detaylı Bilgi

- Tam kurulum için: `print-service/KURULUM.md`
- Deploy için: `DEPLOY.md`
- Genel bilgi: `README.md`

