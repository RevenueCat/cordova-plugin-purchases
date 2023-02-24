//
//  PurchasesPlugin+Purchasing.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 7/5/22.
//

import Foundation
import PurchasesHybridCommon

@objc public extension CDVPurchasesPlugin {

    @objc(getOfferings:)
    func getOfferings(command: CDVInvokedUrlCommand) {

        CommonFunctionality.getOfferings(completion: self.responseCompletion(forCommand: command))
    }

    @objc(getProducts:)
    func getProducts(command: CDVInvokedUrlCommand) {
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

    @objc(syncPurchases:)
    func syncPurchases(command: CDVInvokedUrlCommand) {
        CommonFunctionality.syncPurchases(completion: self.responseCompletion(forCommand: command))
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

    @objc(presentCodeRedemptionSheet:)
    func presentCodeRedemptionSheet(command: CDVInvokedUrlCommand) {
        if #available(iOS 14.0, *) {
            CommonFunctionality.presentCodeRedemptionSheet()
        } else {
            NSLog("%@", "[Purchases] Warning: tried to present codeRedemptionSheet, but it's only available on iOS 14.0 or greater.")
        }
        self.sendOKFor(command: command)
    }

    @objc(canMakePayments:)
    func canMakePayments(command: CDVInvokedUrlCommand) {
        let canMakePayments = CommonFunctionality.canMakePaymentsWithFeatures([])
        let result = CDVPluginResult(status: .ok, messageAs: canMakePayments)
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

    @objc(makeDeferredPurchase:)
    func makeDeferredPurchase(command: CDVInvokedUrlCommand) {
        let callbackID = command.arguments[0] as! Int
        assert(callbackID >= 0)
        let defermentBlock = self.defermentBlocks[callbackID]
        CommonFunctionality.makeDeferredPurchase(defermentBlock,
                                                 completion: self.responseCompletion(forCommand: command))
    }

    @objc(beginRefundRequestForActiveEntitlement:)
    func beginRefundRequestForActiveEntitlement(command: CDVInvokedUrlCommand) {
#if os(iOS)
        if #available(iOS 15.0, *) {
            let completion = beginRefundRequestCompletionFor(command: command)
            CommonFunctionality.beginRefundRequestForActiveEntitlement(completion: completion)
        } else {
            sendUnsupportedErrorFor(command: command)
        }
#else
        sendUnsupportedErrorFor(command: command)
#endif
    }

    private func beginRefundRequestCompletionFor(command: CDVInvokedUrlCommand) -> (ErrorContainer?) -> Void {
        return { error in
            let result: CDVPluginResult
            guard let error = error else {
                result = CDVPluginResult(status: .ok, messageAs: 0)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
            }
            if ((error.info["userCancelled"]) != nil) {
                result = CDVPluginResult(status: .ok, messageAs: 1)
            } else {
                result = CDVPluginResult(status: .error, messageAs: error.info)
            }
            self.commandDelegate.send(result, callbackId: command.callbackId)
        }
    }
    
//    @objc(beginRefundRequestForEntitlementId:)
//    func beginRefundRequestForEntitlementId(command: CDVInvokedUrlCommand) {
//        guard let entitlementIdentifier = command.arguments[0] as? String else {
//            self.sendBadParameterFor(command: command, parameterNamed: "entitlementIdentifier", expectedType: String.self)
//            return
//        }
//
//        #if TARGET_OS_IPHONE
//        if (@available(iOS 15.0, *)) {
//            [RCCommonFunctionality beginRefundRequestEntitlementId:entitlementIdentifier
//                                                   completionBlock:[self getBeginRefundResponseCompletionBlockWithResolve:resolve
//                                                                                                                   reject:reject]];
//        } else {
//            resolve(nil);
//        }
//        #else
//        resolve(nil);
//        #endif
//    }
//
//    RCT_EXPORT_METHOD(beginRefundRequestForProductId:(NSString *)productIdentifier
//                      resolve:(RCTPromiseResolveBlock)resolve
//                      reject:(RCTPromiseRejectBlock)reject) {
//        #if TARGET_OS_IPHONE
//        if (@available(iOS 15.0, *)) {
//            [RCCommonFunctionality beginRefundRequestProductId:productIdentifier
//                                               completionBlock:[self getBeginRefundResponseCompletionBlockWithResolve:resolve
//                                                                                                               reject:reject]];
//        } else {
//            resolve(nil);
//        }
//        #else
//        resolve(nil);
//        #endif
//    }
//
//    func getBeginRefundResponseCompletionBlock() {
//
//    }
//
//    - (void (^)(RCErrorContainer *))getBeginRefundResponseCompletionBlockWithResolve:(RCTPromiseResolveBlock)resolve
//                                                                              reject:(RCTPromiseRejectBlock)reject {
//        return ^(RCErrorContainer * _Nullable error) {
//            if (error == nil) {
//                resolve(0);
//            } else if ([error.info[@"userCancelled"] isEqual:@YES]) {
//                resolve(1);
//            } else {
//                [self rejectPromiseWithBlock:reject error:error];
//            }
//        };
//    }


}
