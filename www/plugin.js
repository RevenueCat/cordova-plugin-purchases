const PLUGIN_NAME = "PurchasesPlugin";
class Purchases {
  static setup(apiKey, appUserID) {
    cordova.exec(null, null, PLUGIN_NAME, "setupPurchases", [apiKey, appUserID]);
  }

  static setAllowSharingStoreAccount(allowSharing) {
    cordova.exec(null, null, PLUGIN_NAME, "setAllowSharingStoreAccount", [
      allowSharing
    ]);
  }

  static addAttributionData(data, network) {
    cordova.exec(null, null, PLUGIN_NAME, "addAttributionData", [data, network]);
  }

  static getEntitlements(callback, errorcallback) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "getEntitlements", []);
  }

  static getProducts(
    productIdentifiers,
    callback,
    errorcallback,
    type = "subs"
  ) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "getProductInfo", [
      productIdentifiers,
      type
    ]);
  }

  /**
   * Success callback used when making a purchase. This callback will be triggered after a successful purchase.
   * Cancelled purchases will trigger an error callback.
   *
   * @callback makePurchaseSuccessCallback
   * @param {string} productIdentifier - The product identifier of the purchased product.
   * @param {object} purchaserInfo - The updated Purchaser Info.
   */

  /**
   * Error callback triggered when making a purchase. Cancelled purchases will also trigger this callback and
   * error.userCancelled will be true
   *
   * @callback makePurchaseErrorCallback
   * @param {object} error - The error containing message, code, domain and if user cancelled the purchase.
   */

  /**
   *
   * @param {string} productIdentifier The product identifier of the product you want to purchase.
   * @param {makePurchaseSuccessCallback} callback Callback triggered after a successful purchase.
   * @param {makePurchaseErrorCallback} errorcallback Callback triggered after an error or when the user cancels the purchase.
   * If user cancelled, error.userCancelled will be true
   * @param {Array<String>} oldSkus Optional array of skus you wish to upgrade from.
   * @param {String} type Optional type of product, can be inapp or subs. Subs by default
   */
  static makePurchase(
    productIdentifier,
    callback,
    errorcallback,
    oldSkus = [],
    type = "subs"
  ) {
    cordova.exec(
      callback,
      ({ code, domain, message }) => {
        const userCancelledDomainCodes = {
          1: "Play Billing",
          2: "SKErrorDomain"
        };
        // TODO send product identifier?
        errorcallback({
          code,
          domain,
          message,
          userCancelled: userCancelledDomainCodes[code] === domain
        });
      },
      PLUGIN_NAME,
      "makePurchase",
      [productIdentifier, oldSkus, type]
    );
  }

  static restoreTransactions(callback, errorcallback) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "restoreTransactions", []);
  }

  static getAppUserID(callback) {
    cordova.exec(callback, null, PLUGIN_NAME, "getAppUserID", []);
  }

  static createAlias(newAppUserID, callback, errorcallback) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "createAlias", [newAppUserID]);
  }

  static identify(newAppUserID, callback, errorcallback) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "identify", [newAppUserID]);
  }

  static reset(callback, errorcallback) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "reset", []);
  }

  static getPurchaserInfo(callback, errorcallback) {
    cordova.exec(callback, errorcallback, PLUGIN_NAME, "getPurchaserInfo", []);
  }

  /** @callback PurchaserInfoListener
        @param {Object} purchaserInfo Object containing info for the purchaser
    */

  /** Sets a function to be called on updated purchaser info
        @param {PurchaserInfoListener} updatedPurchaserInfoListener PurchaserInfo update listener
    */
  static setUpdatedPurchaserInfoListener(updatedPurchaserInfoListener) {
    cordova.exec(
      updatedPurchaserInfoListener,
      null,
      PLUGIN_NAME,
      "setUpdatedPurchaserInfoListener",
      []
    );
  }

  static removeUpdatedPurchaserInfoListener() {
    cordova.exec(
      null,
      null,
      PLUGIN_NAME,
      "removeUpdatedPurchaserInfoListener",
      []
    );
  }

  static setDebugLogsEnabled(enabled) {
    cordova.exec(null, null, PLUGIN_NAME, "setDebugLogsEnabled", [enabled]);
  }
}

Purchases.ATTRIBUTION_NETWORKS = {
  APPLE_SEARCH_ADS: 0,
  ADJUST: 1,
  APPSFLYER: 2,
  BRANCH: 3
};

if (typeof module !== "undefined") {
  // Export purchases
  module.exports = Purchases;
}
