This release drops support for cordova-ios 6 and 7. The plugin now requires cordova-ios 8 or newer.

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

### Reporting undocumented issues:

Feel free to file an issue! [New RevenueCat Issue](https://github.com/RevenueCat/cordova-plugin-purchases/issues/new/).
