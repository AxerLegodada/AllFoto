# ⚙️ Vercel Environment Variables Ayarlama

Ngrok URL'iniz hazır! Şimdi Vercel'de environment variables'ları ayarlayın.

## 🔑 Ngrok Bilgileriniz

- **Ngrok URL**: `https://nonperverted-wendi-unrefulgently.ngrok-free.dev`
- **Port**: 3001

## 📝 Adım Adım Vercel Ayarları

### 1. Vercel Dashboard'a Gidin

1. [vercel.com](https://vercel.com) hesabınıza giriş yapın
2. Projenizi seçin
3. **Settings** sekmesine tıklayın
4. Sol menüden **Environment Variables** seçin

### 2. Environment Variables Ekleyin

Aşağıdaki 3 değişkeni ekleyin:

#### Değişken 1: PRINT_SERVICE_URL

- **Key**: `PRINT_SERVICE_URL`
- **Value**: `https://nonperverted-wendi-unrefulgently.ngrok-free.dev`
- **Environment**: Production, Preview, Development (hepsini seçin)

#### Değişken 2: PRINT_SERVICE_API_KEY

- **Key**: `PRINT_SERVICE_API_KEY`
- **Value**: `print-service` klasöründeki `.env` dosyasındaki `API_KEY` değeri
  - Eğer `.env` dosyası yoksa, `print-service` klasöründe oluşturun:
    ```
    API_KEY=your-super-secret-key-12345
    ```
  - **ÖNEMLİ**: Güçlü bir şifre kullanın!
- **Environment**: Production, Preview, Development (hepsini seçin)

#### Değişken 3: NEXT_PUBLIC_APP_URL

- **Key**: `NEXT_PUBLIC_APP_URL`
- **Value**: Vercel'deki uygulamanızın URL'i (örn: `https://your-app.vercel.app`)
  - Bu URL'yi Vercel dashboard'da projenizin ana sayfasında görebilirsiniz
- **Environment**: Production, Preview, Development (hepsini seçin)

### 3. Deploy'u Yenileyin

Environment variables ekledikten sonra:

1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **Redeploy** seçin
4. Veya yeni bir commit push edin (otomatik deploy başlar)

## ✅ Test Etme

1. Vercel'deki uygulamanızı açın
2. Bir fotoğraf yükleyin
3. Yazdırma işleminin çalıştığını kontrol edin
4. Bilgisayarınızdaki yazıcıdan çıktı alındığını kontrol edin

## 🔍 Sorun Giderme

### Yazdırma Çalışmıyor

1. **Ngrok'un çalıştığını kontrol edin:**
   - Terminal'de ngrok'un hala çalıştığından emin olun
   - Ngrok URL'inin değişmediğini kontrol edin

2. **Print Service'in çalıştığını kontrol edin:**
   - `http://localhost:3001/health` adresini tarayıcıda açın
   - `{"status":"ok","printer":"XP-80C"}` yanıtını görmelisiniz

3. **API Key'i kontrol edin:**
   - Vercel'deki `PRINT_SERVICE_API_KEY` ile print-service'teki `.env` dosyasındaki `API_KEY` aynı olmalı

4. **Environment Variables'ı kontrol edin:**
   - Vercel'de tüm değişkenlerin doğru ayarlandığından emin olun
   - Redeploy yaptığınızdan emin olun

### Ngrok URL Değişti

Ngrok ücretsiz planında URL her başlatmada değişir. URL değiştiğinde:

1. Yeni URL'yi kopyalayın
2. Vercel'de `PRINT_SERVICE_URL` değişkenini güncelleyin
3. Redeploy yapın

**Not**: Sabit URL için ngrok'un ücretli planını kullanabilirsiniz.

## 📋 Özet

✅ Ngrok çalışıyor: `https://nonperverted-wendi-unrefulgently.ngrok-free.dev`  
✅ Print service çalışıyor: `http://localhost:3001`  
⏳ Vercel'de environment variables ayarlanacak  
⏳ Deploy yenilenecek  

Tamamlandığında yazdırma işlemi çalışacak! 🎉

