const PLUGIN_NAME = "PurchasesPlugin";

declare global {
  interface Window {
    cordova: any;
    plugins: any;
  }
}

export enum ATTRIBUTION_NETWORK {
  APPLE_SEARCH_ADS = 0,
  ADJUST = 1,
  APPSFLYER = 2,
  BRANCH = 3,
  TENJIN = 4,
  FACEBOOK = 5,
}

export enum PURCHASE_TYPE {
  /**
   * A type of SKU for in-app products.
   */
  INAPP = "inapp",

  /**
   * A type of SKU for subscriptions.
   */
  SUBS = "subs",
}

/**
 * Enum for billing features.
 * Currently, these are only relevant for Google Play Android users:
 * https://developer.android.com/reference/com/android/billingclient/api/BillingClient.FeatureType
 */
 export enum BILLING_FEATURE {
  /**
   * Purchase/query for subscriptions.
   */
  SUBSCRIPTIONS,

  /**
   * Subscriptions update/replace.
   */
  SUBSCRIPTIONS_UPDATE,

  /**
   * Purchase/query for in-app items on VR.
   */
  IN_APP_ITEMS_ON_VR,

  /**
   * Purchase/query for subscriptions on VR.
   */
  SUBSCRIPTIONS_ON_VR,

  /**
   * Launch a price change confirmation flow.
   */
  PRICE_CHANGE_CONFIRMATION,
}

export enum PRORATION_MODE {
  UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY = 0,

  /**
   * Replacement takes effect immediately, and the remaining time will be
   * prorated and credited to the user. This is the current default behavior.
   */
  IMMEDIATE_WITH_TIME_PRORATION = 1,

  /**
   * Replacement takes effect immediately, and the billing cycle remains the
   * same. The price for the remaining period will be charged. This option is
   * only available for subscription upgrade.
   */
  IMMEDIATE_AND_CHARGE_PRORATED_PRICE = 2,

  /**
   * Replacement takes effect immediately, and the new price will be charged on
   * next recurrence time. The billing cycle stays the same.
   */
  IMMEDIATE_WITHOUT_PRORATION = 3,

  /**
   * Replacement takes effect when the old plan expires, and the new price will
   * be charged at the same time.
   */
  DEFERRED = 4,
}

export enum PACKAGE_TYPE {

  /**
   * A package that was defined with a custom identifier.
   */
  UNKNOWN = "UNKNOWN",

  /**
   * A package that was defined with a custom identifier.
   */
  CUSTOM = "CUSTOM",

  /**
   * A package configured with the predefined lifetime identifier.
   */
  LIFETIME = "LIFETIME",

  /**
   * A package configured with the predefined annual identifier.
   */
  ANNUAL = "ANNUAL",

  /**
   * A package configured with the predefined six month identifier.
   */
  SIX_MONTH = "SIX_MONTH",

  /**
   * A package configured with the predefined three month identifier.
   */
  THREE_MONTH = "THREE_MONTH",

  /**
   * A package configured with the predefined two month identifier.
   */
  TWO_MONTH = "TWO_MONTH",

  /**
   * A package configured with the predefined monthly identifier.
   */
  MONTHLY = "MONTHLY",

  /**
   * A package configured with the predefined weekly identifier.
   */
  WEEKLY = "WEEKLY",
}

export enum INTRO_ELIGIBILITY_STATUS {
  /**
   * RevenueCat doesn't have enough information to determine eligibility.
   */
  INTRO_ELIGIBILITY_STATUS_UNKNOWN = 0,
  /**
   * The user is not eligible for a free trial or intro pricing for this product.
   */
  INTRO_ELIGIBILITY_STATUS_INELIGIBLE,
  /**
   * The user is eligible for a free trial or intro pricing for this product.
   */
  INTRO_ELIGIBILITY_STATUS_ELIGIBLE,
  /**
   * There is no free trial or intro pricing for this product.
   */
  INTRO_ELIGIBILITY_STATUS_NO_INTRO_OFFER_EXISTS,
}

export enum LOG_LEVEL {
  VERBOSE = "VERBOSE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR"
}

/**
 * The EntitlementInfo object gives you access to all of the information about the status of a user entitlement.
 */
export interface PurchasesEntitlementInfo {
  /**
   * The entitlement identifier configured in the RevenueCat dashboard
   */
  readonly identifier: string;
  /**
   * True if the user has access to this entitlement
   */
  readonly isActive: boolean;
  /**
   * True if the underlying subscription is set to renew at the end of the billing period (expirationDate).
   */
  readonly willRenew: boolean;
  /**
   * The last period type this entitlement was in. Either: NORMAL, INTRO, TRIAL.
   */
  readonly periodType: string;
  /**
   * The latest purchase or renewal date for the entitlement.
   */
  readonly latestPurchaseDate: string;
  /**
   * The first date this entitlement was purchased.
   */
  readonly originalPurchaseDate: string;
  /**
   * The expiration date for the entitlement, can be `null` for lifetime access. If the `periodType` is `trial`,
   * this is the trial expiration date.
   */
  readonly expirationDate: string | null;
  /**
   * The store where this entitlement was unlocked from. Either: appStore, macAppStore, playStore, stripe,
   * promotional, unknownStore
   */
  readonly store: string;
  /**
   * The product identifier that unlocked this entitlement
   */
  readonly productIdentifier: string;
  /**
   * False if this entitlement is unlocked via a production purchase
   */
  readonly isSandbox: boolean;
  /**
   * The date an unsubscribe was detected. Can be `null`.
   *
   * @note: Entitlement may still be active even if user has unsubscribed. Check the `isActive` property.
   */
  readonly unsubscribeDetectedAt: string | null;
  /**
   * The date a billing issue was detected. Can be `null` if there is no billing issue or an issue has been resolved
   *
   * @note: Entitlement may still be active even if there is a billing issue. Check the `isActive` property.
   */
  readonly billingIssueDetectedAt: string | null;
}

/**
 * Contains all the entitlements associated to the user.
 */
export interface PurchasesEntitlementInfos {
  /**
   * Map of all EntitlementInfo (`PurchasesEntitlementInfo`) objects (active and inactive) keyed by entitlement identifier.
   */
  readonly all: { [key: string]: PurchasesEntitlementInfo };
  /**
   * Map of active EntitlementInfo (`PurchasesEntitlementInfo`) objects keyed by entitlement identifier.
   */
  readonly active: { [key: string]: PurchasesEntitlementInfo };
  /**
   * Dictionary of active ``EntitlementInfo`` objects keyed by their identifiers.
   * @ Note: When queried from the sandbox environment, it only returns entitlements active in sandbox.
   * When queried from production, this only returns entitlements active in production. 
   */
  readonly activeInCurrentEnvironment: { [key: string]: PurchasesEntitlementInfo };
  /**
   * Dictionary of active ``EntitlementInfo`` objects keyed by their identifiers.
   * @note: these can be active on any environment.
   */
  readonly activeInAnyEnvironment: { [key: string]: PurchasesEntitlementInfo };
}

export interface PurchasesStoreTransaction { 
  /**
   * RevenueCat Id associated to the transaction.
   */
  readonly transactionIdentifier: string;
  /**
   * Product Id associated with the transaction.
   */
  readonly productIdentifier: string;
  /**
   * Purchase date of the transaction in ISO 8601 format.
   */
  readonly purchaseDate: string;
}

export interface CustomerInfo {
  /**
   * Entitlements attached to this customer info
   */
  readonly entitlements: PurchasesEntitlementInfos;
  /**
   * Set of active subscription skus
   */
  readonly activeSubscriptions: [string];
  /**
   * Set of purchased skus, active and inactive
   */
  readonly allPurchasedProductIdentifiers: [string];
  /**
   * Returns all the non-subscription purchases a user has made.
   * The purchases are ordered by purchase date in ascending order.
   */
  readonly nonSubscriptionTransactions: PurchasesStoreTransaction[];
  /**
   * The latest expiration date of all purchased skus
   */
  readonly latestExpirationDate: string | null;
  /**
   * The date this user was first seen in RevenueCat.
   */
  readonly firstSeen: string;
  /**
   * The original App User Id recorded for this user.
   */
  readonly originalAppUserId: string;
  /**
   * Date when this info was requested
   */
  readonly requestDate: string;
  /**
   * Map of skus to expiration dates
   */
  readonly allExpirationDates: { [key: string]: string | null };
  /**
   * Map of skus to purchase dates
   */
  readonly allPurchaseDates: { [key: string]: string | null };
  /**
   * Returns the version number for the version of the application when the
   * user bought the app. Use this for grandfathering users when migrating
   * to subscriptions.
   *
   * This corresponds to the value of CFBundleVersion (in iOS) in the
   * Info.plist file when the purchase was originally made. This is always null
   * in Android
   */
  readonly originalApplicationVersion: string | null;
  /**
   * Returns the purchase date for the version of the application when the user bought the app.
   * Use this for grandfathering users when migrating to subscriptions.
   */
  readonly originalPurchaseDate: string | null;
  /**
   * URL to manage the active subscription of the user. If this user has an active iOS
   * subscription, this will point to the App Store, if the user has an active Play Store subscription
   * it will point there. If there are no active subscriptions it will be null.
   * If there are multiple for different platforms, it will point to the device store.
   */
  readonly managementURL: string | null;
}

export interface PurchasesIntroPrice {
  /**
   * Price in the local currency.
   */
  readonly price: number;
  /**
   * Formatted price, including its currency sign, such as €3.99.
   */
  readonly priceString: string;
  /**
   * Number of subscription billing periods for which the user will be given the discount, such as 3.
   */
  readonly cycles: number;
  /**
   * Billing period of the discount, specified in ISO 8601 format.
   */
  readonly period: string;
  /**
   * Unit for the billing period of the discount, can be DAY, WEEK, MONTH or YEAR.
   */
  readonly periodUnit: string;
  /**
   * Number of units for the billing period of the discount.
   */
  readonly periodNumberOfUnits: number;
}

export interface PurchasesStoreProductDiscount {
  /**
   * Identifier of the discount.
   */
  readonly identifier: string;
  /**
   * Price in the local currency.
   */
  readonly price: number;
  /**
   * Formatted price, including its currency sign, such as €3.99.
   */
  readonly priceString: string;
  /**
   * Number of subscription billing periods for which the user will be given the discount, such as 3.
   */
  readonly cycles: number;
  /**
   * Billing period of the discount, specified in ISO 8601 format.
   */
  readonly period: string;
  /**
   * Unit for the billing period of the discount, can be DAY, WEEK, MONTH or YEAR.
   */
  readonly periodUnit: string;
  /**
   * Number of units for the billing period of the discount.
   */
  readonly periodNumberOfUnits: number;
}

export interface PurchasesStoreProduct {
  /**
   * Product Id.
   */
  readonly identifier: string;
  /**
   * Description of the product.
   */
  readonly description: string;
  /**
   * Title of the product.
   */
  readonly title: string;
  /**
   * Price of the product in the local currency.
   */
  readonly price: number;
  /**
   * Formatted price of the item, including its currency sign, such as €3.99.
   */
  readonly priceString: string;
  /**
   * Currency code for price and original price.
   */
  readonly currencyCode: string;
  /**
   * Introductory price.
   */
  readonly introPrice: PurchasesIntroPrice | null;
  /**
   * Collection of discount offers for a product. Null for Android.
   */
  readonly discounts: PurchasesStoreProductDiscount[] | null;
  
  /**
   * Subscription period, specified in ISO 8601 format. For example,
   * P1W equates to one week, P1M equates to one month,
   * P3M equates to three months, P6M equates to six months,
   * and P1Y equates to one year.
   * Note: Not available for Amazon.
   */
  readonly subscriptionPeriod: string | null;
}

/**
 * Contains information about the product available for the user to purchase.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesPackage {
  /**
   * Unique identifier for this package. Can be one a predefined package type or a custom one.
   */
  readonly identifier: string;
  /**
   * Package type for the product. Will be one of [PACKAGE_TYPE].
   */
  readonly packageType: PACKAGE_TYPE;
  /**
   * Product assigned to this package.
   */
  readonly product: PurchasesStoreProduct;
  /**
   * Offering this package belongs to.
   */
  readonly offeringIdentifier: string;
}

/**
 * An offering is a collection of Packages (`PurchasesPackage`) available for the user to purchase.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesOffering {
  /**
   * Unique identifier defined in RevenueCat dashboard.
   */
  readonly identifier: string;
  /**
   * Offering description defined in RevenueCat dashboard.
   */
  readonly serverDescription: string;
  /**
   * Array of `Package` objects available for purchase.
   */
  readonly availablePackages: PurchasesPackage[];
  /**
   * Lifetime package type configured in the RevenueCat dashboard, if available.
   */
  readonly lifetime: PurchasesPackage | null;
  /**
   * Annual package type configured in the RevenueCat dashboard, if available.
   */
  readonly annual: PurchasesPackage | null;
  /**
   * Six month package type configured in the RevenueCat dashboard, if available.
   */
  readonly sixMonth: PurchasesPackage | null;
  /**
   * Three month package type configured in the RevenueCat dashboard, if available.
   */
  readonly threeMonth: PurchasesPackage | null;
  /**
   * Two month package type configured in the RevenueCat dashboard, if available.
   */
  readonly twoMonth: PurchasesPackage | null;
  /**
   * Monthly package type configured in the RevenueCat dashboard, if available.
   */
  readonly monthly: PurchasesPackage | null;
  /**
   * Weekly package type configured in the RevenueCat dashboard, if available.
   */
  readonly weekly: PurchasesPackage | null;
}

/**
 * Contains all the offerings configured in RevenueCat dashboard.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesOfferings {
  /**
   * Map of all Offerings [PurchasesOffering] objects keyed by their identifier.
   */
  readonly all: { [key: string]: PurchasesOffering };
  /**
   * Current offering configured in the RevenueCat dashboard.
   */
  readonly current: PurchasesOffering | null;
}

export interface PurchasesError {
  code: number;
  message: string;
  readableErrorCode: string;
  underlyingErrorMessage?: string;
}

/**
 * Holds the information used when upgrading from another sku. For Android use only.
 */
export interface UpgradeInfo {
  /**
   * The oldSKU to upgrade from.
   */
  readonly oldSKU: string;
  /**
   * The [PRORATION_MODE] to use when upgrading the given oldSKU.
   */
  readonly prorationMode?: PRORATION_MODE;
}

/**
 * Holds the introductory price status
 */
export interface IntroEligibility {
  /**
   * The introductory price eligibility status
   */
  readonly status: INTRO_ELIGIBILITY_STATUS;
  /**
   * Description of the status
   */
  readonly description: string;
}

/**
 * Holds the logIn result
 */
export interface LogInResult {
  /**
   * The Customer Info for the user.
   */
  readonly customerInfo: CustomerInfo;
  /**
   * True if the call resulted in a new user getting created in the RevenueCat backend.
   */
  readonly created: boolean;
}

/**
 * Holds parameters to initialize the SDK.
 */
export interface PurchasesConfiguration {
  /**
   * RevenueCat API Key. Needs to be a string
   */
  apiKey: string;
  /**
   * A unique id for identifying the user
   */
  appUserID?: string | null;
  /**
   * An optional boolean. Set this to TRUE if you have your own IAP implementation and
   * want to use only RevenueCat's backend. Default is FALSE. If you are on Android and setting this to ON, you will have
   * to acknowledge the purchases yourself.
   */
  observerMode?: boolean;
  /**
   * An optional string. iOS-only, will be ignored for Android.
   * Set this if you would like the RevenueCat SDK to store its preferences in a different NSUserDefaults
   * suite, otherwise it will use standardUserDefaults. Default is null, which will make the SDK use standardUserDefaults.
   */
  userDefaultsSuiteName?: string;
  /**
   * iOS-only, will be ignored for Android.
   * Set this to FALSE to disable StoreKit2.
   * Default is FALSE.
   */
  usesStoreKit2IfAvailable?: boolean;
  /**
   * An optional boolean. Android only. Required to configure the plugin to be used in the Amazon Appstore.
   */
  useAmazon?: boolean;
}

export type ShouldPurchasePromoProductListener = (deferredPurchase: () => void) => void;
let shouldPurchasePromoProductListeners: ShouldPurchasePromoProductListener[] = [];

class Purchases {

  /**
   * Enum for attribution networks
   * @readonly
   * @enum {Number}
   */
  public static ATTRIBUTION_NETWORK = ATTRIBUTION_NETWORK;

  /**
   * Supported SKU types.
   * @readonly
   * @enum {string}
   */
  public static PURCHASE_TYPE = PURCHASE_TYPE;

  /**
   * Enum for billing features.
   * Currently, these are only relevant for Google Play Android users:
   * https://developer.android.com/reference/com/android/billingclient/api/BillingClient.FeatureType
   */
    public static BILLING_FEATURE = BILLING_FEATURE;

  /**
   * Replace SKU's ProrationMode.
   * @readonly
   * @enum {number}
   */
  public static PRORATION_MODE = PRORATION_MODE;

  /**
   * Enumeration of all possible Package types.
   * @readonly
   * @enum {string}
   */
  public static PACKAGE_TYPE = PACKAGE_TYPE;

  /**
   * Enum of different possible states for intro price eligibility status.
   * @readonly
   * @enum {number}
   */
  public static INTRO_ELIGIBILITY_STATUS = INTRO_ELIGIBILITY_STATUS;

  /**
   * Enum of different possible log levels.
   * @readonly
   * @enum {string}
   */
  public static LOG_LEVEL = LOG_LEVEL;

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
  public static configure(
    apiKey: string,
    appUserID?: string | null,
    observerMode: boolean = false,
    userDefaultsSuiteName?: string
  ): void {
    this.configureWith({
      apiKey,
      appUserID,
      observerMode,
      userDefaultsSuiteName,
      useAmazon: false
    })
  }

  /**
   * Sets up Purchases with your API key and an app user id.
   * @param {PurchasesConfiguration} Object containing configuration parameters
   */
  public static configureWith({
    apiKey,
    appUserID = null,
    observerMode = false,
    userDefaultsSuiteName,
    usesStoreKit2IfAvailable = false,
    useAmazon = false
  }: PurchasesConfiguration): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "configure",
      [apiKey, appUserID, observerMode, userDefaultsSuiteName, usesStoreKit2IfAvailable, useAmazon]
    );

    window.cordova.exec(
      (customerInfo: any) => {
        window.cordova.fireWindowEvent("onCustomerInfoUpdated", customerInfo);
      },
      null,
      PLUGIN_NAME,
      "setupDelegateCallback",
      []
    );
    this.setupShouldPurchasePromoProductCallback();
  }

  /**
   * Gets the Offerings configured in the RevenueCat dashboard
   * @param {function(PurchasesOfferings):void} callback Callback triggered after a successful getOfferings call.
   * @param {function(PurchasesError):void} errorCallback Callback triggered after an error or when retrieving offerings.
   */
  public static getOfferings(
    callback: (offerings: PurchasesOfferings) => void,
    errorCallback: (error: PurchasesError) => void
  ) {
    window.cordova.exec(
      callback,
      errorCallback,
      PLUGIN_NAME,
      "getOfferings",
      []
    );
  }

  /**
   * Fetch the product info
   * @param {[string]} productIdentifiers Array of product identifiers
   * @param {function(PurchasesStoreProduct[]):void} callback Callback triggered after a successful getProducts call. It will receive an array of product objects.
   * @param {function(PurchasesError):void} errorCallback Callback triggered after an error or when retrieving products
   * @param {PURCHASE_TYPE} type Optional type of products to fetch, can be inapp or subs. Subs by default
   */
  public static getProducts(
    productIdentifiers: string[],
    callback: (products: PurchasesStoreProduct[]) => void,
    errorCallback: (error: PurchasesError) => void,
    type: PURCHASE_TYPE = PURCHASE_TYPE.SUBS
  ) {
    window.cordova.exec(
      callback,
      errorCallback,
      PLUGIN_NAME,
      "getProducts",
      [productIdentifiers, type]
    );
  }

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
  public static purchaseProduct(
    productIdentifier: string,
    callback: ({productIdentifier, customerInfo,}: { productIdentifier: string; customerInfo: CustomerInfo; }) => void,
    errorCallback: ({error, userCancelled,}: { error: PurchasesError; userCancelled: boolean; }) => void,
    upgradeInfo?: UpgradeInfo | null,
    type: PURCHASE_TYPE = PURCHASE_TYPE.SUBS
  ) {
    window.cordova.exec(
      callback,
      (response: { [key: string]: any }) => {
        const {userCancelled, ...error} = response;
        errorCallback({
          error: error as PurchasesError,
          userCancelled,
        });
      },
      PLUGIN_NAME,
      "purchaseProduct",
      [
        productIdentifier,
        upgradeInfo !== undefined && upgradeInfo !== null ? upgradeInfo.oldSKU : null,
        upgradeInfo !== undefined && upgradeInfo !== null
          ? upgradeInfo.prorationMode
          : null,
        type,
      ]
    );
  }

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
  public static purchasePackage(
    aPackage: PurchasesPackage,
    callback: ({productIdentifier, customerInfo,}: { productIdentifier: string; customerInfo: CustomerInfo; }) => void,
    errorCallback: ({error, userCancelled,}: { error: PurchasesError; userCancelled: boolean; }) => void,
    upgradeInfo?: UpgradeInfo | null
  ) {
    window.cordova.exec(
      callback,
      (response: { [key: string]: any }) => {
        const {userCancelled, ...error} = response;
        errorCallback({
          error: error as PurchasesError,
          userCancelled,
        });
      },
      PLUGIN_NAME,
      "purchasePackage",
      [
        aPackage.identifier,
        aPackage.offeringIdentifier,
        upgradeInfo !== undefined && upgradeInfo !== null
          ? upgradeInfo.oldSKU
          : null,
        upgradeInfo !== undefined && upgradeInfo !== null
          ? upgradeInfo.prorationMode
          : null,
      ]
    );
  }

  /**
   * Restores a user's previous purchases and links their appUserIDs to any user's also using those purchases.
   * @param {function(CustomerInfo):void} callback Callback that will receive the new customer info after restoring transactions.
   * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is any problem restoring the user transactions. This gets normally triggered if there
   * is an error retrieving the new customer info for the new user or the user cancelled the restore
   */
  public static restorePurchases(
    callback: (customerInfo: CustomerInfo) => void,
    errorCallback: (error: PurchasesError) => void
  ) {
    window.cordova.exec(
      callback,
      errorCallback,
      PLUGIN_NAME,
      "restorePurchases",
      []
    );
  }

  /**
   * Get the appUserID that is currently in placed in the SDK
   * @param {function(string):void} callback Callback that will receive the current appUserID
   */
  public static getAppUserID(callback: (appUserID: string) => void) {
    window.cordova.exec(callback, null, PLUGIN_NAME, "getAppUserID", []);
  }

  /**
   * This function will logIn the current user with an appUserID. Typically this would be used after a log in 
   * to identify a user without calling configure.
   * @param {String} appUserID The appUserID that should be linked to the currently user
   * @param {function(LogInResult):void} callback Callback that will receive an object that contains the customerInfo after logging in, as well as a boolean indicating 
   * whether the user has just been created for the first time in the RevenueCat backend. 
   * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is any problem logging in.
   */
  public static logIn(
    appUserID: string, 
    callback: (logInResult: LogInResult) => void, 
    errorCallback: (error: PurchasesError) => void
  ) {
    // noinspection SuspiciousTypeOfGuard
    if (typeof appUserID !== "string") {
      throw new Error("appUserID needs to be a string");
    }
    window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "logIn", [
      appUserID,
    ]);
  }

  /**
   * Logs out the Purchases client clearing the saved appUserID. This will generate a random user id and save it in the cache.
   * If the current user is already anonymous, this will produce a PurchasesError.
   * @param {function(CustomerInfo):void} callback Callback that will receive the new customer info after resetting
   * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is an error when logging out. 
   * This could happen for example if logOut is called but the current user is anonymous.
   */
  public static logOut(
    callback: (customerInfo: CustomerInfo) => void,
    errorCallback: (error: PurchasesError) => void
  ) {
    window.cordova.exec(callback, errorCallback, PLUGIN_NAME, "logOut", []);
  }
  /**
   * Gets the current customer info. This call will return the cached customer info unless the cache is stale, in which case,
   * it will make a network call to retrieve it from the servers.
   * @param {function(CustomerInfo):void} callback Callback that will receive the customer info
   * @param {function(PurchasesError, boolean):void} errorCallback Callback that will be triggered whenever there is any problem retrieving the customer info
   */
  public static getCustomerInfo(
    callback: (customerInfo: CustomerInfo) => void,
    errorCallback: (error: PurchasesError) => void
  ) {
    window.cordova.exec(
      callback,
      errorCallback,
      PLUGIN_NAME,
      "getCustomerInfo",
      []
    );
  }

  /**
   * Enables/Disables debugs logs
   * @param {boolean} enabled Enable or disable debug logs
   * @deprecated Use {@link setLogLevel} instead.
   */
  public static setDebugLogsEnabled(enabled: boolean): void {
    window.cordova.exec(null, null, PLUGIN_NAME, "setDebugLogsEnabled", [
      enabled,
    ]);
  }

  /**
   * Used to set the log level. Useful for debugging issues with the lovely team @RevenueCat.
   * @param {LOG_LEVEL} level the minimum log level to enable.
   */
  public static setLogLevel(level: LOG_LEVEL): void {
    window.cordova.exec(null, null, PLUGIN_NAME, "setLogLevel", [
      level,
    ]);
  }

  /**
   * iOS only.
   * @param {boolean} simulatesAskToBuyInSandbox Set this property to true *only* when testing the ask-to-buy / SCA purchases flow. 
   * More information: http://errors.rev.cat/ask-to-buy
   */
  public static setSimulatesAskToBuyInSandbox(enabled: boolean): void {
    window.cordova.exec(null, null, PLUGIN_NAME, "setSimulatesAskToBuyInSandbox", [
      enabled,
    ]);
  }

  /**
   * This method will send all the purchases to the RevenueCat backend. Call this when using your own implementation
   * for subscriptions anytime a sync is needed, like after a successful purchase.
   *
   * @warning This function should only be called if you're not calling makePurchase.
   */
  public static syncPurchases(): void {
    window.cordova.exec(null, null, PLUGIN_NAME, "syncPurchases", []);
  }

  /**
   * Enable automatic collection of Apple Search Ads attribution. Disabled by default.
   *
   * @param {boolean} enabled Enable or not automatic collection
   */
  public static setAutomaticAppleSearchAdsAttributionCollection(enabled: boolean): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAutomaticAppleSearchAdsAttributionCollection",
      [enabled]
    );
  }

  /**
   * Enable automatic collection of Apple Search Ads attribution using AdServices. Disabled by default.
   */
     public static enableAdServicesAttributionTokenCollection(): void {
      window.cordova.exec(
        null,
        null,
        PLUGIN_NAME,
        "enableAdServicesAttributionTokenCollection",
        []
      );
    }

  /**
   * @param {function(boolean):void} callback Will be sent a boolean indicating if the `appUserID` has been generated
   * by RevenueCat or not.
   */
  public static isAnonymous(callback: (isAnonymous: boolean) => void) {
    window.cordova.exec(callback, null, PLUGIN_NAME, "isAnonymous", []);
  }

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
  public static checkTrialOrIntroductoryPriceEligibility(
    productIdentifiers: string[],
    callback: (map: { [productId:string]:IntroEligibility; }) => void
  ) {
    window.cordova.exec(callback, null, PLUGIN_NAME, "checkTrialOrIntroductoryPriceEligibility", [productIdentifiers]);
  }
  /**
   * Sets a function to be called on purchases initiated on the Apple App Store. This is only used in iOS.
   * @param {ShouldPurchasePromoProductListener} shouldPurchasePromoProductListener Called when a user initiates a
   * promotional in-app purchase from the App Store. If your app is able to handle a purchase at the current time, run
   * the deferredPurchase function. If the app is not in a state to make a purchase: cache the deferredPurchase, then
   * call the deferredPurchase when the app is ready to make the promotional purchase.
   * If the purchase should never be made, you don't need to ever call the deferredPurchase and the app will not
   * proceed with promotional purchases.
   */
  public static addShouldPurchasePromoProductListener(shouldPurchasePromoProductListener: ShouldPurchasePromoProductListener): void { 
    if (typeof shouldPurchasePromoProductListener !== "function") {
      throw new Error("addShouldPurchasePromoProductListener needs a function");
    }
    shouldPurchasePromoProductListeners.push(shouldPurchasePromoProductListener);
  }

  /**
   * Removes a given ShouldPurchasePromoProductListener
   * @param {ShouldPurchasePromoProductListener} listenerToRemove ShouldPurchasePromoProductListener reference of the listener to remove
   * @returns {boolean} True if listener was removed, false otherwise
   */
  public static removeShouldPurchasePromoProductListener(listenerToRemove: ShouldPurchasePromoProductListener): boolean { 
    if (shouldPurchasePromoProductListeners.indexOf(listenerToRemove) !== -1) {
      shouldPurchasePromoProductListeners = shouldPurchasePromoProductListeners.filter(
        listener => listenerToRemove !== listener
      );
      return true;
    }
    return false;
  }
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
  public static invalidateCustomerInfoCache(): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "invalidateCustomerInfoCache",
      []
    );
  }

  /** 
   * iOS only. Presents a code redemption sheet, useful for redeeming offer codes
   * Refer to https://docs.revenuecat.com/docs/ios-subscription-offers#offer-codes for more information on how
   * to configure and use offer codes.
   */
  public static presentCodeRedemptionSheet(): void {
    window.cordova.exec(null, null, PLUGIN_NAME, "presentCodeRedemptionSheet", []);
  }

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
  public static setAttributes(attributes: { [key: string]: string | null }): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAttributes",
      [attributes]
    );
  }
  
  /**
   * Subscriber attribute associated with the email address for the user
   *
   * @param email Empty String or null will delete the subscriber attribute.
   */
  public static setEmail(email: string | null): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setEmail",
      [email]
    );
  }

  /**
   * Subscriber attribute associated with the phone number for the user
   *
   * @param phoneNumber Empty String or null will delete the subscriber attribute.
   */
  public static setPhoneNumber(phoneNumber: string | null): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setPhoneNumber",
      [phoneNumber]
    );
  }

  /**
   * Subscriber attribute associated with the display name for the user
   *
   * @param displayName Empty String or null will delete the subscriber attribute.
   */
  public static setDisplayName(displayName: string | null): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setDisplayName",
      [displayName]
    );
  }
  
  /**
   * Subscriber attribute associated with the push token for the user
   *
   * @param pushToken Empty String or null will delete the subscriber attribute.
   */
  public static setPushToken(pushToken: string | null): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setPushToken",
      [pushToken]
    );
  }
  
  /**
   * Subscriber attribute associated with the Adjust Id for the user
   * Required for the RevenueCat Adjust integration
   *
   * @param adjustID Empty String or null will delete the subscriber attribute.
   */
  public static setAdjustID(adjustID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAdjustID",
      [adjustID]
    )
  }
  
  /**
   * Subscriber attribute associated with the AppsFlyer Id for the user
   * Required for the RevenueCat AppsFlyer integration
   * @param appsflyerID Empty String or null will delete the subscriber attribute.
   */
  public static setAppsflyerID(appsflyerID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAppsflyerID",
      [appsflyerID]
    )
  }
  
  /**
   * Subscriber attribute associated with the Facebook SDK Anonymous Id for the user
   * Recommended for the RevenueCat Facebook integration
   *
   * @param fbAnonymousID Empty String or null will delete the subscriber attribute.
   */
  public static setFBAnonymousID(fbAnonymousID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setFBAnonymousID",
      [fbAnonymousID]
    )
  }
  
  /**
   * Subscriber attribute associated with the mParticle Id for the user
   * Recommended for the RevenueCat mParticle integration
   *
   * @param mparticleID Empty String or null will delete the subscriber attribute.
   */
  public static setMparticleID(mparticleID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setMparticleID",
      [mparticleID]
    )
  }
  
  /**
   * Subscriber attribute associated with the OneSignal Player Id for the user
   * Required for the RevenueCat OneSignal integration
   *
   * @param onesignalID Empty String or null will delete the subscriber attribute.
   */
  public static setOnesignalID(onesignalID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setOnesignalID",
      [onesignalID]
    )
  }
  
  /**
   * Subscriber attribute associated with the Airship Channel Id for the user
   * Required for the RevenueCat Airship integration
   *
   * @param airshipChannelID Empty String or null will delete the subscriber attribute.
   */
  public static setAirshipChannelID(airshipChannelID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAirshipChannelID",
      [airshipChannelID]
    )
  }

  /**
   * Subscriber attribute associated with the Firebase App Instance ID for the user
   * Required for the RevenueCat Firebase integration
   *
   * @param firebaseAppInstanceID Empty String or null will delete the subscriber attribute.
   */
  public static setFirebaseAppInstanceID(firebaseAppInstanceID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setFirebaseAppInstanceID",
      [firebaseAppInstanceID]
    )
  }

  /**
   * Subscriber attribute associated with the Mixpanel Distinct ID for the user
   * Required for the RevenueCat Mixpanel integration
   *
   * @param mixpanelDistinctID Empty String or null will delete the subscriber attribute.
   */
  public static setMixpanelDistinctID(mixpanelDistinctID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setMixpanelDistinctID",
      [mixpanelDistinctID]
    )
  }

  /**
   * Subscriber attribute associated with the CleverTap ID for the user
   * Required for the RevenueCat CleverTap integration
   *
   * @param cleverTapID Empty String or null will delete the subscriber attribute.
   */
  public static setCleverTapID(cleverTapID: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setCleverTapID",
      [cleverTapID]
    )
  }

  /**
   * Subscriber attribute associated with the install media source for the user
   *
   * @param mediaSource Empty String or null will delete the subscriber attribute.
   */
  public static setMediaSource(mediaSource: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setMediaSource",
      [mediaSource]
    )
  }
  
  /**
   * Subscriber attribute associated with the install campaign for the user
   *
   * @param campaign Empty String or null will delete the subscriber attribute.
   */
  public static setCampaign(campaign: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setCampaign",
      [campaign]
    )
  }
  
  /**
   * Subscriber attribute associated with the install ad group for the user
   *
   * @param adGroup Empty String or null will delete the subscriber attribute.
   */
  public static setAdGroup(adGroup: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAdGroup",
      [adGroup]
    )
  }
  
  /**
   * Subscriber attribute associated with the install ad for the user
   *
   * @param ad Empty String or null will delete the subscriber attribute.
   */
  public static setAd(ad: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setAd",
      [ad]
    )
  }
  
  /**
   * Subscriber attribute associated with the install keyword for the user
   *
   * @param keyword Empty String or null will delete the subscriber attribute.
   */
  public static setKeyword(keyword: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setKeyword",
      [keyword]
    )
  }
  
  /**
   * Subscriber attribute associated with the install ad creative for the user
   *
   * @param creative Empty String or null will delete the subscriber attribute.
   */
  public static setCreative(creative: string | null) : void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setCreative",
      [creative]
    )
  }

  /**
   * Automatically collect subscriber attributes associated with the device identifiers.
   * $idfa, $idfv, $ip on iOS
   * $gpsAdId, $androidId, $ip on Android
   */
  public static collectDeviceIdentifiers(): void { 
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "collectDeviceIdentifiers",
      []
    )
  }
  
  /**
   * Set this property to your proxy URL before configuring Purchases *only* if you've received a proxy key value from your RevenueCat contact.
   * @param url Proxy URL as a string.
   */
  public static setProxyURL(url: string): void {
    window.cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "setProxyURLString",
      [url]
    );
  }

/**
 * Check if billing is supported for the current user (meaning IN-APP purchases are supported)
 * and optionally, whether a list of specified feature types are supported. 
 * 
 * Note: Billing features are only relevant to Google Play Android users.
 * For other stores and platforms, billing features won't be checked.
 * @param feature An array of feature types to check for support. Feature types must be one of 
 *       [BILLING_FEATURE]. By default, is an empty list and no specific feature support will be checked.
 */

  public static canMakePayments(
    features: BILLING_FEATURE[] = [],
    callback: (canMakePayments: boolean) => void,
    errorCallback: (error: PurchasesError) => void): void {
    window.cordova.exec(
      callback,
      errorCallback,
      PLUGIN_NAME,
      "canMakePayments",
      [features]
    );
  }

  private static setupShouldPurchasePromoProductCallback(): void { 
    window.cordova.exec(
      ({callbackID}:{callbackID: number}) => {
          shouldPurchasePromoProductListeners.forEach(listener =>
            listener(this.getMakeDeferredPurchaseFunction(callbackID))
          );
      },
      null,
      PLUGIN_NAME,
      "setupShouldPurchasePromoProductCallback",
      []
    );
  }

  private static getMakeDeferredPurchaseFunction(callbackID: number) { 
    return () => window.cordova.exec(null, null, PLUGIN_NAME, "makeDeferredPurchase", [callbackID]);
  }
}

if (!window.plugins) {
  window.plugins = {};
}

if (!window.plugins.Purchases) {
  window.plugins.Purchases = new Purchases();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Purchases;
}

export default Purchases;
