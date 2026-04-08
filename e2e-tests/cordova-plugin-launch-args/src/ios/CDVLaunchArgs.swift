import Foundation

@objc(CDVLaunchArgs)
class CDVLaunchArgs: CDVPlugin {
    @objc(getTestFlow:)
    func getTestFlow(command: CDVInvokedUrlCommand) {
        let testFlow = UserDefaults.standard.string(forKey: "e2e_test_flow") ?? ""
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: testFlow)
        commandDelegate.send(result, callbackId: command.callbackId)
    }
}
