'use client'

import { useState, useRef } from 'react'
import { Photo } from '@/app/page'

interface PhotoUploadProps {
  onUploaded: (photo: Photo) => void
}

export default function PhotoUpload({ onUploaded }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'printing' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setUploadStatus('idle')
    } else {
      alert('Lütfen geçerli bir resim dosyası seçin!')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadStatus('uploading')

    const formData = new FormData()
    formData.append('photo', selectedFile)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Yükleme başarısız')
      }

      const data = await response.json()
      setUploadStatus('printing')
      
      // Yazdırma işlemini başlat
      const printResponse = await fetch('/api/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId: data.id }),
      })

      if (printResponse.ok) {
        setUploadStatus('success')
        onUploaded(data)
        
        // Formu temizle
        setTimeout(() => {
          setSelectedFile(null)
          setPreview(null)
          setUploadStatus('idle')
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }, 2000)
      } else {
        setUploadStatus('error')
      }
    } catch (error) {
      console.error('Yükleme hatası:', error)
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Yükleniyor...'
      case 'printing':
        return 'Yazdırılıyor...'
      case 'success':
        return '✅ Yazdırıldı!'
      case 'error':
        return '❌ Hata oluştu!'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
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
          <span className="text-gray-600 font-medium">
            {selectedFile ? selectedFile.name : 'Fotoğraf seçin'}
          </span>
        </label>
      </div>

      {preview && (
        <div className="relative">
          <div className="text-sm font-medium text-gray-700 mb-2">Önizleme:</div>
          <img
            src={preview}
            alt="Önizleme"
            className="w-full h-64 object-contain rounded-lg border border-gray-200"
          />
        </div>
      )}

      {selectedFile && (
        <div className="space-y-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {isUploading ? 'İşleniyor...' : 'Yükle ve Yazdır'}
          </button>

          {uploadStatus !== 'idle' && (
            <div className={`text-center py-2 px-4 rounded-lg font-medium ${
              uploadStatus === 'success' ? 'bg-green-100 text-green-700' :
              uploadStatus === 'error' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {getStatusMessage()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

