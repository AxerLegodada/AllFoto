import { NextResponse } from 'next/server'
import { existsSync } from 'fs'
import path from 'path'

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

export async function GET() {
  try {
    const photos = await loadPhotos()
    return NextResponse.json(photos)
  } catch (error) {
    console.error('Fotoğraflar getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Fotoğraflar yüklenemedi' },
      { status: 500 }
    )
  }
}
