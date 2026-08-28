/*
 * Removes a leftover PurchasesHybridCommon pod after the plugin is installed as a Swift package.
 *
 * On cordova-ios 8+ the plugin and PurchasesHybridCommon are resolved through Swift Package
 * Manager, so no pod is declared. Apps coming from a CocoaPods-based version of this plugin keep
 * the old `pod 'PurchasesHybridCommon'` line in their Podfile: cordova's iOS uninstall path throws
 * before it gets to remove it (it reads `<podspec><config>`, which older versions of this plugin
 * did not declare). Left in place, PurchasesHybridCommon would be built twice, once by CocoaPods
 * and once by SwiftPM.
 *
 * cordova re-runs `pod install` on every prepare, so removing the entry here is enough for it to
 * disappear from the generated Pods project on the next build.
 */

const fs = require('fs');
const path = require('path');

const POD_NAME = 'PurchasesHybridCommon';
const PLUGIN_ID = 'cordova-plugin-purchases';

module.exports = function (context) {
    try {
        const platformPath = path.join(context.opts.projectRoot, 'platforms', 'ios');

        // Only SwiftPM installs create this directory. On cordova-ios < 8 the pod is the only
        // source of PurchasesHybridCommon and has to be left alone.
        if (!fs.existsSync(path.join(platformPath, 'packages', PLUGIN_ID))) {
            return;
        }

        const podsJsonPath = path.join(platformPath, 'pods.json');
        const podsJson = readJson(podsJsonPath);
        const library = podsJson && podsJson.libraries && podsJson.libraries[POD_NAME];

        if (library && library.count > 1) {
            return;
        }

        if (!removePodFromPodfile(path.join(platformPath, 'Podfile'))) {
            return;
        }

        if (library) {
            delete podsJson.libraries[POD_NAME];
            fs.writeFileSync(podsJsonPath, JSON.stringify(podsJson, null, 4));
        }

        console.log(
            'Removed the ' + POD_NAME + ' pod left over by a previous install. It is now resolved through Swift Package Manager.'
        );
    } catch (e) {
        console.error('Warning: could not remove the leftover ' + POD_NAME + ' pod: ' + e.message);
        console.error(
            'If the build fails with duplicate ' + POD_NAME + ' symbols, remove its pod entry from platforms/ios/Podfile.'
        );
    }
};

function removePodFromPodfile(podfilePath) {
    // cordova-ios only writes a Podfile when some plugin contributes CocoaPods entries, so a
    // project may not have one at all.
    if (!fs.existsSync(podfilePath)) {
        return false;
    }

    const contents = fs.readFileSync(podfilePath, 'utf8');
    const podLine = new RegExp("^.*\\bpod\\s+'" + POD_NAME + "'.*$\\n?", 'm');
    if (!podLine.test(contents)) {
        return false;
    }

    // `use_frameworks!` is left behind on purpose: other plugins' pods may rely on it, and it is
    // inert when no pods remain.
    fs.writeFileSync(podfilePath, contents.replace(podLine, ''));
    return true;
}

function readJson(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
