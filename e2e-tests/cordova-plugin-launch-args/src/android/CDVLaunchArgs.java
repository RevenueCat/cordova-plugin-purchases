package com.revenuecat.automatedsdktests;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;

public class CDVLaunchArgs extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        if ("getTestFlow".equals(action)) {
            String testFlow = cordova.getActivity().getIntent().getStringExtra("e2e_test_flow");
            callbackContext.success(testFlow != null ? testFlow : "");
            return true;
        }
        return false;
    }
}
