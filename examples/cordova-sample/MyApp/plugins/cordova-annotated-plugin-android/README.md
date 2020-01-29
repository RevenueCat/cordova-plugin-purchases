# cordova-annotated-plugin-android<br>[![NPM version][npm-version]][npm-url] [![NPM downloads][npm-downloads]][npm-url]

[npm-url]: https://www.npmjs.com/package/cordova-annotated-plugin-android
[npm-version]: https://img.shields.io/npm/v/cordova-annotated-plugin-android.svg
[npm-downloads]: https://img.shields.io/npm/dm/cordova-annotated-plugin-android.svg

With this plugin, a cordova plugin can be implemented in this way:

```java
public class MyPlugin extends AnnotatedCordovaPlugin {
    @PluginAction
    private void pluginAction1(int firstOption, String secondOption, CallbackContext callbackContext) {
        ...
    }
}
```

`AnnotatedCordovaPlugin` extends original `CordovaPlugin`, so all methods are still accessible.

This plugin helps developers of cordova plugins to forget of the embarrassing and complicated way to develop a cordova plugin.
Usually the developer had to implement a plugin like this (see [Android Plugin Development Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html)):

```java
public class MyPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("pluginAction1".equals(action)) {
            JSONObject options = args.optJSONObject(0);
            pluginAction1(options, callbackContext);

        } else if ("pluginAction1".equals(action)) {
            JSONObject options = args.optJSONObject(0);
            pluginAction2(options, callbackContext);

        } else if ("moreActions".equals(action)) {
            ...
        } else {
            LOG.d("PLUGIN_TAG", String.format("Unknown action: %s", action));
            return false;
        }

        return true;
    }

    private void pluginAction1(JSONObject options, CallbackContext callbackContext) {
        if (options == null) {
            return new callbackContext.error("options is null, please specify options");
        }
        callbackContext.success();
    }
}
```

## PluginAction annotation
It has 3 parameters, all of them optional:

- **thread** (*ExecutionThread*): enum, can be MAIN, UI, WORKER (defaults to MAIN)
- **actionName** (*String*): the name of the method as it will be called from Javascript (defaults to java annotated method name)
- **isAutofinish** (*boolean*): if `callbackContext.success()` has not been called and `isAutofinish` is set to `true`, when method finishes, `callbackContext.success()` will be called (defaults to `true`)

```java
public class MyPlugin extends AnnotatedCordovaPlugin {
    @PluginAction(thread=ExecutionThread.UI, actionName="anotherName", isAutofinish=false)
    private void pluginAction1(int firstOption, String secondOption, CallbackContext callbackContext) {
        ...
        if (iWantSuccess) {
            callbackContext.success();
        } else {
            callbackContext.error();
        }
    }
}
```

Then from javascript:
```js
myPlugin.anotherName = function (options, successCallback, failureCallback) {
    cordova.exec(successCallback, failureCallback, 'MyPlugin', 'anotherName', options);
};

myPlugin.anotherName([1, 'second']);
```

## Agreements
- Inspired on https://github.com/chemerisuk/cordova-annotated-plugin-android

Why this rewritting of chemerisuk plugin?
- Implements proguard defaults
- Implements auto finish (automatically calls `callbackContext.success()` if it has not been called yet)
- Documentation has been rewritten
- Methods have been heavily refactored and simplified to improve maintenance


