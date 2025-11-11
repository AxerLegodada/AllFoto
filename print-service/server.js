const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

const app = express()
const PORT = process.env.PORT || 3001
const PRINTER_NAME = process.env.PRINTER_NAME || 'XP-80C'
const API_KEY = process.env.API_KEY || 'change-this-secret-key'

// CORS ayarları - Vercel'den gelen isteklere izin ver
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())

// Fotoğrafları geçici olarak saklamak için dizin
const TEMP_DIR = path.join(__dirname, 'temp')
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true })
}

// Fotoğrafı indir
async function downloadPhoto(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const filename = path.join(TEMP_DIR, `photo-${Date.now()}.jpg`)
    const file = fs.createWriteStream(filename)

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`))
        return
      }

      response.pipe(file)

      file.on('finish', () => {
        file.close()
        resolve(filename)
      })
    }).on('error', (err) => {
      fs.unlink(filename, () => {})
      reject(err)
    })
  })
}

// Yazdırma fonksiyonu
async function printPhoto(photoPath) {
  const platform = process.platform

  let command
  if (platform === 'win32') {
    // Windows için - XP-80C yazıcısına yazdır
    // Eğer varsayılan yazıcı değilse, yazıcı adını belirtin
    const photoPathEscaped = photoPath.replace(/'/g, "''")
    command = `powershell -Command "$printer = Get-Printer -Name '${PRINTER_NAME}' -ErrorAction SilentlyContinue; if ($printer) { Start-Process -FilePath '${photoPathEscaped}' -Verb PrintTo -ArgumentList '${PRINTER_NAME}' } else { Start-Process -FilePath '${photoPathEscaped}' -Verb Print }"`
  } else if (platform === 'darwin') {
    // macOS için
    command = `lp -d "${PRINTER_NAME}" "${photoPath}"`
  } else {
    // Linux için
    command = `lp -d "${PRINTER_NAME}" "${photoPath}"`
  }

  try {
    console.log('Yazdırma komutu çalıştırılıyor:', command)
    await execAsync(command)
    console.log('Yazdırma başarılı!')
    return true
  } catch (error) {
    console.error('Yazdırma hatası:', error)
    // Windows'ta yazıcı bulunamazsa varsayılan yazıcıyı dene
    if (platform === 'win32') {
      try {
        const fallbackCommand = `powershell -Command "Start-Process -FilePath '${photoPath.replace(/'/g, "''")}' -Verb Print"`
        console.log('Varsayılan yazıcı ile deneniyor...')
        await execAsync(fallbackCommand)
        return true
      } catch (fallbackError) {
        console.error('Varsayılan yazıcı ile de başarısız:', fallbackError)
        throw error
      }
    }
    throw error
  }
}

// API Key kontrolü middleware
function checkApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.body.apiKey

  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Geçersiz API anahtarı' })
  }

  next()
}

// Yazdırma endpoint'i
app.post('/print', checkApiKey, async (req, res) => {
  try {
    const { photoUrl } = req.body

    if (!photoUrl) {
      return res.status(400).json({ error: 'photoUrl gerekli' })
    }

    console.log('Fotoğraf indiriliyor:', photoUrl)
    const photoPath = await downloadPhoto(photoUrl)

    console.log('Fotoğraf yazdırılıyor:', photoPath)
    await printPhoto(photoPath)

    // Geçici dosyayı sil
    setTimeout(() => {
      fs.unlink(photoPath, (err) => {
        if (err) console.error('Dosya silinirken hata:', err)
      })
    }, 5000)

    res.json({
      success: true,
      message: 'Fotoğraf yazdırıldı',
    })
  } catch (error) {
    console.error('Hata:', error)
    res.status(500).json({
      error: 'Yazdırma başarısız',
      details: error.message,
    })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', printer: PRINTER_NAME })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🖨️  Yazdırma servisi çalışıyor: http://localhost:${PORT}`)
  console.log(`📋 Yazıcı: ${PRINTER_NAME}`)
  console.log(`🔑 API Key: ${API_KEY}`)
  console.log(`\n⚠️  ÖNEMLİ: Bu servisi dışarı açmak için ngrok kullanın:`)
  console.log(`   ngrok http ${PORT}`)
  console.log(`\n📝 Vercel'de şu environment variable'ları ayarlayın:`)
  console.log(`   PRINT_SERVICE_URL=<ngrok-url>`)
  console.log(`   PRINT_SERVICE_API_KEY=${API_KEY}`)
})

