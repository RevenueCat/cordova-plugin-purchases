//
//  PurchasesPlugin+PurchasesDelegate.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 7/5/22.
//

import Foundation
import PurchasesHybridCommon
import RevenueCat

extension CDVPurchasesPlugin: PurchasesDelegate {

    public func purchases(_ purchases: Purchases, receivedUpdated customerInfo: CustomerInfo) {
        guard let callbackId = self.updatedCustomerInfoCallbackID else { return }
        let result = CDVPluginResult(status: .ok, messageAs: CommonFunctionality.encode(customerInfo: customerInfo))
        result.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: callbackId)
    }

    public func purchases(_ purchases: Purchases,
                          readyForPromotedProduct product: StoreProduct,
                          purchase makeDeferredPurchase: @escaping DeferredPromotionalPurchaseBlock) {
        // TODO: This is not threadsafe.
        self.defermentBlocks.append(makeDeferredPurchase)
        let position = self.defermentBlocks.count - 1
        let result = CDVPluginResult(status: .ok, messageAs: ["callbackID": NSNumber(value: position)])
        result.setKeepCallbackAs(true)
        guard let callbackId = self.shouldPurchasePromoProductCallbackID else { return }
        self.commandDelegate.send(result, callbackId: callbackId)
    }

}
