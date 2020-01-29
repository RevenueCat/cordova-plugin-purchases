package com.appfeel.cordova.annotated.android.plugin;


import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class AnnotatedCordovaPlugin extends CordovaPlugin {
    private static String TAG = "AnnotatedCordovaPlugin";
    private Map<String, CordovaPluginAction> pluginActions;

    private Map<String, CordovaPluginAction> getPluginActions() {
        Map<String, CordovaPluginAction> pActions = new HashMap<>();
        for (Method method : getClass().getDeclaredMethods()) {
            PluginAction pluginAction = method.getAnnotation(PluginAction.class);
            if (pluginAction != null) {
                String actionName = pluginAction.actionName();
                if (actionName.isEmpty()) {
                    actionName = method.getName();
                }
                pActions.put(actionName, new CordovaPluginAction(method, pluginAction.thread(), pluginAction.isAutofinish()));
                // suppress Java language access checks
                // to improve performance of future calls
                method.setAccessible(true);
            }
        }

        return pActions;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (pluginActions == null) {
            pluginActions = getPluginActions();
        }

        CordovaPluginAction pluginAction = pluginActions.get(action);
        if (pluginAction != null) {
            return pluginAction.execute(cordova, AnnotatedCordovaPlugin.this, args, callbackContext);
        }

        LOG.d(TAG, String.format("Unknown plugin action: %s", action));
        return false;
    }
}