package com.appfeel.cordova.annotated.android.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


public class CordovaPluginAction {
    private static String TAG = "CordovaPluginAction";
    private Method method;
    private ExecutionThread executionThread;
    private boolean isAutofinish = false;

    CordovaPluginAction(Method method, ExecutionThread executionThread, boolean isAutofinish) {
        this.method = method;
        this.executionThread = executionThread;
        this.isAutofinish = isAutofinish;
    }

    private static Object[] getMethodArgs(JSONArray args, CallbackContext callbackContext) throws JSONException {
        int len = args.length();
        Object[] mArgs = new Object[len + 1];
        for (int i = 0; i < len; i += 1) {
            Object value = args.opt(i);
            if (JSONObject.NULL.equals(value)) {
                value = null;
            }
            mArgs[i] = value;
        }
        // CallbackContext is always the last one
        mArgs[len] = callbackContext;

        return mArgs;
    }

    private Runnable createRunnable(final Object[] mArgs, final AnnotatedCordovaPlugin caller, final CallbackContext callbackContext) {
        return new Runnable() {
            @Override
            public void run() {
                try {
                    method.invoke(caller, mArgs);
                    if (!callbackContext.isFinished() && isAutofinish) {
                        callbackContext.success();
                    }
                } catch (Throwable e) {
                    if (e instanceof InvocationTargetException) {
                        e = ((InvocationTargetException)e).getTargetException();
                    }
                    LOG.e(TAG, "Uncaught exception at " + getClass().getSimpleName() + "@" + method.getName(), e);
                    callbackContext.error(e.getMessage());
                }
            }
        };
    }

    public boolean execute(CordovaInterface cordova, AnnotatedCordovaPlugin caller, JSONArray args, CallbackContext callbackContext) throws JSONException {
        // Create new runnable to avoid concurrency conflicts
        Object[] mArgs = getMethodArgs(args, callbackContext);
        Runnable runnable = this.createRunnable(mArgs, caller, callbackContext);
        if (executionThread == ExecutionThread.WORKER) {
            cordova.getThreadPool().execute(runnable);
        } else if (executionThread == ExecutionThread.UI) {
            cordova.getActivity().runOnUiThread(runnable);
        } else {
            runnable.run();
        }

        return true;
    }
}