Adds initial Amazon store support. This won't work right away as it requires special RevenueCat setup that's not available for all customers.

In order to use please point to this tag in your `package.json` like this:

```
    "cordova-plugin-purchases": "RevenueCat/cordova-plugin-purchases#amazon"
```

Then configure the package using your **RevenueCat API key specific for Amazon** and passing `useAmazon: true`:

```
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    Purchases.setup({apiKey: "api_key", useAmazon: true});
}
```

Please note that the setup call has changed and now accepts an object. This is to be able to use named arguments.

The next step would be to add the Amazon `jar` to your project by downloading the .zip from [Amazon](https://amzndevresources.com/iap/sdk/AmazonInAppPurchasing_Android.zip) and then unzipping and moving the `in-app-purchasing-2.0.76.jar` into your project root. Then add the jar to the Cordova's `config.xml` in the android platform section:

```
    <platform name="android">
        <allow-intent href="market:*" />
        <resource-file src="in-app-purchasing-2.0.76.jar" target="app/libs/in-app-purchasing-2.0.76.jar" />
    </platform>
```

This will copy the `.jar` in the `app/libs` folder of the project when calling `cordova prepare android`:

<img width="502" alt="Screen Shot 2021-10-27 at 11 22 18 AM" src="https://user-images.githubusercontent.com/664544/139124255-1e19a7a0-934e-42dc-8e86-35c364c6714d.png">

If using Capacitor, you would have to copy this file manually into the `apps/libs` folder of the android project. Capacitor doesn't currently provide a way of automatically adding the .jar when adding the android platform the same Cordova does.

Due to some limitations, RevenueCat will only validate purchases made in production or in Live App Testing and won't validate purchases made with the Amazon App Tester. You can use Amazon App Tester to fetch offerings by configuring it with products that match the ones set in RevenueCat.
