## 3.1.0

`Purchases.configure` has been deprecated in favor of `Purchases.configureWith`, which accepts a `PurchasesConfiguration` object. 

```
Purchases.configure("api_key", "user_id", true, "user.defaults.suite.name")
```

has been replaced with:

```
Purchases.configureWith({
    apiKey: "api_key",
    appUserID: "user_id",
    observerMode: true,
    userDefaultsSuiteName: "user.defaults.suite.name",
});
```

This allows for more flexibility since some configuration parameters arguments can now be omitted so the defaults are used. For example:

```
Purchases.configureWith({
    apiKey: "api_key",
    appUserID: "user_id",
    userDefaultsSuiteName: "user.defaults.suite.name",
});
```

Or:

```
Purchases.configureWith({
    apiKey: "api_key",
    observerMode: true,
});
```

#### Amazon Appstore Support
We have introduced support for using the Amazon Appstore. We have extensively tested this, and there are some apps using our pre-release Amazon versions in production.

However, we have found some inconsistencies in the way Amazon Appstore prices are reported. We are actively working on patching these inconsistencies.

Please help us help you by reporting any issues you find. [New RevenueCat Issue](https://github.com/RevenueCat/cordova-plugin-purchases/issues/new/).

You can enable Amazon Appstore support by configuring the SDK using the new `configureWith` function:

```
Purchases.configureWith({
    apiKey: "amazon_specific_api_key",
    useAmazon: true,
});
```

For more information around configuration please take a look at the [Amazon Appstore section in our docs](https://docs.revenuecat.com/docs/amazon-platform-resources). The official [Amazon In-App Purchasing docs](https://developer.amazon.com/docs/in-app-purchasing/iap-overview.html) also contains very valuable information, especially around testing and best practices.

### Other Changes
* Update orb to fix deploys (#200) via Cesar de la Vega (@vegaro)
* Update fastlane plugin (#199) via Cesar de la Vega (@vegaro)
* `configure` has been deprecated in favor of `configureWith`, which accepts a `PurchasesConfiguration` object (#110) via Cesar de la Vega (@vegaro)
