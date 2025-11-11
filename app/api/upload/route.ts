import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Fotoğrafları saklamak için dizin
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const PHOTOS_FILE = path.join(process.cwd(), 'data', 'photos.json')

// Dizinleri oluştur
async function ensureDirectories() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
  const dataDir = path.dirname(PHOTOS_FILE)
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
}

// Fotoğrafları yükle
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

// Fotoğrafları kaydet
async function savePhotos(photos: any[]) {
  try {
    const fs = await import('fs/promises')
    await fs.writeFile(PHOTOS_FILE, JSON.stringify(photos, null, 2))
  } catch (error) {
    console.error('Fotoğraflar kaydedilirken hata:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories()

    const formData = await request.formData()
    const file = formData.get('photo') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    // Dosyayı kaydet
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileExtension = path.extname(file.name)
    const filename = `${uuidv4()}${fileExtension}`
    const filepath = path.join(UPLOAD_DIR, filename)

    await writeFile(filepath, buffer)

    // Fotoğraf bilgisini kaydet
    const photo = {
      id: uuidv4(),
      filename: file.name,
      url: `/uploads/${filename}`,
      uploadedAt: new Date().toISOString(),
      status: 'pending' as const,
    }

    const photos = await loadPhotos()
    photos.unshift(photo)
    // Son 50 fotoğrafı tut
    const recentPhotos = photos.slice(0, 50)
    await savePhotos(recentPhotos)

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Yükleme hatası:', error)
    return NextResponse.json(
      { error: 'Yükleme başarısız' },
      { status: 500 }
    )
  }
}
