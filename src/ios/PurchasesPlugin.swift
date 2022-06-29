//
//  PurchasesPlugin.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 6/27/22
//
// the code for the plugin lives in CDVPurchasesPlugin

import Foundation
import PurchasesHybridCommon

public class CDVPurchasesPlugin : CDVPlugin {

    private var updatedPurchaserInfoCallbackID: String?
    private var shouldPurchasePromoProductCallbackID: String?
    private var defermentBlocks: [RCDeferredPromotionalPurchaseBlock] = []

    @objc(setupPurchases:)
    func setupPurchases(command: CDVInvokedUrlCommand) {
        guard let apiKey = command.arguments[0] as? String else {
            self.sendBadParameterFor(command: command, parameterNamed: "apiKey", expectedType: String.self)
            return
        }
        let appUserID = command.arguments[1] as? String
        let observerMode = command.arguments[2] as? Bool ?? false
        let userDefaultsSuiteName = command.arguments[3] as? String

        Purchases.configure(withAPIKey: apiKey,
                            appUserID: appUserID,
                            observerMode: observerMode,
                            userDefaultsSuiteName: userDefaultsSuiteName,
                            platformFlavor: self.platformFlavor,
                            platformFlavorVersion: self.platformFlavorVersion)
        Purchases.shared.delegate = self

        self.updatedPurchaserInfoCallbackID = command.callbackId
        let pluginResult = CDVPluginResult(status: .noResult)
        pluginResult?.setKeepCallbackAs(true)
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    @objc(setAllowSharingStoreAccount:)
    func setAllowSharingStoreAccount(command: CDVInvokedUrlCommand) {
        let allowSharingStoreAccount = command.arguments[0] as? Bool ?? false

        RCCommonFunctionality.setAllowSharingStoreAccount(allowSharingStoreAccount)
        self.sendOKFor(command: command)
    }

    @objc(addAttributionData:)
    func addAttributionData(command: CDVInvokedUrlCommand) {
        let network = command.arguments[1] as? Int
        let networkUserId = command.arguments[2] as? String

        guard let data = command.arguments[0] as? [AnyHashable: Any],
              let network = network,
              let networkUserId = networkUserId else {
            self.sendBadParametersFor(command: command,
                                      parametersNamed: ["data", "network", "networkUserId"],
                                      expectedTypes: [NSDictionary.self, Int.self, String.self])
            return
        }

        RCCommonFunctionality.addAttributionData(data, network: network, networkUserId: networkUserId)
        self.sendOKFor(command: command)
    }

    @objc(getOfferings:)
    func getOfferings(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.getOfferingsWithCompletionBlock(self.responseCompletion(forCommand: command))
    }

    @objc(getProductInfo:)
    func getProductInfo(command: CDVInvokedUrlCommand) {
        guard let products = command.arguments[0] as? [Any] else {
            self.sendBadParameterFor(command: command, parameterNamed: "products", expectedType: NSArray.self)
            return
        }

        RCCommonFunctionality.getProductInfo(products) {
            self.sendOKFor(command: command, messageAsArray: $0)
        }
    }

    @objc(purchaseProduct:)
    func purchaseProduct(command: CDVInvokedUrlCommand) {
        guard let productIdentifier = command.arguments[0] as? String else {
            self.sendBadParameterFor(command: command, parameterNamed: "productIdentifier", expectedType: String.self)
            return
        }

        RCCommonFunctionality.purchaseProduct(productIdentifier,
                                              signedDiscountTimestamp: nil,
                                              completionBlock: self.responseCompletion(forCommand: command))
    }

    @objc(purchasePackage:)
    func purchasePackage(command: CDVInvokedUrlCommand) {
        guard let packageIdentifier = command.arguments[0] as? String,
        let offeringIdentifier = command.arguments[1] as? String else {
            self.sendBadParametersFor(command: command,
                                      parametersNamed: ["packageIdentifier", "offeringIdentifier"],
                                      expectedTypes: [String.self, String.self])
            return
        }

        RCCommonFunctionality.purchasePackage(packageIdentifier,
                                              offering: offeringIdentifier,
                                              signedDiscountTimestamp: nil,
                                              completionBlock: self.responseCompletion(forCommand: command))
    }

    @objc(restoreTransactions:)
    func restoreTransactions(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.restoreTransactions(completionBlock: self.responseCompletion(forCommand: command))
    }

    @objc(getAppUserID:)
    func getAppUserID(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: RCCommonFunctionality.appUserID())
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(logIn:)
    func logIn(command: CDVInvokedUrlCommand) {
        guard let appUserID = command.arguments[0] as? String else {
            self.sendBadParameterFor(command: command, parameterNamed: "appUserID", expectedType: String.self)
            return
        }

        RCCommonFunctionality.logIn(withAppUserID: appUserID,
                                    completionBlock: self.responseCompletion(forCommand: command))
    }

    @objc(logOut:)
    func logOut(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.logOut(completionBlock: self.responseCompletion(forCommand: command))
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

        RCCommonFunctionality.setDebugLogsEnabled(debugLogsEnabled)
        self.sendOKFor(command: command)
    }

    @objc(getPurchaserInfo:)
    func getPurchaserInfo(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.getPurchaserInfo(completionBlock: self.responseCompletion(forCommand: command))
    }

    @objc(syncPurchases:)
    func syncPurchases(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.syncPurchases(completionBlock: self.responseCompletion(forCommand: command))
    }

    @objc(setAutomaticAppleSearchAdsAttributionCollection:)
    func setAutomaticAppleSearchAdsAttributionCollection(command: CDVInvokedUrlCommand) {
        guard let automaticCollection = command.arguments[0] as? Bool else {
            self.sendBadParameterFor(command: command,
                                     parameterNamed: "AutomaticAppleSearchAdsAttributionCollection",
                                     expectedType: Bool.self)
            return
        }

        RCCommonFunctionality.setAutomaticAppleSearchAdsAttributionCollection(automaticCollection)
        self.sendOKFor(command: command)
    }

    @objc(setSimulatesAskToBuyInSandbox:)
    func setSimulatesAskToBuyInSandbox(command: CDVInvokedUrlCommand) {
        guard let askToBuyInSandbox = command.arguments[0] as? Bool else {
            self.sendBadParameterFor(command: command,
                                     parameterNamed: "setSimulatesAskToBuyInSandbox",
                                     expectedType: Bool.self)
            return
        }

        RCCommonFunctionality.simulatesAskToBuyInSandbox = askToBuyInSandbox
        self.sendOKFor(command: command)
    }

    @objc(isAnonymous:)
    func isAnonymous(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: RCCommonFunctionality.isAnonymous())
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    // NOTE: This method crashes now that it's in Swift. The underlying method call relies on an implicit cast
    // of a NSDictionary to an RCIntroEligibility object which works in ObjC becasue ObjC doesn't actually care
    // about types while Swift is type-safe and knows an NSDictionary<String, Any> is not an RCIntroEligibility.
    // Example crash:
    // Could not cast value of type '__NSDictionaryI' (0xabacabb) to 'RCIntroEligibility'
    // This will be fixed once we adopt the newer PurchasesHybridCommon framework (written in Swift, too)
    // TODO: Remove this warning message once this plugin adopts the newest PurchasesHybridCommon.
    @objc(checkTrialOrIntroductoryPriceEligibility:)
    func checkTrialOrIntroductoryPriceEligibility(command: CDVInvokedUrlCommand) {
        guard let products = command.arguments[0] as? [String] else {
            self.sendBadParameterFor(command: command, parameterNamed: "productIdentifiers", expectedType: NSArray.self)
            return
        }

        RCCommonFunctionality.checkTrialOrIntroductoryPriceEligibility(products) {
            let result = CDVPluginResult(status: .ok, messageAs: $0)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        }
    }

    @objc(invalidatePurchaserInfoCache:)
    func invalidatePurchaserInfoCache(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.invalidatePurchaserInfoCache()
        self.sendOKFor(command: command)
    }

    @objc(presentCodeRedemptionSheet:)
    func presentCodeRedemptionSheet(command: CDVInvokedUrlCommand) {
        if #available(iOS 14.0, *) {
            RCCommonFunctionality.presentCodeRedemptionSheet()
        } else {
            Logger.warn("[Purchases] Warning: tried to present codeRedemptionSheet, but it's only available on iOS 14.0 or greater.")
        }
        self.sendOKFor(command: command)
    }

    @objc(setAttributes:)
    func setAttributes(command: CDVInvokedUrlCommand) {
        guard let attributes = command.arguments[0] as? [String: String] else {
            self.sendBadParameterFor(command: command, parameterNamed: "attributes", expectedType: NSDictionary.self)
            return
        }

        RCCommonFunctionality.setAttributes(attributes)
        self.sendOKFor(command: command)
    }

    @objc(setEmail:)
    func setEmail(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "email", setFunction: RCCommonFunctionality.setEmail)
    }

    @objc(setPhoneNumber:)
    func setPhoneNumber(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "phoneNumber",
                                    setFunction: RCCommonFunctionality.setPhoneNumber)
    }

    @objc(setDisplayName:)
    func setDisplayName(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "displayName",
                                    setFunction: RCCommonFunctionality.setDisplayName)
    }

    @objc(setPushToken:)
    func setPushToken(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "pushToken",
                                    setFunction: RCCommonFunctionality.setPushToken)
    }

    @objc(setAdjustID:)
    func setAdjustID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "adjustID", setFunction: RCCommonFunctionality.setAdjustID)
    }

    @objc(setAppsflyerID:)
    func setAppsflyerID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "appsFlyerID",
                                    setFunction: RCCommonFunctionality.setAppsflyerID)
    }

    @objc(setFBAnonymousID:)
    func setFBAnonymousID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "fbAnonymousID",
                                    setFunction: RCCommonFunctionality.setFBAnonymousID)
    }

    @objc(setMparticleID:)
    func setMparticleID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "mparticleID",
                                    setFunction: RCCommonFunctionality.setMparticleID)
    }

    @objc(setOnesignalID:)
    func setOnesignalID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "onesignalID",
                                    setFunction: RCCommonFunctionality.setOnesignalID)
    }

    @objc(setAirshipChannelID:)
    func setAirshipChannelID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "airshipChannelID",
                                    setFunction: RCCommonFunctionality.setAirshipChannelID)
    }

    @objc(setMediaSource:)
    func setMediaSource(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "mediaSource",
                                    setFunction: RCCommonFunctionality.setMediaSource)
    }

    @objc(setCampaign:)
    func setCampaign(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "campaign", setFunction: RCCommonFunctionality.setCampaign)
    }

    @objc(setAdGroup:)
    func setAdGroup(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "adGroup", setFunction: RCCommonFunctionality.setAdGroup)
    }

    @objc(setAd:)
    func setAd(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "ad", setFunction: RCCommonFunctionality.setAd)
    }

    @objc(setKeyword:)
    func setKeyword(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "keyword", setFunction: RCCommonFunctionality.setKeyword)
    }

    @objc(setCreative:)
    func setCreative(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "creative", setFunction: RCCommonFunctionality.setCreative)
    }

    @objc(setProxyURLString:)
    func setProxyURLString(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.proxyURLString = command.arguments[0] as? String
        self.sendOKFor(command: command)
    }

    @objc(collectDeviceIdentifiers:)
    func collectDeviceIdentifiers(command: CDVInvokedUrlCommand) {
        RCCommonFunctionality.collectDeviceIdentifiers()
        self.sendOKFor(command: command)
    }

    @objc(canMakePayments:)
    func canMakePayments(command: CDVInvokedUrlCommand) {
        // The implementation of this method does nothing with `features`.
        let canMakePayments = RCCommonFunctionality.canMakePayments(withFeatures: [])
        let result = CDVPluginResult(status: .ok, messageAs: canMakePayments)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(makeDeferredPurchase:)
    func makeDeferredPurchase(command: CDVInvokedUrlCommand) {
        let callbackID = command.arguments[0] as! Int
        assert(callbackID >= 0)
        let defermentBlock = self.defermentBlocks[callbackID]
        RCCommonFunctionality.makeDeferredPurchase(defermentBlock,
                                                   completionBlock: self.responseCompletion(forCommand: command))
    }

}

extension CDVPurchasesPlugin: PurchasesDelegate {

    private func purchases(_ purchases: Purchases, didReceiveUpdated purchaserInfo: Purchases.PurchaserInfo) {
        let result = CDVPluginResult(status: .ok, messageAs: purchaserInfo.dictionary())
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: self.updatedPurchaserInfoCallbackID)
    }

    private func purchases(_ purchases: Purchases,
                           shouldPurchasePromoProduct product: SKProduct,
                           defermentBlock makeDeferredPurchase: @escaping RCDeferredPromotionalPurchaseBlock) {
        // TODO: This is not threadsafe.
        self.defermentBlocks.append(makeDeferredPurchase)
        let position = self.defermentBlocks.count - 1
        let result = CDVPluginResult(status: .ok, messageAs: ["callbackID": NSNumber(value: position)])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: self.shouldPurchasePromoProductCallbackID)
    }

}

private extension CDVPurchasesPlugin {

    var platformFlavor: String {
        return "cordova"
    }

    var platformFlavorVersion: String {
        return "3.0.0-beta"
    }

    func sendOKFor(command: CDVInvokedUrlCommand, messageAsArray: [Any]? = nil) {
        let pluginResult = CDVPluginResult(status: .ok, messageAs: messageAsArray)
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    func sendBadParameterFor(command: CDVInvokedUrlCommand, parameterNamed: String, expectedType: Any.Type) {
        self.sendBadParametersFor(command: command, parametersNamed: [parameterNamed], expectedTypes: [expectedType])
    }

    func sendBadParametersFor(command: CDVInvokedUrlCommand,
                              parametersNamed: [String],
                              expectedTypes: [Any.Type]) {

        let args = zip(parametersNamed, expectedTypes)
            .map { name, type in "parameter: \(name), type: \(type)" }
            .joined(separator: ", ")

        let pluginResult = CDVPluginResult(status: .error, messageAs: "Invalid or missing parameter(s): \(args)")
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    func responseCompletion(forCommand command: CDVInvokedUrlCommand) -> RCHybridResponseBlock {
        let callback: RCHybridResponseBlock = { response, error in
            let result: CDVPluginResult
            if let error = error {
                result = CDVPluginResult(status: .error, messageAs: error.info)
            } else {
                result = CDVPluginResult(status: .ok, messageAs: response)
            }
            self.commandDelegate.send(result, callbackId: command.callbackId)
        }
        return callback
    }

    func setSubscriberAttribute(command: CDVInvokedUrlCommand, name: String, setFunction: (String) -> Void) {
        guard let setValue = command.arguments[0] as? NSString else {
            self.sendBadParameterFor(command: command, parameterNamed: name, expectedType: NSString.self)
            return
        }

        setFunction(setValue as String)
        self.sendOKFor(command: command)
    }

}
