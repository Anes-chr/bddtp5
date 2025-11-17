@echo off
echo ====================================
echo  TP4 SQL Master Web Application
echo  Starting Development Server...
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/2] Installing dependencies...
    echo This might take a few minutes...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please make sure Node.js is installed.
        pause
        exit /b 1
    )
) else (
    echo [1/2] Dependencies already installed ✓
)

echo.
echo [2/2] Starting development server...
echo.
echo ====================================
echo  Server will start at:
echo  http://localhost:3000
echo ====================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
