//
//  PurchasesPlugin+Users.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 7/5/22.
//

import Foundation
import PurchasesHybridCommon

@objc public extension CDVPurchasesPlugin {

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

    @objc(getCustomerInfo:)
    func getCustomerInfo(command: CDVInvokedUrlCommand) {
        CommonFunctionality.customerInfo(completion: self.responseCompletion(forCommand: command))
    }

    @objc(isAnonymous:)
    func isAnonymous(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: CommonFunctionality.isAnonymous)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(invalidateCustomerInfoCache:)
    func invalidateCustomerInfoCache(command: CDVInvokedUrlCommand) {
        CommonFunctionality.invalidateCustomerInfoCache()
        self.sendOKFor(command: command)
    }

    @objc(setAllowSharingStoreAccount:)
    func setAllowSharingStoreAccount(command: CDVInvokedUrlCommand) {
        let allowSharingStoreAccount = command.arguments[0] as? Bool ?? false

        CommonFunctionality.setAllowSharingStoreAccount(allowSharingStoreAccount)
        self.sendOKFor(command: command)
    }

}
