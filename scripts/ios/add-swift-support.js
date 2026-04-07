/*
 * Conditionally installs cordova-plugin-add-swift-support for cordova-ios < 8.
 *
 * cordova-ios 8+ has native Swift support so the plugin is unnecessary.
 * cordova-plugin-add-swift-support 2.0.2 also crashes on cordova-ios 8 because
 * it looks for <AppName>.xcodeproj but cordova-ios 8 renamed it to App.xcodeproj.
 *
 * For cordova-ios < 8, the plugin is still needed to configure the Xcode project
 * for Swift compilation (bridging header, Swift version, etc.).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function (context) {
    const projectRoot = context.opts.projectRoot;
    const platformPath = path.join(projectRoot, 'platforms', 'ios');

    let iosVersion;
    try {
        const versionScript = path.join(platformPath, 'cordova', 'version');
        iosVersion = execSync('"' + versionScript + '"', { encoding: 'utf-8' }).trim();
    } catch (e) {
        return;
    }

    const major = parseInt(iosVersion.split('.')[0], 10);
    if (major >= 8) {
        console.log('cordova-ios ' + iosVersion + ' detected — native Swift support, skipping cordova-plugin-add-swift-support');
        return;
    }

    var pluginDir = path.join(projectRoot, 'plugins', 'cordova-plugin-add-swift-support');
    if (fs.existsSync(pluginDir)) {
        console.log('cordova-plugin-add-swift-support already installed, skipping');
        return;
    }

    console.log('cordova-ios ' + iosVersion + ' detected — installing cordova-plugin-add-swift-support for Swift support');
    try {
        execSync('cordova plugin add cordova-plugin-add-swift-support --nosave', {
            cwd: projectRoot,
            stdio: 'inherit'
        });
    } catch (e) {
        console.error('Warning: failed to install cordova-plugin-add-swift-support: ' + e.message);
        console.error('You may need to install it manually: cordova plugin add cordova-plugin-add-swift-support');
    }
};
