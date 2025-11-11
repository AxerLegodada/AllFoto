# 🖨️ Yazdırma Servisi - Özet

Bilgisayarınızdan bir API açıp Vercel'den bu API'ye bağlanarak yazdırma yapabilirsiniz.

## 🎯 Nasıl Çalışır?

1. **Bilgisayarınızda** yazdırma servisi çalışır (port 3001)
2. **Ngrok** ile bu servisi internete açar
3. **Vercel'deki uygulama** ngrok URL'ine istek gönderir
4. **Yazdırma servisi** fotoğrafı indirir ve yazdırır

## ⚡ Hızlı Başlangıç

### 1. Servisi Başlat

```bash
cd print-service
npm install
npm start
```

### 2. Ngrok'u Başlat

Yeni terminal:
```bash
ngrok http 3001
```

URL'i kopyala (örn: `https://abc123.ngrok-free.app`)

### 3. Vercel'de Ayarla

Environment Variables:
- `PRINT_SERVICE_URL` = `https://abc123.ngrok-free.app`
- `PRINT_SERVICE_API_KEY` = `.env` dosyasındaki `API_KEY`
- `NEXT_PUBLIC_APP_URL` = Vercel uygulama URL'iniz

## 📝 Detaylar

Tam kurulum için: `print-service/KURULUM.md`

