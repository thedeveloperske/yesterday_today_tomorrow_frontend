# Project Setup Guide: Yesterday Today Tomorrow (React Native/Expo)

This guide will help you set up, run, and deploy the Yesterday Today Tomorrow journal app on your local machine and for production. It covers prerequisites, environment setup, development workflow, and deployment.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the App (Development)](#running-the-app-development)
6. [Code Quality & Linting](#code-quality--linting)
7. [Building for Production](#building-for-production)
8. [Deployment (EAS Build & Appetize.io)](#deployment-eas-build--appetizeio)
9. [Troubleshooting](#troubleshooting)
10. [Useful Scripts](#useful-scripts)
11. [Contact & Credits](#contact--credits)

---

## 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended) or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** (`npm install -g eas-cli`) for production builds
- **Git** (for version control)
- **Android Studio** and/or **Xcode** (for local device/simulator testing)
- **Backend API**: Ensure the FastAPI backend is running and accessible (default: `http://localhost:8000`).

## 2. Project Structure
```
front-end/
  app/                # Main app screens and navigation
  components/         # Reusable UI components
  context/            # React context providers
  config/             # API and Firebase config
  assets/             # Images, fonts, and static assets
  ...
  package.json        # Project dependencies and scripts
  app.json            # Expo app configuration
  tsconfig.json       # TypeScript config (if used)
  README.md           # Project overview
  SETUP.md            # (This file)
```

## 3. Installation
1. **Clone the repository:**
   ```powershell
   git clone <your-repo-url>
   cd front-end
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   # or
   yarn install
   ```
3. **Install Expo Go app** on your mobile device (for local testing):
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 4. Environment Variables
- If you need to override API endpoints or secrets, create a `.env` file in the root:
  ```env
  API_URL=http://localhost:8000
  # Add other variables as needed
  ```
- Use `process.env.API_URL` in your config files if needed.

## 5. Running the App (Development)
1. **Start the backend API** (FastAPI):
   - Make sure your backend is running at the expected URL (default: `http://localhost:8000`).
2. **Start the Expo development server:**
   ```powershell
   npx expo start
   # or
   npm run start
   ```
3. **Open the app:**
   - Scan the QR code with Expo Go (on your device), or
   - Press `a` to open Android emulator, `i` for iOS simulator (if installed).

## 6. Code Quality & Linting
- **Lint:**
  ```powershell
  npx eslint .
  ```
- **Format:**
  ```powershell
  npx prettier --write .
  ```
- **Type Check (if using TypeScript):**
  ```powershell
  npx tsc --noEmit
  ```

## 7. Building for Production
- **EAS Build (recommended):**
  1. Login to Expo/EAS:
     ```powershell
     npx eas login
     ```
  2. Build for Android/iOS:
     ```powershell
     npx eas build --platform android
     npx eas build --platform ios
     ```
  3. Download the build artifacts from the EAS dashboard.

- **Classic Expo Build (deprecated):**
  ```powershell
  npx expo build:android
  npx expo build:ios
  ```

## 8. Deployment (EAS Build & Appetize.io)
- **Appetize.io:**
  1. After EAS build, upload your `.apk` or `.ipa` to [Appetize.io](https://appetize.io/upload).
  2. Share the generated link for browser-based demo.
- **Play Store / App Store:**
  - Follow Expo/EAS documentation for publishing to app stores.

## 9. Troubleshooting
- **Metro bundler stuck?**
  - Stop all node processes and restart: `npx expo start -c`
- **Dependency issues?**
  - Delete `node_modules` and `package-lock.json`, then reinstall.
- **Backend not connecting?**
  - Check your API URL and CORS settings.
- **Fonts not loading?**
  - Ensure assets/fonts are linked and loaded in your app entry.

## 10. Useful Scripts
- **Start:** `npm run start`
- **Lint:** `npm run lint`
- **Build:** `npm run build`
- **Test:** `npm run test` (if tests are set up)

## 11. Contact & Credits
- **Developer:** See the About section in the app's Settings page.
- **Expo Docs:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/docs/getting-started
- **mui/x-charts Docs:** https://mui.com/x/react-charts/

---

For further help, open an issue or contact the developer via the app's About modal.
