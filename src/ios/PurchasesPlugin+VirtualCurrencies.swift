//
//  PurchasesPlugin+Users.swift
//  PurchasesPlugin
//
//  Created by Will Taylor on 8/6/2025.
//

import Foundation
import PurchasesHybridCommon

@objc public extension CDVPurchasesPlugin {

    @objc(getVirtualCurrencies:)
    func getVirtualCurrencies(command: CDVInvokedUrlCommand) {
        CommonFunctionality.getVirtualCurrencies(completion: self.responseCompletion(forCommand: command))
    }

    @objc(invalidateVirtualCurrenciesCache:)
    func invalidateVirtualCurrenciesCache(command: CDVInvokedUrlCommand) {
        CommonFunctionality.invalidateVirtualCurrenciesCache()
        self.sendOKFor(command: command)
    }

    @objc(getCachedVirtualCurrencies:)
    func getCachedVirtualCurrencies(command: CDVInvokedUrlCommand) {
        let cachedVirtualCurrencies = CommonFunctionality.getCachedVirtualCurrencies()
        let result = CDVPluginResult(status: .ok, messageAs: cachedVirtualCurrencies)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }
}
