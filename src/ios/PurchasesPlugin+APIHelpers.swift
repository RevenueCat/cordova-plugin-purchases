//
//  PurchasesPlugin+APIHelpers.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 7/5/22.
//

import Foundation
import PurchasesHybridCommon
import RevenueCat

extension CDVPurchasesPlugin {

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

    func sendUnsupportedErrorFor(command: CDVInvokedUrlCommand) {
        let error = ErrorContainer(error: ErrorCode.unsupportedError, extraPayload: [:])
        let result = CDVPluginResult(status: .error, messageAs: error.info)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

}
