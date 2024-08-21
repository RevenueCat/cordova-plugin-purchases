> [!WARNING]  
> This library is now deprecated. We suggest using our [Capacitor SDK](https://github.com/revenuecat/purchases-capacitor) instead.
>
> The Cordova SDK will receive maintenance updates, but new RevenueCat features and new major versions will not be made available. Billing Client v7 will be the latest version this SDK will ever support (it won't be updated to v8), which means that Google will not allow updates to your app after August 31st, 2026 [Read more about Google's Billing Client deprecation schedule](https://developer.android.com/google/play/billing/deprecation-faq)

<h3 align="center">😻 In-app Subscriptions Made Easy 😻</h1>

[![Version](https://img.shields.io/npm/v/cordova-plugin-purchases.svg?style=flat)](https://www.npmjs.com/package/cordova-plugin-purchases)
[![License](https://img.shields.io/npm/l/cordova-plugin-purchases.svg?style=flat)](https://www.npmjs.com/package/cordova-plugin-purchases)

## cordova-plugin-purchases

*Purchases* is a client for the [RevenueCat](https://www.revenuecat.com/) subscription and purchase tracking system. It is an open source framework that provides a wrapper around `BillingClient`, `StoreKit` and the RevenueCat backend to make implementing in-app subscriptions easy - receipt validation and status tracking included!

## Features
|   | RevenueCat |
| --- | --- |
✅ | Server-side receipt validation
➡️ | [Webhooks](https://docs.revenuecat.com/docs/webhooks) - enhanced server-to-server communication with events for purchases, renewals, cancellations, and more
🎯 | Subscription status tracking - know whether a user is subscribed whether they're on iOS, Android or web
📊 | Analytics - automatic calculation of metrics like conversion, mrr, and churn
📝 | [Online documentation](https://docs.revenuecat.com/docs) and [SDK Reference](http://revenuecat.github.io/cordova-plugin-purchases-docs) up to date
🔀 | [Integrations](https://www.revenuecat.com/integrations) - over a dozen integrations to easily send purchase data where you need it
💯 | Well maintained - [frequent releases](https://github.com/RevenueCat/cordova-plugin-purchases/releases)
📮 | Great support - [Help Center](https://revenuecat.zendesk.com/)
🤩 | Awesome [new features](https://trello.com/b/RZRnWRbI/revenuecat-product-roadmap)


## Installation
Please follow the [Quickstart Guide](https://docs.revenuecat.com/docs/) for more information on how to use the SDK

### Requirements
*cordova-plugin-purchases* requires Xcode 15+ and minimum targets iOS 13.0+. The minimum Android version compatible is 5.0 (API level 21).

## SDK Reference
Our full SDK reference [can be found here](https://revenuecat.github.io/cordova-plugin-purchases-docs).
