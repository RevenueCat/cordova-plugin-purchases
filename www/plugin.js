"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTRO_ELIGIBILITY_STATUS = exports.PACKAGE_TYPE = exports.PRORATION_MODE = exports.BILLING_FEATURE = exports.PURCHASE_TYPE = exports.ATTRIBUTION_NETWORK = void 0;
var PLUGIN_NAME = "PurchasesPlugin";
var ATTRIBUTION_NETWORK;
(function (ATTRIBUTION_NETWORK) {
    ATTRIBUTION_NETWORK[ATTRIBUTION_NETWORK["APPLE_SEARCH_ADS"] = 0] = "APPLE_SEARCH_ADS";
    ATTRIBUTION_NETWORK[ATTRIBUTION_NETWORK["ADJUST"] = 1] = "ADJUST";
    ATTRIBUTION_NETWORK[ATTRIBUTION_NETWORK["APPSFLYER"] = 2] = "APPSFLYER";
    ATTRIBUTION_NETWORK[ATTRIBUTION_NETWORK["BRANCH"] = 3] = "BRANCH";
    ATTRIBUTION_NETWORK[ATTRIBUTION_NETWORK["TENJIN"] = 4] = "TENJIN";
    ATTRIBUTION_NETWORK[ATTRIBUTION_NETWORK["FACEBOOK"] = 5] = "FACEBOOK";
})(ATTRIBUTION_NETWORK = exports.ATTRIBUTION_NETWORK || (exports.ATTRIBUTION_NETWORK = {}));
var PURCHASE_TYPE;
(function (PURCHASE_TYPE) {
    /**
     * A type of SKU for in-app products.
     */
    PURCHASE_TYPE["INAPP"] = "inapp";
    /**
     * A type of SKU for subscriptions.
     */
    PURCHASE_TYPE["SUBS"] = "subs";
})(PURCHASE_TYPE = exports.PURCHASE_TYPE || (exports.PURCHASE_TYPE = {}));
/**
 * Enum for billing features.
 * Currently, these are only relevant for Google Play Android users:
 * https://developer.android.com/reference/com/android/billingclient/api/BillingClient.FeatureType
 */
var BILLING_FEATURE;
(function (BILLING_FEATURE) {
    /**
     * Purchase/query for subscriptions.
     */
    BILLING_FEATURE[BILLING_FEATURE["SUBSCRIPTIONS"] = 0] = "SUBSCRIPTIONS";
    /**
     * Subscriptions update/replace.
     */
    BILLING_FEATURE[BILLING_FEATURE["SUBSCRIPTIONS_UPDATE"] = 1] = "SUBSCRIPTIONS_UPDATE";
    /**
     * Purchase/query for in-app items on VR.
     */
    BILLING_FEATURE[BILLING_FEATURE["IN_APP_ITEMS_ON_VR"] = 2] = "IN_APP_ITEMS_ON_VR";
    /**
     * Purchase/query for subscriptions on VR.
     */
    BILLING_FEATURE[BILLING_FEATURE["SUBSCRIPTIONS_ON_VR"] = 3] = "SUBSCRIPTIONS_ON_VR";
    /**
     * Launch a price change confirmation flow.
     */
    BILLING_FEATURE[BILLING_FEATURE["PRICE_CHANGE_CONFIRMATION"] = 4] = "PRICE_CHANGE_CONFIRMATION";
})(BILLING_FEATURE = exports.BILLING_FEATURE || (exports.BILLING_FEATURE = {}));
var PRORATION_MODE;
(function (PRORATION_MODE) {
    PRORATION_MODE[PRORATION_MODE["UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY"] = 0] = "UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY";
    /**
     * Replacement takes effect immediately, and the remaining time will be
     * prorated and credited to the user. This is the current default behavior.
     */
    PRORATION_MODE[PRORATION_MODE["IMMEDIATE_WITH_TIME_PRORATION"] = 1] = "IMMEDIATE_WITH_TIME_PRORATION";
    /**
     * Replacement takes effect immediately, and the billing cycle remains the
     * same. The price for the remaining period will be charged. This option is
     * only available for subscription upgrade.
     */
    PRORATION_MODE[PRORATION_MODE["IMMEDIATE_AND_CHARGE_PRORATED_PRICE"] = 2] = "IMMEDIATE_AND_CHARGE_PRORATED_PRICE";
    /**
     * Replacement takes effect immediately, and the new price will be charged on
     * next recurrence time. The billing cycle stays the same.
     */
    PRORATION_MODE[PRORATION_MODE["IMMEDIATE_WITHOUT_PRORATION"] = 3] = "IMMEDIATE_WITHOUT_PRORATION";
    /**
     * Replacement takes effect when the old plan expires, and the new price will
     * be charged at the same time.
     */
    PRORATION_MODE[PRORATION_MODE["DEFERRED"] = 4] = "DEFERRED";
})(PRORATION_MODE = exports.PRORATION_MODE || (exports.PRORATION_MODE = {}));
var PACKAGE_TYPE;
(function (PACKAGE_TYPE) {
    /**
     * A package that was defined with a custom identifier.
     */
    PACKAGE_TYPE["UNKNOWN"] = "UNKNOWN";
    /**
     * A package that was defined with a custom identifier.
     */
    PACKAGE_TYPE["CUSTOM"] = "CUSTOM";
    /**
     * A package configured with the predefined lifetime identifier.
     */
    PACKAGE_TYPE["LIFETIME"] = "LIFETIME";
    /**
     * A package configured with the predefined annual identifier.
     */
    PACKAGE_TYPE["ANNUAL"] = "ANNUAL";
    /**
     * A package configured with the predefined six month identifier.
     */
    PACKAGE_TYPE["SIX_MONTH"] = "SIX_MONTH";
    /**
     * A package configured with the predefined three month identifier.
     */
    PACKAGE_TYPE["THREE_MONTH"] = "THREE_MONTH";
    /**
     * A package configured with the predefined two month identifier.
     */
    PACKAGE_TYPE["TWO_MONTH"] = "TWO_MONTH";
    /**
     * A package configured with the predefined monthly identifier.
     */
    PACKAGE_TYPE["MONTHLY"] = "MONTHLY";
    /**
     * A package configured with the predefined weekly identifier.
     */
    PACKAGE_TYPE["WEEKLY"] = "WEEKLY";
})(PACKAGE_TYPE = exports.PACKAGE_TYPE || (exports.PACKAGE_TYPE = {}));
var INTRO_ELIGIBILITY_STATUS;
(function (INTRO_ELIGIBILITY_STATUS) {
    /**
     * RevenueCat doesn't have enough information to determine eligibility.
     */
    INTRO_ELIGIBILITY_STATUS[INTRO_ELIGIBILITY_STATUS["INTRO_ELIGIBILITY_STATUS_UNKNOWN"] = 0] = "INTRO_ELIGIBILITY_STATUS_UNKNOWN";
    /**
     * The user is not eligible for a free trial or intro pricing for this product.
     */
    INTRO_ELIGIBILITY_STATUS[INTRO_ELIGIBILITY_STATUS["INTRO_ELIGIBILITY_STATUS_INELIGIBLE"] = 1] = "INTRO_ELIGIBILITY_STATUS_INELIGIBLE";
    /**
     * The user is eligible for a free trial or intro pricing for this product.
     */
    INTRO_ELIGIBILITY_STATUS[INTRO_ELIGIBILITY_STATUS["INTRO_ELIGIBILITY_STATUS_ELIGIBLE"] = 2] = "INTRO_ELIGIBILITY_STATUS_ELIGIBLE";
    /**
     * There is no free trial or intro pricing for this product.
     */
    INTRO_ELIGIBILITY_STATUS[INTRO_ELIGIBILITY_STATUS["INTRO_ELIGIBILITY_STATUS_NO_INTRO_OFFER_EXISTS"] = 3] = "INTRO_ELIGIBILITY_STATUS_NO_INTRO_OFFER_EXISTS";
})(INTRO_ELIGIBILITY_STATUS = exports.INTRO_ELIGIBILITY_STATUS || (exports.INTRO_ELIGIBILITY_STATUS = {}));
var shouldPurchasePromoProductListeners = [];
var Purchases = /** @class */ (function () {
    function Purchases() {
    }
    /**
     * @deprecated Use {@link configureWith} instead. It accepts a {@link PurchasesConfiguration} object which offers more flexibility.
     *
     * Sets up Purchases with your API key and an app user id.
     * @param {string} apiKey RevenueCat API Key. Needs to be a string
     * @param {string?} appUserID A unique id for identifying the user
     * @param {boolean} observerMode An optional boolean. Set this to TRUE if you have your own IAP implementation and
     * want to use only RevenueCat's backend. Default is FALSE. If you are on Android and setting this to ON, you will have
     * to acknowledge the purchases yourself.
     * @param {string?} userDefaultsSuiteName An optional string. iOS-only, will be ignored for Android.
     * Set this if you would like the RevenueCat SDK to store its preferences in a different NSUserDefaults
     * suite, otherwise it will use standardUserDefaults. Default is null, which will make the SDK use standardUserDefaults.
     */
    Purchases.configure = function (apiKey, appUserID, observerMode, userDefaultsSuiteName) {
        if (observerMode === void 0) { observerMode = false; }
        this.configureWith({
            apiKey: apiKey,
            appUserID: appUserID,
            observerMode: observerMode,
            userDefaultsSuiteName: userDefaultsSuiteName,
            useAmazon: false
        });
    };
    /**
     * Sets up Purchases with your API key and an app user id.
     * @param {PurchasesConfiguration} Object containing configuration parameters
     */
    Purchases.configureWith = function (_a) {
        var apiKey = _a.apiKey, _b = _a.appUserID, appUserID = _b === void 0 ? null : _b, _c = _a.observerMode, observerMode = _c === void 0 ? false : _c, userDefaultsSuiteName = _a.userDefaultsSuiteName, _d = _a.useAmazon, useAmazon = _d === void 0 ? false : _d;
        window.cordova.exec(function (customerInfo) {
            window.cordova.fireWindowEvent("onCustomerInfoUpdated", customerInfo);
        }, null, PLUGIN_NAME, "configure", [apiKey, appUserID, observerMode, userDefaultsSuiteName, useAmazon]);
        this.setupShouldPurchasePromoProductCallback();
    };
    /**
     * Gets the Offerings configured in the RevenueCat dashboard
     * @param {function(PurchasesOfferings):void} callback Callback triggered after a successful getOfferings call.
     * @param {function(PurchasesError):void} errorCallback Callback triggered after an error or when retrieving offerings.
     */
    Purchases.getOfferings = function (callback, errorCallback) {
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "getOfferings", []);
    };
    /**
     * Fetch the product info
     * @param {[string]} productIdentifiers Array of product identifiers
     * @param {function(PurchasesStoreProduct[]):void} callback Callback triggered after a successful getProducts call. It will receive an array of product objects.
     * @param {function(PurchasesError):void} errorCallback Callback triggered after an error or when retrieving products
     * @param {PURCHASE_TYPE} type Optional type of products to fetch, can be inapp or subs. Subs by default
     */
    Purchases.getProducts = function (productIdentifiers, callback, errorCallback, type) {
        if (type === void 0) { type = PURCHASE_TYPE.SUBS; }
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "getProducts", [productIdentifiers, type]);
    };
    /**
     * Make a purchase
     *
     * @param {string} productIdentifier The product identifier of the product you want to purchase.
     * @param {function(string, CustomerInfo):void} callback Callback triggered after a successful purchase.
     * @param {function(PurchasesError, boolean):void} errorCallback Callback triggered after an error or when the user cancels the purchase.
     * If user cancelled, userCancelled will be true
     * @param {UpgradeInfo} upgradeInfo Android only. Optional UpgradeInfo you wish to upgrade from containing the oldSKU
     * and the optional prorationMode.
     * @param {PURCHASE_TYPE} type Optional type of product, can be inapp or subs. Subs by default
     */
    Purchases.purchaseProduct = function (productIdentifier, callback, errorCallback, upgradeInfo, type) {
        if (type === void 0) { type = PURCHASE_TYPE.SUBS; }
        window.cordova.exec(callback, function (response) {
            var userCancelled = response.userCancelled, error = __rest(response, ["userCancelled"]);
            errorCallback({
                error: error,
                userCancelled: userCancelled,
            });
        }, PLUGIN_NAME, "purchaseProduct", [
            productIdentifier,
            upgradeInfo !== undefined && upgradeInfo !== null ? upgradeInfo.oldSKU : null,
            upgradeInfo !== undefined && upgradeInfo !== null
                ? upgradeInfo.prorationMode
                : null,
            type,
        ]);
    };
    /**
     * Make a purchase
     *
     * @param {PurchasesPackage} aPackage The Package you wish to purchase. You can get the Packages by calling getOfferings
     * @param {function(string, CustomerInfo):void} callback Callback triggered after a successful purchase.
     * @param {function(PurchasesError, boolean):void} errorCallback Callback triggered after an error or when the user cancels the purchase.
     * If user cancelled, userCancelled will be true
     * @param {UpgradeInfo} upgradeInfo Android only. Optional UpgradeInfo you wish to upgrade from containing the oldSKU
     * and the optional prorationMode.
     */
    Purchases.purchasePackage = function (aPackage, callback, errorCallback, upgradeInfo) {
        window.cordova.exec(callback, function (response) {
            var userCancelled = response.userCancelled, error = __rest(response, ["userCancelled"]);
            errorCallback({
                error: error,
                userCancelled: userCancelled,
            });
        }, PLUGIN_NAME, "purchasePackage", [
            aPackage.identifier,
            aPackage.offeringIdentifier,
            upgradeInfo !== undefined && upgradeInfo !== null
                ? upgradeInfo.oldSKU
                : null,
            upgradeInfo !== undefined && upgradeInfo !== null
                ? upgradeInfo.prorationMode
                : null,
        ]);
    };
    /**
     * Restores a user's previous purchases and links their appUserIDs to any user's also using those purchases.
     * @param {function(CustomerInfo):void} callback Callback that will receive the new customer info after restoring transactions.
     * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is any problem restoring the user transactions. This gets normally triggered if there
     * is an error retrieving the new customer info for the new user or the user cancelled the restore
     */
    Purchases.restorePurchases = function (callback, errorCallback) {
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "restorePurchases", []);
    };
    /**
     * Get the appUserID that is currently in placed in the SDK
     * @param {function(string):void} callback Callback that will receive the current appUserID
     */
    Purchases.getAppUserID = function (callback) {
        window.cordova.exec(callback, null, PLUGIN_NAME, "getAppUserID", []);
    };
    /**
     * This function will logIn the current user with an appUserID. Typically this would be used after a log in
     * to identify a user without calling configure.
     * @param {String} appUserID The appUserID that should be linked to the currently user
     * @param {function(LogInResult):void} callback Callback that will receive an object that contains the customerInfo after logging in, as well as a boolean indicating
     * whether the user has just been created for the first time in the RevenueCat backend.
     * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is any problem logging in.
     */
    Purchases.logIn = function (appUserID, callback, errorCallback) {
        // noinspection SuspiciousTypeOfGuard
        if (typeof appUserID !== "string") {
            throw new Error("appUserID needs to be a string");
        }
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "logIn", [
            appUserID,
        ]);
    };
    /**
     * Logs out the Purchases client clearing the saved appUserID. This will generate a random user id and save it in the cache.
     * If the current user is already anonymous, this will produce a PurchasesError.
     * @param {function(CustomerInfo):void} callback Callback that will receive the new customer info after resetting
     * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is an error when logging out.
     * This could happen for example if logOut is called but the current user is anonymous.
     */
    Purchases.logOut = function (callback, errorCallback) {
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "logOut", []);
    };
    /**
     * Gets the current customer info. This call will return the cached customer info unless the cache is stale, in which case,
     * it will make a network call to retrieve it from the servers.
     * @param {function(CustomerInfo):void} callback Callback that will receive the customer info
     * @param {function(PurchasesError, boolean):void} errorCallback Callback that will be triggered whenever there is any problem retrieving the customer info
     */
    Purchases.getCustomerInfo = function (callback, errorCallback) {
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "getCustomerInfo", []);
    };
    /**
     * Enables/Disables debugs logs
     * @param {boolean} enabled Enable or not debug logs
     */
    Purchases.setDebugLogsEnabled = function (enabled) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setDebugLogsEnabled", [
            enabled,
        ]);
    };
    /**
     * iOS only.
     * @param {boolean} simulatesAskToBuyInSandbox Set this property to true *only* when testing the ask-to-buy / SCA purchases flow.
     * More information: http://errors.rev.cat/ask-to-buy
     */
    Purchases.setSimulatesAskToBuyInSandbox = function (enabled) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setSimulatesAskToBuyInSandbox", [
            enabled,
        ]);
    };
    /**
     * This method will send all the purchases to the RevenueCat backend. Call this when using your own implementation
     * for subscriptions anytime a sync is needed, like after a successful purchase.
     *
     * @warning This function should only be called if you're not calling makePurchase.
     */
    Purchases.syncPurchases = function () {
        window.cordova.exec(null, null, PLUGIN_NAME, "syncPurchases", []);
    };
    /**
     * Enable automatic collection of Apple Search Ads attribution. Disabled by default.
     *
     * @param {boolean} enabled Enable or not automatic collection
     */
    Purchases.setAutomaticAppleSearchAdsAttributionCollection = function (enabled) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAutomaticAppleSearchAdsAttributionCollection", [enabled]);
    };
    /**
     * Enable automatic collection of Apple Search Ads attribution using AdServices. Disabled by default.
     */
    Purchases.enableAdServicesAttributionTokenCollection = function () {
        window.cordova.exec(null, null, PLUGIN_NAME, "enableAdServicesAttributionTokenCollection", []);
    };
    /**
     * @param {function(boolean):void} callback Will be sent a boolean indicating if the `appUserID` has been generated
     * by RevenueCat or not.
     */
    Purchases.isAnonymous = function (callback) {
        window.cordova.exec(callback, null, PLUGIN_NAME, "isAnonymous", []);
    };
    /**
     *  iOS only. Computes whether or not a user is eligible for the introductory pricing period of a given product.
     *  You should use this method to determine whether or not you show the user the normal product price or the
     *  introductory price. This also applies to trials (trials are considered a type of introductory pricing).
     *
     *  @note Subscription groups are automatically collected for determining eligibility. If RevenueCat can't
     *  definitively compute the eligibility, most likely because of missing group information, it will return
     *  `INTRO_ELIGIBILITY_STATUS_UNKNOWN`. The best course of action on unknown status is to display the non-intro
     *  pricing, to not create a misleading situation. To avoid this, make sure you are testing with the latest version of
     *  iOS so that the subscription group can be collected by the SDK. Android always returns INTRO_ELIGIBILITY_STATUS_UNKNOWN.
     *
     *  @param productIdentifiers Array of product identifiers for which you want to compute eligibility
     *  @param callback Will be sent a map of IntroEligibility per productId
     */
    Purchases.checkTrialOrIntroductoryPriceEligibility = function (productIdentifiers, callback) {
        window.cordova.exec(callback, null, PLUGIN_NAME, "checkTrialOrIntroductoryPriceEligibility", [productIdentifiers]);
    };
    /**
     * Sets a function to be called on purchases initiated on the Apple App Store. This is only used in iOS.
     * @param {ShouldPurchasePromoProductListener} shouldPurchasePromoProductListener Called when a user initiates a
     * promotional in-app purchase from the App Store. If your app is able to handle a purchase at the current time, run
     * the deferredPurchase function. If the app is not in a state to make a purchase: cache the deferredPurchase, then
     * call the deferredPurchase when the app is ready to make the promotional purchase.
     * If the purchase should never be made, you don't need to ever call the deferredPurchase and the app will not
     * proceed with promotional purchases.
     */
    Purchases.addShouldPurchasePromoProductListener = function (shouldPurchasePromoProductListener) {
        if (typeof shouldPurchasePromoProductListener !== "function") {
            throw new Error("addShouldPurchasePromoProductListener needs a function");
        }
        shouldPurchasePromoProductListeners.push(shouldPurchasePromoProductListener);
    };
    /**
     * Removes a given ShouldPurchasePromoProductListener
     * @param {ShouldPurchasePromoProductListener} listenerToRemove ShouldPurchasePromoProductListener reference of the listener to remove
     * @returns {boolean} True if listener was removed, false otherwise
     */
    Purchases.removeShouldPurchasePromoProductListener = function (listenerToRemove) {
        if (shouldPurchasePromoProductListeners.indexOf(listenerToRemove) !== -1) {
            shouldPurchasePromoProductListeners = shouldPurchasePromoProductListeners.filter(function (listener) { return listenerToRemove !== listener; });
            return true;
        }
        return false;
    };
    /**
     * Invalidates the cache for customer information.
     *
     * Most apps will not need to use this method; invalidating the cache can leave your app in an invalid state.
     * Refer to https://docs.revenuecat.com/docs/customer-info#section-get-user-information for more information on
     * using the cache properly.
     *
     * This is useful for cases where customer information might have been updated outside of the
     * app, like if a promotional subscription is granted through the RevenueCat dashboard.
     */
    Purchases.invalidateCustomerInfoCache = function () {
        window.cordova.exec(null, null, PLUGIN_NAME, "invalidateCustomerInfoCache", []);
    };
    /**
     * iOS only. Presents a code redemption sheet, useful for redeeming offer codes
     * Refer to https://docs.revenuecat.com/docs/ios-subscription-offers#offer-codes for more information on how
     * to configure and use offer codes.
     */
    Purchases.presentCodeRedemptionSheet = function () {
        window.cordova.exec(null, null, PLUGIN_NAME, "presentCodeRedemptionSheet", []);
    };
    /**
     * Subscriber attributes are useful for storing additional, structured information on a user.
     * Since attributes are writable using a public key they should not be used for
     * managing secure or sensitive information such as subscription status, coins, etc.
     *
     * Key names starting with "$" are reserved names used by RevenueCat. For a full list of key
     * restrictions refer to our guide: https://docs.revenuecat.com/docs/subscriber-attributes
     *
     * @param attributes Map of attributes by key. Set the value as an empty string to delete an attribute.
     */
    Purchases.setAttributes = function (attributes) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAttributes", [attributes]);
    };
    /**
     * Subscriber attribute associated with the email address for the user
     *
     * @param email Empty String or null will delete the subscriber attribute.
     */
    Purchases.setEmail = function (email) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setEmail", [email]);
    };
    /**
     * Subscriber attribute associated with the phone number for the user
     *
     * @param phoneNumber Empty String or null will delete the subscriber attribute.
     */
    Purchases.setPhoneNumber = function (phoneNumber) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setPhoneNumber", [phoneNumber]);
    };
    /**
     * Subscriber attribute associated with the display name for the user
     *
     * @param displayName Empty String or null will delete the subscriber attribute.
     */
    Purchases.setDisplayName = function (displayName) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setDisplayName", [displayName]);
    };
    /**
     * Subscriber attribute associated with the push token for the user
     *
     * @param pushToken Empty String or null will delete the subscriber attribute.
     */
    Purchases.setPushToken = function (pushToken) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setPushToken", [pushToken]);
    };
    /**
     * Subscriber attribute associated with the Adjust Id for the user
     * Required for the RevenueCat Adjust integration
     *
     * @param adjustID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setAdjustID = function (adjustID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAdjustID", [adjustID]);
    };
    /**
     * Subscriber attribute associated with the AppsFlyer Id for the user
     * Required for the RevenueCat AppsFlyer integration
     * @param appsflyerID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setAppsflyerID = function (appsflyerID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAppsflyerID", [appsflyerID]);
    };
    /**
     * Subscriber attribute associated with the Facebook SDK Anonymous Id for the user
     * Recommended for the RevenueCat Facebook integration
     *
     * @param fbAnonymousID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setFBAnonymousID = function (fbAnonymousID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setFBAnonymousID", [fbAnonymousID]);
    };
    /**
     * Subscriber attribute associated with the mParticle Id for the user
     * Recommended for the RevenueCat mParticle integration
     *
     * @param mparticleID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setMparticleID = function (mparticleID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setMparticleID", [mparticleID]);
    };
    /**
     * Subscriber attribute associated with the OneSignal Player Id for the user
     * Required for the RevenueCat OneSignal integration
     *
     * @param onesignalID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setOnesignalID = function (onesignalID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setOnesignalID", [onesignalID]);
    };
    /**
     * Subscriber attribute associated with the Airship Channel Id for the user
     * Required for the RevenueCat Airship integration
     *
     * @param airshipChannelID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setAirshipChannelID = function (airshipChannelID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAirshipChannelID", [airshipChannelID]);
    };
    /**
     * Subscriber attribute associated with the Firebase App Instance ID for the user
     * Required for the RevenueCat Firebase integration
     *
     * @param firebaseAppInstanceID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setFirebaseAppInstanceID = function (firebaseAppInstanceID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setFirebaseAppInstanceID", [firebaseAppInstanceID]);
    };
    /**
     * Subscriber attribute associated with the Mixpanel Distinct ID for the user
     * Required for the RevenueCat Mixpanel integration
     *
     * @param mixpanelDistinctID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setMixpanelDistinctID = function (mixpanelDistinctID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setMixpanelDistinctID", [mixpanelDistinctID]);
    };
    /**
     * Subscriber attribute associated with the CleverTap ID for the user
     * Required for the RevenueCat CleverTap integration
     *
     * @param cleverTapID Empty String or null will delete the subscriber attribute.
     */
    Purchases.setCleverTapID = function (cleverTapID) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setCleverTapID", [cleverTapID]);
    };
    /**
     * Subscriber attribute associated with the install media source for the user
     *
     * @param mediaSource Empty String or null will delete the subscriber attribute.
     */
    Purchases.setMediaSource = function (mediaSource) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setMediaSource", [mediaSource]);
    };
    /**
     * Subscriber attribute associated with the install campaign for the user
     *
     * @param campaign Empty String or null will delete the subscriber attribute.
     */
    Purchases.setCampaign = function (campaign) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setCampaign", [campaign]);
    };
    /**
     * Subscriber attribute associated with the install ad group for the user
     *
     * @param adGroup Empty String or null will delete the subscriber attribute.
     */
    Purchases.setAdGroup = function (adGroup) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAdGroup", [adGroup]);
    };
    /**
     * Subscriber attribute associated with the install ad for the user
     *
     * @param ad Empty String or null will delete the subscriber attribute.
     */
    Purchases.setAd = function (ad) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setAd", [ad]);
    };
    /**
     * Subscriber attribute associated with the install keyword for the user
     *
     * @param keyword Empty String or null will delete the subscriber attribute.
     */
    Purchases.setKeyword = function (keyword) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setKeyword", [keyword]);
    };
    /**
     * Subscriber attribute associated with the install ad creative for the user
     *
     * @param creative Empty String or null will delete the subscriber attribute.
     */
    Purchases.setCreative = function (creative) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setCreative", [creative]);
    };
    /**
     * Automatically collect subscriber attributes associated with the device identifiers.
     * $idfa, $idfv, $ip on iOS
     * $gpsAdId, $androidId, $ip on Android
     */
    Purchases.collectDeviceIdentifiers = function () {
        window.cordova.exec(null, null, PLUGIN_NAME, "collectDeviceIdentifiers", []);
    };
    /**
     * Set this property to your proxy URL before configuring Purchases *only* if you've received a proxy key value from your RevenueCat contact.
     * @param url Proxy URL as a string.
     */
    Purchases.setProxyURL = function (url) {
        window.cordova.exec(null, null, PLUGIN_NAME, "setProxyURLString", [url]);
    };
    /**
     * Check if billing is supported for the current user (meaning IN-APP purchases are supported)
     * and optionally, whether a list of specified feature types are supported.
     *
     * Note: Billing features are only relevant to Google Play Android users.
     * For other stores and platforms, billing features won't be checked.
     * @param feature An array of feature types to check for support. Feature types must be one of
     *       [BILLING_FEATURE]. By default, is an empty list and no specific feature support will be checked.
     */
    Purchases.canMakePayments = function (features, callback, errorCallback) {
        if (features === void 0) { features = []; }
        window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "canMakePayments", [features]);
    };
    Purchases.setupShouldPurchasePromoProductCallback = function () {
        var _this = this;
        window.cordova.exec(function (_a) {
            var callbackID = _a.callbackID;
            shouldPurchasePromoProductListeners.forEach(function (listener) {
                return listener(_this.getMakeDeferredPurchaseFunction(callbackID));
            });
        }, null, PLUGIN_NAME, "setupShouldPurchasePromoProductCallback", []);
    };
    Purchases.getMakeDeferredPurchaseFunction = function (callbackID) {
        return function () { return window.cordova.exec(null, null, PLUGIN_NAME, "makeDeferredPurchase", [callbackID]); };
    };
    /**
     * Enum for attribution networks
     * @readonly
     * @enum {Number}
     */
    Purchases.ATTRIBUTION_NETWORK = ATTRIBUTION_NETWORK;
    /**
     * Supported SKU types.
     * @readonly
     * @enum {string}
     */
    Purchases.PURCHASE_TYPE = PURCHASE_TYPE;
    /**
     * Enum for billing features.
     * Currently, these are only relevant for Google Play Android users:
     * https://developer.android.com/reference/com/android/billingclient/api/BillingClient.FeatureType
     */
    Purchases.BILLING_FEATURE = BILLING_FEATURE;
    /**
     * Replace SKU's ProrationMode.
     * @readonly
     * @enum {number}
     */
    Purchases.PRORATION_MODE = PRORATION_MODE;
    /**
     * Enumeration of all possible Package types.
     * @readonly
     * @enum {string}
     */
    Purchases.PACKAGE_TYPE = PACKAGE_TYPE;
    /**
     * Enum of different possible states for intro price eligibility status.
     * @readonly
     * @enum {number}
     */
    Purchases.INTRO_ELIGIBILITY_STATUS = INTRO_ELIGIBILITY_STATUS;
    return Purchases;
}());
if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.Purchases) {
    window.plugins.Purchases = new Purchases();
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = Purchases;
}
exports.default = Purchases;
