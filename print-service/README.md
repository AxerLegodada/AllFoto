# 🖨️ Yerel Yazdırma Servisi

Bu servis, Vercel'de deploy edilen uygulamadan gelen yazdırma isteklerini alır ve yerel XP-80C yazıcısına yazdırır.

## Kurulum

```bash
cd print-service
npm install
```

## Kullanım

```bash
npm start
```

Servis varsayılan olarak `http://localhost:3001` portunda çalışır.

## Yapılandırma

`.env` dosyası oluşturun:

```
PORT=3001
PRINTER_NAME=XP-80C
API_KEY=your-secret-key-here
```

## API Endpoint

### POST /print

Yazdırma isteği gönderir.

**Request Body:**
```json
{
  "photoUrl": "https://your-app.vercel.app/uploads/photo.jpg",
  "apiKey": "your-secret-key-here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Fotoğraf yazdırıldı"
}
```

## Vercel Uygulamasını Güncelleme

`app/api/print/route.ts` dosyasını güncelleyin:

```typescript
// Yazdırma isteğini yerel servise gönder
const printServiceUrl = process.env.PRINT_SERVICE_URL || 'http://localhost:3001'

const response = await fetch(`${printServiceUrl}/print`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    photoUrl: `${process.env.NEXT_PUBLIC_APP_URL}${photo.url}`,
    apiKey: process.env.PRINT_SERVICE_API_KEY,
  }),
})
```

