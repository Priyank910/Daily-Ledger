# Daily Ledger

A clean, offline-first Android bookkeeping app for small shops. Record daily income and expenses, track the current balance, review monthly or custom-date reports, and export account statements as PDF or CSV.

[![Download Android APK](https://img.shields.io/badge/Download-Android_APK-08775a?style=for-the-badge&logo=android&logoColor=white)](https://github.com/Priyank910/Daily-Ledger/releases/latest/download/Daily-Ledger-Android.apk)

> Android 7.0 or newer is required. Android may ask you to allow installation from your browser or file manager.

## Features

- One-time shop name and opening-balance setup
- Fast daily income and expense entry
- Automatic running balance
- Monthly totals that switch automatically without deleting previous records
- Searchable transaction history
- Monthly and custom-date reporting
- PDF and CSV exports through Android's native share/save menu
- Local-first storage with no account or internet connection required
- Mobile-first, accessible interface

## How monthly accounting works

At the beginning of a new month, the dashboard automatically shows income and expenses for the new month. The current balance carries forward and previous transactions remain available in **Transactions** and **Reports**. Nothing is deleted or reset.

## Data and backups

Ledger data is stored locally on the Android device. Clearing the app's storage or uninstalling it removes that data. Export PDF or CSV statements regularly as backups.

## Development

Prerequisites: Node.js 22+, Java 21, and the Android SDK.

```bash
npm install
npm run dev
```

Create or update the native Android project:

```bash
npm run android:sync
cd android
./gradlew assembleDebug
```

The APK is generated at `android/app/build/outputs/apk/debug/app-debug.apk`.

## Technology

React, TypeScript, Vite, Capacitor, jsPDF, and Android Gradle tooling.

## Releases

Pushing a version tag such as `v1.0.0` runs the included GitHub Actions workflow, builds the APK, and attaches it to a GitHub Release automatically.
