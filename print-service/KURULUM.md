# 🖨️ Yerel Yazdırma Servisi Kurulum Rehberi

Bu rehber, bilgisayarınızda yazdırma servisini çalıştırıp Vercel'den bağlanmak için adım adım talimatlar içerir.

## 📋 Gereksinimler

- Node.js 18+ yüklü olmalı
- XP-80C yazıcısı bilgisayarınıza bağlı ve yüklü olmalı
- İnternet bağlantısı (ngrok için)

## 🔧 Adım 1: Servisi Kurma

### 1.1 Klasöre Gidin

```bash
cd print-service
```

### 1.2 Bağımlılıkları Yükleyin

```bash
npm install
```

### 1.3 Environment Dosyası Oluşturun

`.env` dosyası oluşturun:

```env
PORT=3001
PRINTER_NAME=XP-80C
API_KEY=your-super-secret-key-12345
```

**ÖNEMLİ**: `API_KEY` değerini güçlü bir şifre ile değiştirin!

## 🚀 Adım 2: Servisi Başlatma

```bash
npm start
```

Servis başladığında şu mesajı göreceksiniz:

```
🖨️  Yazdırma servisi çalışıyor: http://localhost:3001
📋 Yazıcı: XP-80C
🔑 API Key: your-super-secret-key-12345
```

## 🌐 Adım 3: Servisi Dışarı Açma (Ngrok ile)

Vercel'den bilgisayarınıza erişmek için ngrok kullanacağız.

### 3.1 Ngrok Kurulumu

1. [ngrok.com](https://ngrok.com) adresine gidin
2. Ücretsiz hesap oluşturun
3. Ngrok'u indirin ve kurun
4. Ngrok'a giriş yapın:

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 3.2 Ngrok Tüneli Oluşturma

Yeni bir terminal açın ve şu komutu çalıştırın:

```bash
ngrok http 3001
```

Ngrok size bir URL verecek, örneğin:

```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:3001
```

**Bu URL'yi kopyalayın!** (örn: `https://abc123.ngrok-free.app`)

### 3.3 Ngrok URL'ini Not Edin

Ngrok her başlatıldığında farklı bir URL verir. Eğer sabit bir URL istiyorsanız:

1. Ngrok hesabınızda "Reserved Domain" satın alın (ücretsiz plan)
2. Veya ngrok'u otomatik başlatmak için bir script kullanın

## ⚙️ Adım 4: Vercel'de Environment Variables Ayarlama

### 4.1 Vercel Dashboard'a Gidin

1. [vercel.com](https://vercel.com) hesabınıza giriş yapın
2. Projenizi seçin
3. "Settings" sekmesine gidin
4. "Environment Variables" bölümüne gidin

### 4.2 Environment Variables Ekleyin

Şu değişkenleri ekleyin:

| Key | Value | Açıklama |
|-----|-------|----------|
| `PRINT_SERVICE_URL` | `https://abc123.ngrok-free.app` | Ngrok URL'iniz |
| `PRINT_SERVICE_API_KEY` | `your-super-secret-key-12345` | .env dosyasındaki API_KEY |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Vercel'deki uygulama URL'iniz |

### 4.3 Deploy'u Yenileyin

Environment variables ekledikten sonra:
1. "Redeploy" butonuna tıklayın
2. Veya yeni bir commit push edin

## ✅ Adım 5: Test Etme

### 5.1 Servis Durumunu Kontrol Edin

Tarayıcınızda şu adresi açın:

```
http://localhost:3001/health
```

Şu yanıtı görmelisiniz:

```json
{
  "status": "ok",
  "printer": "XP-80C"
}
```

### 5.2 Vercel Uygulamasını Test Edin

1. Vercel'de deploy edilen uygulamanızı açın
2. Bir fotoğraf yükleyin
3. Yazdırma işleminin çalıştığını kontrol edin

## 🔄 Adım 6: Otomatik Başlatma (İsteğe Bağlı)

### Windows için (Task Scheduler)

1. `start-print-service.bat` dosyası oluşturun:

```batch
@echo off
cd /d "C:\path\to\print-service"
npm start
```

2. Task Scheduler'da bu dosyayı otomatik başlatacak bir görev oluşturun

### Windows için (PM2 - Önerilen)

```bash
npm install -g pm2
cd print-service
pm2 start server.js --name print-service
pm2 save
pm2 startup
```

### Ngrok'u Otomatik Başlatma

`start-ngrok.bat` dosyası oluşturun:

```batch
@echo off
ngrok http 3001
```

## 🐛 Sorun Giderme

### Servis Başlamıyor

- Port 3001'in kullanılmadığından emin olun
- Node.js'in yüklü olduğunu kontrol edin
- `npm install` komutunu tekrar çalıştırın

### Yazdırma Çalışmıyor

- Yazıcının bilgisayarınıza bağlı olduğundan emin olun
- Yazıcı adının doğru olduğunu kontrol edin (Windows'ta yazıcı adını görmek için: `Get-Printer` PowerShell komutu)
- `.env` dosyasındaki `PRINTER_NAME` değerini kontrol edin

### Ngrok Bağlantı Hatası

- Ngrok'un çalıştığından emin olun
- İnternet bağlantınızı kontrol edin
- Ngrok URL'inin Vercel'de doğru ayarlandığından emin olun

### Vercel'den Bağlanamıyor

- Environment variables'ların doğru ayarlandığını kontrol edin
- Ngrok URL'inin güncel olduğundan emin olun (her başlatmada değişir)
- API_KEY'in her iki tarafta da aynı olduğundan emin olun

## 📝 Notlar

- Ngrok ücretsiz planında URL her başlatmada değişir
- Sabit URL için ngrok'un ücretli planını kullanabilirsiniz
- Alternatif olarak, kendi sunucunuzda bir reverse proxy kurabilirsiniz
- Güvenlik için API_KEY'i güçlü tutun ve paylaşmayın

## 🔒 Güvenlik

- API_KEY'i asla GitHub'a yüklemeyin
- `.env` dosyasını `.gitignore`'a eklediğinizden emin olun
- Ngrok URL'inizi sadece güvendiğiniz kişilerle paylaşın
- Mümkünse ngrok'un IP kısıtlaması özelliğini kullanın

## 🎉 Tamamlandı!

Artık Vercel'deki uygulamanız, bilgisayarınızdaki yazıcıya bağlanabilir!

