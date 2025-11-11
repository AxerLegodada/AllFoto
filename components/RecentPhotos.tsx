'use client'

import { Photo } from '@/app/page'
import { useEffect, useState } from 'react'

interface RecentPhotosProps {
  photos: Photo[]
  onUpdate: () => void
}

export default function RecentPhotos({ photos, onUpdate }: RecentPhotosProps) {
  const [localPhotos, setLocalPhotos] = useState<Photo[]>(photos)

  useEffect(() => {
    setLocalPhotos(photos)
  }, [photos])

  useEffect(() => {
    // Her 3 saniyede bir durumları güncelle
    const interval = setInterval(() => {
      onUpdate()
    }, 3000)

    return () => clearInterval(interval)
  }, [onUpdate])

  const getStatusBadge = (status: Photo['status']) => {
    const badges = {
      pending: { text: 'Sırada', color: 'bg-yellow-100 text-yellow-800' },
      printing: { text: 'Yazdırılıyor', color: 'bg-blue-100 text-blue-800' },
      printed: { text: 'Yazdırıldı', color: 'bg-green-100 text-green-800' },
      error: { text: 'Hata', color: 'bg-red-100 text-red-800' },
    }
    const badge = badges[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {badge.text}
      </span>
    )
  }

  if (localPhotos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p>Henüz fotoğraf yüklenmedi</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {localPhotos.map((photo: Photo) => (
        <div
          key={photo.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex items-start gap-4">
            <img
              src={photo.url}
              alt={photo.filename}
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800 truncate">
                  {photo.filename}
                </h3>
                {getStatusBadge(photo.status)}
              </div>
              <p className="text-sm text-gray-500">
                {new Date(photo.uploadedAt).toLocaleString('tr-TR')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

