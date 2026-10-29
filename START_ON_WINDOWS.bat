@echo off
title A1-MART ERP - Enterprise Retail System
echo ========================================================
echo   Starting A1-MART Enterprise Retail ERP (React + Vite)
echo ========================================================
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please install Node.js from https://nodejs.org (LTS recommended).
    echo After installing, restart this script.
    echo.
    pause
    exit /b
)

if not exist "node_modules\" (
    echo [INFO] Installing project dependencies (first-time setup)...
    echo This may take a minute...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        pause
        exit /b
    )
)

echo.
echo [INFO] Launching A1-MART Dev Server...
echo Opening http://localhost:3000 in your browser...
start http://localhost:3000
call npm run dev
pause
