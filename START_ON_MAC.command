#!/bin/bash
cd "$(dirname "$0")"

echo "========================================================"
echo "  Starting A1-MART Enterprise Retail ERP (React + Vite)"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not found!"
    echo "Please download and install Node.js from https://nodejs.org"
    read -p "Press Enter to exit..."
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing project dependencies (first-time setup)..."
    echo "This may take a minute..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install encountered an error."
        read -p "Press Enter to exit..."
        exit 1
    fi
fi

echo ""
echo "[INFO] Launching A1-MART Dev Server..."
echo "Opening http://localhost:3000 in your browser..."
(sleep 2 && open "http://localhost:3000") &
npm run dev
