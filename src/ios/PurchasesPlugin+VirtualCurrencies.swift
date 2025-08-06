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

}
