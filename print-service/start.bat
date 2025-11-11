@echo off
echo ====================================
echo   Yazdırma Servisi Başlatılıyor
echo ====================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo Bağımlılıklar yükleniyor...
    call npm install
    echo.
)

echo Servis başlatılıyor...
echo.
echo NOT: Bu pencereyi kapatmayın!
echo Ngrok'u başlatmak için yeni bir terminal açın ve:
echo   ngrok http 3001
echo.
echo ====================================
echo.

node server.js

pause

