//
//  PurchasesPlugin+Attribution.swift
//  PurchasesPlugin
//
//  Created by Joshua Liebowitz on 7/5/22.
//

import Foundation
import PurchasesHybridCommon

@objc public extension CDVPurchasesPlugin {

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

}

private extension CDVPurchasesPlugin {

    func setSubscriberAttribute(command: CDVInvokedUrlCommand, name: String, setFunction: (String) -> Void) {
        guard let setValue = command.arguments[0] as? NSString else {
            self.sendBadParameterFor(command: command, parameterNamed: name, expectedType: NSString.self)
            return
        }

        setFunction(setValue as String)
        self.sendOKFor(command: command)
    }

}
