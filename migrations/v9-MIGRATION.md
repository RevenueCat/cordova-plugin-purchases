This release drops support for cordova-ios 6 and 7, and updates the Android SDK dependency from v10 to v11, which uses Google Play Billing Library 9.1.0 and Kotlin 2.2. See the [Android Native - V11 API Migration Guide](https://github.com/RevenueCat/purchases-android/blob/main/migrations/v11-MIGRATION.md) for a more thorough explanation of the Android changes.

## iOS

The plugin now requires cordova-ios 8 or newer.

### Upgrading your project

If your app is on an older platform version, update it before upgrading the plugin:

```bash
cordova platform rm ios
cordova platform add ios@8
```

cordova-ios 8 requires iOS 13.0 or newer, Xcode 15 or newer, and Node.js 20.17 or newer. The plugin already required iOS 13.0 and Xcode 15, so the deployment target of your app does not change.

### What happens if you don't upgrade

The plugin declares `cordova-ios >= 8.0.0` as an engine requirement, so on older platform versions cordova skips it for iOS instead of installing it. `cordova plugin add` still succeeds, and the warning it prints is the only sign that iOS was left out:

```
Plugin doesn't support this project's cordova-ios version. cordova-ios: 7.1.1, failed version requirement: >=8.0.0
Skipping 'cordova-plugin-purchases' for ios
```

If you cannot move to cordova-ios 8 yet, stay on the 8.x line of this plugin. It remains available on npm and continues to support cordova-ios 6 and 7.

### `cordova-plugin-add-swift-support` is no longer installed

Previous versions installed [cordova-plugin-add-swift-support](https://github.com/akofman/cordova-plugin-add-swift-support) on your behalf to configure the Xcode project for Swift. cordova-ios 8 supports Swift natively, so the plugin is no longer needed and is no longer added. Nothing is required on your side unless your own code depended on it, in which case you can keep installing it yourself.

## Android

### compileSdk 35 or higher

The Android SDK requires apps to compile against API 35 or later. cordova-android 14 does this by default. On cordova-android 13, the build fails in `checkDebugAarMetadata` with `Dependency 'androidx.core:core:1.15.0' requires libraries and applications that depend on it to compile against version 35 or later`. Upgrade cordova-android, or set the compile SDK in `config.xml`:

```xml
<platform name="android">
    <preference name="android-compileSdkVersion" value="35" />
</platform>
```

### Kotlin 2.1.0 or newer, if your app compiles Kotlin

The plugin itself is written in Java and is not affected. If you enabled `GradlePluginKotlinEnabled` to compile your own Kotlin code, its default version in cordova-android 13 and 14 is 1.9.24, which cannot read the Android SDK. Set a newer one:

```xml
<preference name="GradlePluginKotlinVersion" value="2.1.0" />
```

### Blocked Play Store reports `PurchaseNotAllowedError`

When the Play Store is blocked on the device (for example in OEM kids modes), purchases now fail with error code 3 (`PurchaseNotAllowedError`) instead of 2 (`StoreProblemError`). Code 2 is still reported for other store failures, so handle the new code alongside it rather than replacing it.

### Other Play Billing libraries in your app

The Android SDK puts Play Billing Library 9.1.0 on your app's classpath. Any other in-app purchase plugin in the same app, for example one you use to complete purchases with your own code, must support Play Billing Library 9. Versions that use APIs it removed, such as `SkuDetails`, fail at build time or at runtime.

## TypeScript

### `PurchasesEntitlementInfo.periodType` is typed as `PeriodType`

`periodType` was typed as `string`. It is now the `PeriodType` union: `"NORMAL" | "INTRO" | "TRIAL" | "PREPAID"`. Values at runtime do not change. Comparisons against any other string, such as lowercase `"trial"`, no longer compile. They never matched, so once you fix the comparison, the code behind it runs for the first time. Check it before shipping.

## Reporting undocumented issues:

Feel free to file an issue! [New RevenueCat Issue](https://github.com/RevenueCat/cordova-plugin-purchases/issues/new/).
