@echo off
echo ====================================
echo   Ngrok Tüneli Başlatılıyor
echo ====================================
echo.
echo Port 3001 için tünel oluşturuluyor...
echo.
echo NOT: Bu URL'yi Vercel'de PRINT_SERVICE_URL olarak ayarlayın!
echo.

ngrok http 3001

pause

