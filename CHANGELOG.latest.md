## RevenueCat SDK
### 💥 Breaking Changes
This release requires cordova-ios 8+ and cordova-android 13+. On older platform versions cordova skips the plugin for that platform instead of installing it; stay on cordova-plugin-purchases 8.x if you cannot upgrade. The plugin no longer installs `cordova-plugin-add-swift-support`, since cordova-ios 8 compiles Swift natively.

On iOS, the plugin and `PurchasesHybridCommon` now resolve through Swift Package Manager instead of CocoaPods. Installing the plugin removes the old `PurchasesHybridCommon` pod entry. Existing projects may keep a Podfile that makes Cordova run `pod install`; keep CocoaPods installed while it does. Upgrading from cordova-ios 7 or earlier regenerates `platforms/ios/`, so back up native changes first (see the [v9 migration guide](https://github.com/RevenueCat/cordova-plugin-purchases/blob/main/migrations/v9-MIGRATION.md)).

The Android SDK dependency moves to v11, which uses Google Play Billing Library 9.1.0. Apps must compile against API 35 (cordova-android 14 default; on 13 set `android-compileSdkVersion` to 35 in `config.xml`) and, if they compile their own Kotlin, use Kotlin 2.1.0 or newer. A blocked Play Store now reports `PurchaseNotAllowedError` (code 3) instead of `StoreProblemError` (code 2).

On iOS, package purchases that fail because offerings could not load now report the offerings error instead of `ProductNotAvailableForPurchaseError`.

`PurchasesEntitlementInfo.periodType` is now typed as `PeriodType` (`"NORMAL" | "INTRO" | "TRIAL" | "PREPAID"`) instead of `string`.

See the [v9 migration guide](https://github.com/RevenueCat/cordova-plugin-purchases/blob/main/migrations/v9-MIGRATION.md).

* Replace CocoaPods with Swift Package Manager on iOS (#1042) via Antonio Pallares (@ajpallares)
* Drop support for cordova-android 12 and older (#1100) via Álvaro Brey (@AlvaroBrey)
* Type PurchasesEntitlementInfo.periodType as PeriodType (#1075) via Álvaro Brey (@AlvaroBrey)
* Drop support for cordova-ios 6 and 7 (#1045) via Antonio Pallares (@ajpallares)

### 🔄 Other Changes
* docs: clarify the v9 iOS migration steps (#1113) via Antonio Pallares (@ajpallares)
* docs: cover the iOS offerings error change in the v9 migration guide (#1106) via Álvaro Brey (@AlvaroBrey)
* Build against purchases-hybrid-common 20.0.0-SNAPSHOT (#1099) via Álvaro Brey (@AlvaroBrey)
* Add Android and TypeScript changes to the v9 migration guide (#1091) via Álvaro Brey (@AlvaroBrey)
