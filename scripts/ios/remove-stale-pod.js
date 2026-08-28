/*
 * Removes a leftover PurchasesHybridCommon pod when upgrading from a CocoaPods-based version.
 *
 * PurchasesHybridCommon is resolved through Swift Package Manager, so the plugin declares no pod.
 * Apps coming from an 8.x install keep the old `pod 'PurchasesHybridCommon'` line in their Podfile:
 * cordova's iOS uninstall path throws before it gets to remove it (it reads `<podspec><config>`,
 * which those versions did not declare). Left in place, PurchasesHybridCommon would be built twice,
 * once by CocoaPods and once by SwiftPM.
 *
 * cordova re-runs `pod install` on every prepare, so removing the entry here is enough for it to
 * disappear from the generated Pods project on the next build.
 */

const fs = require('fs');
const path = require('path');

const POD_NAME = 'PurchasesHybridCommon';

module.exports = function (context) {
    try {
        const platformPath = path.join(context.opts.projectRoot, 'platforms', 'ios');

        if (!removePodFromPodfile(path.join(platformPath, 'Podfile'))) {
            return;
        }

        removePodFromPodsJson(path.join(platformPath, 'pods.json'));

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

// Keeps cordova's bookkeeping in sync so it stops counting a pod that is no longer in the Podfile.
function removePodFromPodsJson(podsJsonPath) {
    if (!fs.existsSync(podsJsonPath)) {
        return;
    }

    const podsJson = JSON.parse(fs.readFileSync(podsJsonPath, 'utf8'));
    if (!podsJson.libraries || !podsJson.libraries[POD_NAME]) {
        return;
    }

    delete podsJson.libraries[POD_NAME];
    fs.writeFileSync(podsJsonPath, JSON.stringify(podsJson, null, 4));
}
