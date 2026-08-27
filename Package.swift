// swift-tools-version:5.9

import PackageDescription

let package = Package(
    name: "cordova-plugin-purchases",
    platforms: [
        .iOS(.v13)
    ],
    products: [
        // cordova-ios looks up this product by the plugin id, so it must match the id in plugin.xml.
        .library(name: "cordova-plugin-purchases", targets: ["PurchasesPlugin"])
    ],
    dependencies: [
        // cordova-ios rewrites this to a local path pointing at the app's own CordovaLib
        // when it installs the plugin, so the branch is only used outside of a Cordova project.
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/RevenueCat/purchases-hybrid-common.git", exact: "18.32.1")
    ],
    targets: [
        .target(
            name: "PurchasesPlugin",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "PurchasesHybridCommon", package: "purchases-hybrid-common")
            ],
            path: "src/ios"
        )
    ]
)
