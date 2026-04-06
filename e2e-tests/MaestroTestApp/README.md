# Maestro E2E Test App

A minimal Cordova app used by Maestro end-to-end tests to verify RevenueCat SDK integration.

## Prerequisites

- Node.js & npm
- Xcode (iOS) / Android Studio (Android)
- [Maestro](https://maestro.mobile.dev/) CLI
- Gradle (for Android builds)

## Setup

```bash
npm install
npx cordova prepare
```

## Running Locally

```bash
# iOS
npx cordova run ios --emulator

# Android
npx cordova run android --emulator
```

## API Key

The app initialises RevenueCat with the placeholder `MAESTRO_TESTS_REVENUECAT_API_KEY`.
In CI, the Fastlane lane replaces this placeholder with the real key from the
`RC_E2E_TEST_API_KEY_PRODUCTION_TEST_STORE` environment variable (provided by the
CircleCI `e2e-tests` context) before building.

To run locally, either:
- Replace the placeholder in `www/js/app.js` with a valid API key (do **not** commit it), or
- Export the env var and run the same `sed` command the Fastlane lane uses.

## RevenueCat Project

The test uses a RevenueCat project configured with:
- A `pro` entitlement (the test checks entitlement status after purchase)
- The **Test Store** environment for purchase confirmation

## Note on Cordova

`cordova-plugin-purchases` does not have native paywall APIs, so the test
performs a direct purchase via `Purchases.purchasePackage()` instead of
presenting a paywall.
