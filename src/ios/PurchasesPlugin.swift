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

    private var purchases: Purchases!
    private var updatedCustomerInfoCallbackID: String!
    private var shouldPurchasePromoProductCallbackID: String?
    private var defermentBlocks: [DeferredPromotionalPurchaseBlock] = []

    @objc(setupPurchases:)
    func setupPurchases(command: CDVInvokedUrlCommand) {
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
        self.purchases.delegate = self
        self.updatedCustomerInfoCallbackID = command.callbackId
        let pluginResult = CDVPluginResult(status: .noResult)
        pluginResult?.setKeepCallbackAs(true)
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    @objc(setAllowSharingStoreAccount:)
    func setAllowSharingStoreAccount(command: CDVInvokedUrlCommand) {
        let allowSharingStoreAccount = command.arguments[0] as? Bool ?? false

        CommonFunctionality.setAllowSharingStoreAccount(allowSharingStoreAccount)
        self.sendOKFor(command: command)
    }

    @objc(addAttributionData:)
    func addAttributionData(command: CDVInvokedUrlCommand) {
        let network = command.arguments[1] as? Int
        let networkUserId = command.arguments[2] as? String

        guard let data = command.arguments[0] as? [String: Any],
              let network = network,
              let networkUserId = networkUserId else {
            self.sendBadParametersFor(command: command,
                                      parametersNamed: ["data", "network", "networkUserId"],
                                      expectedTypes: [NSDictionary.self, Int.self, String.self])
            return
        }

        CommonFunctionality.addAttributionData(data, network: network, networkUserId: networkUserId)
        self.sendOKFor(command: command)
    }

    @objc(getOfferings:)
    func getOfferings(command: CDVInvokedUrlCommand) {

        CommonFunctionality.getOfferings(completion: self.responseCompletion(forCommand: command))
    }

    @objc(getProductInfo:)
    func getProductInfo(command: CDVInvokedUrlCommand) {
        guard let products = command.arguments[0] as? [String] else {
            self.sendBadParameterFor(command: command, parameterNamed: "products", expectedType: NSArray.self)
            return
        }

        CommonFunctionality.getProductInfo(products) {
            self.sendOKFor(command: command, messageAsArray: $0)
        }
    }

    @objc(purchaseProduct:)
    func purchaseProduct(command: CDVInvokedUrlCommand) {
        guard let productIdentifier = command.arguments[0] as? String else {
            self.sendBadParameterFor(command: command, parameterNamed: "productIdentifier", expectedType: String.self)
            return
        }

        CommonFunctionality.purchase(product: productIdentifier,
                                     signedDiscountTimestamp: nil,
                                     completion: self.responseCompletion(forCommand: command))
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

        CommonFunctionality.purchase(package: packageIdentifier,
                                     offeringIdentifier: offeringIdentifier,
                                     signedDiscountTimestamp: nil,
                                     completion: self.responseCompletion(forCommand: command))
    }

    @objc(restorePurchases:)
    func restorePurchases(command: CDVInvokedUrlCommand) {
        CommonFunctionality.restorePurchases(completion: self.responseCompletion(forCommand: command))
    }

    @objc(getAppUserID:)
    func getAppUserID(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: CommonFunctionality.appUserID)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(logIn:)
    func logIn(command: CDVInvokedUrlCommand) {
        guard let appUserID = command.arguments[0] as? String else {
            self.sendBadParameterFor(command: command, parameterNamed: "appUserID", expectedType: String.self)
            return
        }

        CommonFunctionality.logIn(appUserID: appUserID, completion: self.responseCompletion(forCommand: command))
    }

    @objc(logOut:)
    func logOut(command: CDVInvokedUrlCommand) {
        CommonFunctionality.logOut(completion: self.responseCompletion(forCommand: command))
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

    @objc(getCustomerInfo:)
    func getCustomerInfo(command: CDVInvokedUrlCommand) {
        CommonFunctionality.customerInfo(completion: self.responseCompletion(forCommand: command))
    }

    @objc(syncPurchases:)
    func syncPurchases(command: CDVInvokedUrlCommand) {
        CommonFunctionality.syncPurchases(completion: self.responseCompletion(forCommand: command))
    }

    @objc(setAutomaticAppleSearchAdsAttributionCollection:)
    func setAutomaticAppleSearchAdsAttributionCollection(command: CDVInvokedUrlCommand) {
        guard let automaticCollection = command.arguments[0] as? Bool else {
            self.sendBadParameterFor(command: command,
                                     parameterNamed: "AutomaticAppleSearchAdsAttributionCollection",
                                     expectedType: Bool.self)
            return
        }

        CommonFunctionality.setAutomaticAppleSearchAdsAttributionCollection(automaticCollection)
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

        CommonFunctionality.simulatesAskToBuyInSandbox = askToBuyInSandbox
        self.sendOKFor(command: command)
    }

    @objc(isAnonymous:)
    func isAnonymous(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: CommonFunctionality.isAnonymous)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(checkTrialOrIntroductoryPriceEligibility:)
    func checkTrialOrIntroductoryPriceEligibility(command: CDVInvokedUrlCommand) {
        guard let products = command.arguments[0] as? [String] else {
            self.sendBadParameterFor(command: command, parameterNamed: "productIdentifiers", expectedType: NSArray.self)
            return
        }

        CommonFunctionality.checkTrialOrIntroductoryPriceEligibility(for: products) {
            let result = CDVPluginResult(status: .ok, messageAs: $0)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        }
    }

    // Update name
    @objc(invalidateCustomerInfoCache:)
    func invalidateCustomerInfoCache(command: CDVInvokedUrlCommand) {
        CommonFunctionality.invalidateCustomerInfoCache()
        self.sendOKFor(command: command)
    }

    @objc(presentCodeRedemptionSheet:)
    func presentCodeRedemptionSheet(command: CDVInvokedUrlCommand) {
        if #available(iOS 14.0, *) {
            CommonFunctionality.presentCodeRedemptionSheet()
        } else {
            NSLog("%@", "[Purchases] Warning: tried to present codeRedemptionSheet, but it's only available on iOS 14.0 or greater.")
        }
        self.sendOKFor(command: command)
    }

    @objc(setAttributes:)
    func setAttributes(command: CDVInvokedUrlCommand) {
        guard let attributes = command.arguments[0] as? [String: String] else {
            self.sendBadParameterFor(command: command, parameterNamed: "attributes", expectedType: NSDictionary.self)
            return
        }

        CommonFunctionality.setAttributes(attributes)
        self.sendOKFor(command: command)
    }

    @objc(setEmail:)
    func setEmail(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "email", setFunction: CommonFunctionality.setEmail)
    }

    @objc(setPhoneNumber:)
    func setPhoneNumber(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "phoneNumber",
                                    setFunction: CommonFunctionality.setPhoneNumber)
    }

    @objc(setDisplayName:)
    func setDisplayName(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "displayName",
                                    setFunction: CommonFunctionality.setDisplayName)
    }

    @objc(setPushToken:)
    func setPushToken(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "pushToken",
                                    setFunction: CommonFunctionality.setPushToken)
    }

    @objc(setAdjustID:)
    func setAdjustID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "adjustID", setFunction: CommonFunctionality.setAdjustID)
    }

    @objc(setAppsflyerID:)
    func setAppsflyerID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "appsFlyerID",
                                    setFunction: CommonFunctionality.setAppsflyerID)
    }

    @objc(setFBAnonymousID:)
    func setFBAnonymousID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "fbAnonymousID",
                                    setFunction: CommonFunctionality.setFBAnonymousID)
    }

    @objc(setMparticleID:)
    func setMparticleID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "mparticleID",
                                    setFunction: CommonFunctionality.setMparticleID)
    }

    @objc(setOnesignalID:)
    func setOnesignalID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "onesignalID",
                                    setFunction: CommonFunctionality.setOnesignalID)
    }

    @objc(setAirshipChannelID:)
    func setAirshipChannelID(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "airshipChannelID",
                                    setFunction: CommonFunctionality.setAirshipChannelID)
    }

    @objc(setMediaSource:)
    func setMediaSource(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command,
                                    name: "mediaSource",
                                    setFunction: CommonFunctionality.setMediaSource)
    }

    @objc(setCampaign:)
    func setCampaign(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "campaign", setFunction: CommonFunctionality.setCampaign)
    }

    @objc(setAdGroup:)
    func setAdGroup(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "adGroup", setFunction: CommonFunctionality.setAdGroup)
    }

    @objc(setAd:)
    func setAd(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "ad", setFunction: CommonFunctionality.setAd)
    }

    @objc(setKeyword:)
    func setKeyword(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "keyword", setFunction: CommonFunctionality.setKeyword)
    }

    @objc(setCreative:)
    func setCreative(command: CDVInvokedUrlCommand) {
        self.setSubscriberAttribute(command: command, name: "creative", setFunction: CommonFunctionality.setCreative)
    }

    @objc(setProxyURLString:)
    func setProxyURLString(command: CDVInvokedUrlCommand) {
        CommonFunctionality.proxyURLString = command.arguments[0] as? String
        self.sendOKFor(command: command)
    }

    @objc(collectDeviceIdentifiers:)
    func collectDeviceIdentifiers(command: CDVInvokedUrlCommand) {
        CommonFunctionality.collectDeviceIdentifiers()
        self.sendOKFor(command: command)
    }

    @objc(canMakePayments:)
    func canMakePayments(command: CDVInvokedUrlCommand) {
        let canMakePayments = CommonFunctionality.canMakePaymentsWithFeatures([])
        let result = CDVPluginResult(status: .ok, messageAs: canMakePayments)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(makeDeferredPurchase:)
    func makeDeferredPurchase(command: CDVInvokedUrlCommand) {
        let callbackID = command.arguments[0] as! Int
        assert(callbackID >= 0)
        let defermentBlock = self.defermentBlocks[callbackID]
        CommonFunctionality.makeDeferredPurchase(defermentBlock,
                                                 completion: self.responseCompletion(forCommand: command))
    }

}

extension CDVPurchasesPlugin: PurchasesDelegate {

    public func purchases(_ purchases: Purchases, receivedUpdated customerInfo: CustomerInfo) {
        let result = CDVPluginResult(status: .ok, messageAs: customerInfo.dictionary)
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: self.updatedCustomerInfoCallbackID)
    }

    public func purchases(_ purchases: Purchases,
                          readyForPromotedProduct product: StoreProduct,
                          purchase makeDeferredPurchase: @escaping DeferredPromotionalPurchaseBlock) {
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

    func responseCompletion(forCommand command: CDVInvokedUrlCommand) -> HybridResponseBlock {
        let callback: HybridResponseBlock = { response, error in
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
