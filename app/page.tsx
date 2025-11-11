'use client'

import { useState, useEffect } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import RecentPhotos from '@/components/RecentPhotos'

export interface Photo {
  id: string
  filename: string
  url: string
  uploadedAt: string
  status: 'pending' | 'printing' | 'printed' | 'error'
}

export default function Home() {
  const [recentPhotos, setRecentPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecentPhotos()
  }, [])

  const fetchRecentPhotos = async () => {
    try {
      const response = await fetch('/api/photos')
      if (response.ok) {
        const data = await response.json()
        setRecentPhotos(data)
      }
    } catch (error) {
      console.error('Fotoğraflar yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUploaded = (photo: Photo) => {
    setRecentPhotos((prev: Photo[]) => [photo, ...prev])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📸 Fotoğraf Yazdırma
          </h1>
          <p className="text-xl text-gray-600">
            Fotoğrafınızı yükleyin, otomatik olarak yazdırılsın
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Fotoğraf Yükle
            </h2>
            <PhotoUpload onUploaded={handlePhotoUploaded} />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Son Resimler
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <RecentPhotos photos={recentPhotos} onUpdate={fetchRecentPhotos} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

