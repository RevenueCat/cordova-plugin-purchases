import Foundation

@objc(CDVLaunchArgs)
class CDVLaunchArgs: CDVPlugin {
    @objc(getArgument:)
    func getArgument(command: CDVInvokedUrlCommand) {
        let name = command.argument(at: 0) as? String ?? ""
        let arguments = ProcessInfo.processInfo.arguments
        var value = ""
        if let index = arguments.firstIndex(of: "-\(name)"), index + 1 < arguments.count {
            value = arguments[index + 1]
        }
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: value)
        commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(getTestFlow:)
    func getTestFlow(command: CDVInvokedUrlCommand) {
        let testFlow = UserDefaults.standard.string(forKey: "e2e_test_flow") ?? ""
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: testFlow)
        commandDelegate.send(result, callbackId: command.callbackId)
    }
}
