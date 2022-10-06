//
//  PurchasesPlugin.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 6/27/22
//
// the code for the plugin lives in CDVPurchasesPlugin

import Foundation
import PurchasesHybridCommon
import RevenueCat

public class CDVPurchasesPlugin : CDVPlugin {

    public typealias DeferredPromotionalPurchaseBlock = (@escaping PurchaseCompletedBlock) -> Void
    typealias HybridResponseBlock = ([String: Any]?, ErrorContainer?) -> Void

    var updatedCustomerInfoCallbackID: String!
    var shouldPurchasePromoProductCallbackID: String?
    var defermentBlocks: [DeferredPromotionalPurchaseBlock] = []

    private var purchases: Purchases!

    @objc(configure:)
    func configure(command: CDVInvokedUrlCommand) {
        guard let apiKey = command.arguments[0] as? String else {
            self.sendBadParameterFor(command: command, parameterNamed: "apiKey", expectedType: String.self)
            return
        }
        let appUserID = command.arguments[1] as? String
        let observerMode = command.arguments[2] as? Bool ?? false
        let userDefaultsSuiteName = command.arguments[3] as? String
    
        self.purchases = Purchases.configure(apiKey: apiKey,
                                             appUserID: appUserID,
                                             observerMode: observerMode,
                                             userDefaultsSuiteName: userDefaultsSuiteName,
                                             platformFlavor: self.platformFlavor,
                                             platformFlavorVersion: self.platformFlavorVersion,
                                             dangerousSettings: nil)
        self.updatedCustomerInfoCallbackID = command.callbackId
        self.purchases.delegate = self
        let pluginResult = CDVPluginResult(status: .noResult)
        pluginResult?.setKeepCallbackAs(true)
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    @objc(setupShouldPurchasePromoProductCallback:)
    func setupShouldPurchasePromoProductCallback(command: CDVInvokedUrlCommand) {
        self.shouldPurchasePromoProductCallbackID = command.callbackId
    }

    @objc(setDebugLogsEnabled:)
    func setDebugLogsEnabled(command: CDVInvokedUrlCommand) {
        guard let debugLogsEnabled = command.arguments[0] as? Bool else {
            self.sendBadParameterFor(command: command, parameterNamed: "debugLogsEnabled", expectedType: Bool.self)
            return
        }

        CommonFunctionality.setDebugLogsEnabled(debugLogsEnabled)
        self.sendOKFor(command: command)
    }

}


extension CDVPurchasesPlugin {

    var platformFlavor: String {
        return "cordova"
    }

    var platformFlavorVersion: String {
        return "3.2.0-SNAPSHOT"
    }

}
