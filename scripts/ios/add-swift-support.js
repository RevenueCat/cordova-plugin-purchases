/*
 * Configures the Xcode project for Swift compilation on cordova-ios < 8.
 *
 * cordova-ios 8+ has native Swift support — no configuration needed.
 *
 * For cordova-ios < 8, this hook directly performs the Xcode project
 * modifications that cordova-plugin-add-swift-support would do:
 *   - Creates a Bridging-Header.h importing Cordova/CDV.h
 *   - Merges any plugin-provided bridging headers into the main one
 *   - Sets SWIFT_OBJC_BRIDGING_HEADER, SWIFT_VERSION,
 *     ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES, and LD_RUNPATH_SEARCH_PATHS
 *
 * This avoids depending on cordova-plugin-add-swift-support, which is
 * unmaintained and crashes on cordova-ios 8 due to hardcoded project paths.
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
        console.log('cordova-ios ' + iosVersion + ' — native Swift support, no configuration needed');
        return;
    }

    console.log('cordova-ios ' + iosVersion + ' — configuring Xcode project for Swift');

    const ConfigParser = context.requireCordovaModule('cordova-common/src/ConfigParser/ConfigParser');
    const config = new ConfigParser(path.join(projectRoot, 'config.xml'));
    const projectName = config.name();
    const projectDir = path.join(platformPath, projectName);
    const pbxprojPath = path.join(platformPath, projectName + '.xcodeproj', 'project.pbxproj');

    // xcode module is available in cordova's dependency tree
    let xcode;
    try {
        xcode = require(path.join(projectRoot, 'node_modules', 'xcode'));
    } catch (e) {
        try {
            xcode = context.requireCordovaModule('xcode');
        } catch (e2) {
            console.error('Warning: could not find xcode module — falling back to cordova-plugin-add-swift-support');
            fallbackToPlugin(projectRoot);
            return;
        }
    }

    const xcodeProject = xcode.project(pbxprojPath);
    xcodeProject.parseSync();

    // 1. Create or update bridging header
    const bridgingHeaderPath = path.join(projectDir, 'Bridging-Header.h');
    if (!fs.existsSync(bridgingHeaderPath)) {
        const content = [
            '//',
            '// Use this file to import your target\'s public headers that you would like to expose to Swift.',
            '//',
            '#import <Cordova/CDV.h>'
        ].join('\n');
        fs.writeFileSync(bridgingHeaderPath, content, 'utf-8');
        xcodeProject.addHeaderFile('Bridging-Header.h');
        console.log('  Created Bridging-Header.h');
    }

    // 2. Merge any plugin-provided bridging headers
    const pluginsPath = path.join(projectDir, 'Plugins');
    if (fs.existsSync(pluginsPath)) {
        const bridgingHeaders = findBridgingHeaders(pluginsPath);
        let content = fs.readFileSync(bridgingHeaderPath, 'utf-8');
        bridgingHeaders.forEach(function (header) {
            if (header !== 'Bridging-Header.h' && content.indexOf(header) === -1) {
                if (content.charAt(content.length - 1) !== '\n') {
                    content += '\n';
                }
                content += '#import "' + header + '"\n';
                console.log('  Importing ' + header + ' into Bridging-Header.h');
            }
        });
        fs.writeFileSync(bridgingHeaderPath, content, 'utf-8');
    }

    // 3. Update build settings
    const COMMENT_KEY = /_comment$/;
    const buildConfigs = xcodeProject.pbxXCBuildConfigurationSection();
    const bridgingHeaderRef = '"$(PROJECT_DIR)/$(PROJECT_NAME)/Bridging-Header.h"';

    for (const configName in buildConfigs) {
        if (COMMENT_KEY.test(configName)) continue;
        const buildConfig = buildConfigs[configName];

        if (xcodeProject.getBuildProperty('SWIFT_OBJC_BRIDGING_HEADER', buildConfig.name) !== bridgingHeaderRef) {
            xcodeProject.updateBuildProperty('SWIFT_OBJC_BRIDGING_HEADER', bridgingHeaderRef, buildConfig.name);
        }

        if (xcodeProject.getBuildProperty('ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES', buildConfig.name) !== 'YES') {
            xcodeProject.updateBuildProperty('ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES', 'YES', buildConfig.name);
        }

        if (xcodeProject.getBuildProperty('LD_RUNPATH_SEARCH_PATHS', buildConfig.name) !== '"@executable_path/Frameworks"') {
            xcodeProject.updateBuildProperty('LD_RUNPATH_SEARCH_PATHS', '"@executable_path/Frameworks"', buildConfig.name);
        }

        if (typeof xcodeProject.getBuildProperty('SWIFT_VERSION', buildConfig.name) === 'undefined') {
            const swiftVersion = config.getPreference('UseSwiftLanguageVersion', 'ios') || '5.0';
            xcodeProject.updateBuildProperty('SWIFT_VERSION', swiftVersion, buildConfig.name);
            console.log('  Set SWIFT_VERSION to ' + swiftVersion + ' for ' + buildConfig.name);
        }

        if (buildConfig.name === 'Debug') {
            if (xcodeProject.getBuildProperty('SWIFT_OPTIMIZATION_LEVEL', buildConfig.name) !== '"-Onone"') {
                xcodeProject.updateBuildProperty('SWIFT_OPTIMIZATION_LEVEL', '"-Onone"', buildConfig.name);
            }
        }
    }

    fs.writeFileSync(pbxprojPath, xcodeProject.writeSync());
    console.log('  Xcode project configured for Swift');
};

function findBridgingHeaders(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push.apply(results, findBridgingHeaders(fullPath));
        } else if (entry.name.indexOf('Bridging-Header') !== -1 && entry.name.endsWith('.h')) {
            results.push(entry.name);
        }
    }
    return results;
}

function fallbackToPlugin(projectRoot) {
    var pluginDir = path.join(projectRoot, 'plugins', 'cordova-plugin-add-swift-support');
    if (fs.existsSync(pluginDir)) {
        console.log('cordova-plugin-add-swift-support already installed, skipping fallback');
        return;
    }
    try {
        execSync('cordova plugin add cordova-plugin-add-swift-support --nosave', {
            cwd: projectRoot,
            stdio: 'inherit'
        });
    } catch (e) {
        console.error('Warning: failed to install cordova-plugin-add-swift-support: ' + e.message);
    }
}
