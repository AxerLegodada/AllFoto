import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const PHOTOS_FILE = path.join(process.cwd(), 'data', 'photos.json')

async function loadPhotos() {
  try {
    if (existsSync(PHOTOS_FILE)) {
      const fs = await import('fs/promises')
      const data = await fs.readFile(PHOTOS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Fotoğraflar yüklenirken hata:', error)
  }
  return []
}

async function savePhotos(photos: any[]) {
  try {
    const fs = await import('fs/promises')
    await fs.writeFile(PHOTOS_FILE, JSON.stringify(photos, null, 2))
  } catch (error) {
    console.error('Fotoğraflar kaydedilirken hata:', error)
  }
}

async function updatePhotoStatus(photoId: string, status: 'pending' | 'printing' | 'printed' | 'error') {
  const photos = await loadPhotos()
  const photoIndex = photos.findIndex((p: any) => p.id === photoId)
  if (photoIndex !== -1) {
    photos[photoIndex].status = status
    await savePhotos(photos)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { photoId } = await request.json()

    if (!photoId) {
      return NextResponse.json(
        { error: 'Fotoğraf ID gerekli' },
        { status: 400 }
      )
    }

    // Fotoğrafı bul
    const photos = await loadPhotos()
    const photo = photos.find((p: any) => p.id === photoId)

    if (!photo) {
      return NextResponse.json(
        { error: 'Fotoğraf bulunamadı' },
        { status: 404 }
      )
    }

    // Durumu "yazdırılıyor" olarak güncelle
    await updatePhotoStatus(photoId, 'printing')

    // Yazdırma servisi URL'i (environment variable'dan veya varsayılan)
    const printServiceUrl = process.env.PRINT_SERVICE_URL
    // Vercel'de veya production'da tam URL kullan
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000')
    const photoUrl = `${appUrl}${photo.url}`
    
    console.log('Yazdırma isteği:', { photoId, photoUrl, printServiceUrl })

    // Eğer yazdırma servisi URL'i varsa, oraya istek gönder
    if (printServiceUrl) {
      try {
        const response = await fetch(`${printServiceUrl}/print`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.PRINT_SERVICE_API_KEY || '',
          },
          body: JSON.stringify({
            photoUrl: photoUrl,
            apiKey: process.env.PRINT_SERVICE_API_KEY,
          }),
        })

        if (!response.ok) {
          throw new Error(`Yazdırma servisi hatası: ${response.statusText}`)
        }

        await updatePhotoStatus(photoId, 'printed')
        return NextResponse.json({
          success: true,
          message: 'Fotoğraf yazdırıldı',
        })
      } catch (error: any) {
        console.error('Yazdırma servisi hatası:', error)
        await updatePhotoStatus(photoId, 'error')
        return NextResponse.json(
          { error: 'Yazdırma başarısız', details: error.message },
          { status: 500 }
        )
      }
    }

    // Yerel yazdırma (sadece development için)
    const photoPath = path.join(process.cwd(), 'public', photo.url)
    
    if (!existsSync(photoPath)) {
      await updatePhotoStatus(photoId, 'error')
      return NextResponse.json(
        { error: 'Fotoğraf dosyası bulunamadı' },
        { status: 404 }
      )
    }

    // Windows için yazdırma komutu (XP-80C yazıcısı için)
    const printerName = 'XP-80C'
    const printCommand = process.platform === 'win32'
      ? `powershell -Command "Start-Process -FilePath '${photoPath}' -Verb Print"`
      : `lp -d "${printerName}" "${photoPath}"`

    try {
      // Yerel yazdırma (sadece development'ta çalışır)
      console.log('Yerel yazdırma komutu:', printCommand)
      
      // Gerçek yazdırma için yorumu kaldırın:
      // await execAsync(printCommand)
      
      // Şimdilik simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      await updatePhotoStatus(photoId, 'printed')

      return NextResponse.json({
        success: true,
        message: 'Fotoğraf yazdırıldı',
        note: process.env.NODE_ENV === 'production' 
          ? 'Not: Production için PRINT_SERVICE_URL environment variable\'ını ayarlayın.'
          : 'Not: Gerçek yazdırma için yukarıdaki execAsync satırının yorumunu kaldırın veya yazdırma servisi kullanın.'
      })
    } catch (error: any) {
      console.error('Yazdırma hatası:', error)
      await updatePhotoStatus(photoId, 'error')
      return NextResponse.json(
        { error: 'Yazdırma başarısız', details: error.message },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Yazdırma endpoint hatası:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası', details: error.message },
      { status: 500 }
    )
  }
}

