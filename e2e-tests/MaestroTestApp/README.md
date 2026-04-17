# Maestro E2E Test App

A minimal Cordova app used by Maestro end-to-end tests to verify RevenueCat SDK integration.

## Prerequisites

- Node.js & npm
- Xcode (iOS) / Android Studio (Android)
- [Maestro](https://maestro.mobile.dev/) CLI
- Gradle (for Android builds)

## Setup

The plugin under test is linked from the repo root (not installed from npm), so the
steps below mirror what the Fastlane lane does on CI.

```bash
# From repo root: build the plugin's TypeScript sources
npm install && npm run build

cd e2e-tests/MaestroTestApp

# Replace the API-key placeholder with a real key (see "API Key" below)
sed -i '' 's/MAESTRO_TESTS_REVENUECAT_API_KEY/<your-api-key>/g' www/js/app.js

npm install

# iOS
cordova platform add ios
cordova plugin add ../.. --link --nosave --force
cordova run ios

# Android
cordova platform add android
cordova plugin add ../.. --link --nosave --force
cordova run android
```

## API Key

The app initialises RevenueCat with the placeholder `MAESTRO_TESTS_REVENUECAT_API_KEY`.
To run locally, replace it in `www/js/app.js` with a valid API key from the RevenueCat
project that has the Test Store configured (do **not** commit the real key).

On CI, the Fastlane lane replaces the placeholder with the value of the
`RC_E2E_TEST_API_KEY_PRODUCTION_TEST_STORE` environment variable (provided by the
`e2e-tests` CircleCI context).

## RevenueCat Project

The test uses a RevenueCat project configured with:
- A `pro` entitlement (the test checks entitlement status after purchase)
- The **Test Store** environment for purchase confirmation

## Note on Cordova

`cordova-plugin-purchases` does not have native paywall APIs, so the test
performs a direct purchase via `Purchases.purchasePackage()` instead of
presenting a paywall.
