import {
  CustomerInfo,
  IntroEligibility,
  LogInResult,
  PurchasesError,
  PurchasesOfferings,
  PurchasesPackage,
  PurchasesStoreProduct,
  UpgradeInfo,
  PURCHASE_TYPE,
  PurchasesStoreProductDiscount,
  BILLING_FEATURE,
  LOG_LEVEL,
  ShouldPurchasePromoProductListener,
  PurchasesConfiguration,
  LogHandler,
  REFUND_REQUEST_STATUS,
  PurchasesEntitlementInfo,
} from '../www/plugin';

import Purchases from '../www/plugin';

const errorCallback = (error: PurchasesError) => {};

function checkPurchases(purchases: Purchases) {
  const productIds: string[] = [];

  Purchases.getOfferings(offerings => { const offeringsData: PurchasesOfferings = offerings; }, errorCallback);
  Purchases.getProducts(productIds, products => { const productsData: PurchasesStoreProduct[] = products; }, errorCallback);
  Purchases.restorePurchases(callback => { const customerInfo: CustomerInfo = callback; }, errorCallback);
}

function checkUsers(purchases: Purchases) {
  Purchases.getAppUserID(appUserID => { const userID: string = appUserID; });
  Purchases.logIn("userId", loginResult => { const login: LogInResult = loginResult; }, errorCallback);
  Purchases.logOut(callback => { const customerInfo: CustomerInfo = callback; }, errorCallback);
  Purchases.getCustomerInfo(callback => { const customerInfo: CustomerInfo = callback; }, errorCallback);
  Purchases.isAnonymous(callback => { const isAnonymous: boolean = callback; });
}

function checkPurchasing(purchases: Purchases,
                         product: PurchasesStoreProduct,
                         discount: PurchasesStoreProductDiscount,
                         pack: PurchasesPackage) {
  const productId: string = "";
  const upgradeInfo: UpgradeInfo | null = null;
  const features: BILLING_FEATURE[] = [];

  const purchaseCallback = ({productIdentifier, customerInfo,}: { productIdentifier: string; customerInfo: CustomerInfo; }) => {};
  const errorCallbackUserCancelled = ({error, userCancelled,}: { error: PurchasesError; userCancelled: boolean; }) => {};

  Purchases.purchaseProduct(productId, purchaseCallback, errorCallbackUserCancelled, upgradeInfo, PURCHASE_TYPE.INAPP);
  Purchases.purchasePackage(pack, purchaseCallback, errorCallbackUserCancelled, upgradeInfo);
  Purchases.syncPurchases();

  Purchases.canMakePayments(features, callback => { const canMakePayments: boolean = callback; }, errorCallback);
  Purchases.getOfferings(offerings => { const offeringsData: PurchasesOfferings = offerings; }, errorCallback);

  const eligibilityCallback = (map: { [productId:string]:IntroEligibility; }) => {};
  Purchases.checkTrialOrIntroductoryPriceEligibility([""], eligibilityCallback);
}

function checkConfigure() {
  const apiKey: string = "";
  const appUserID: string | null = "";
  const observerMode: boolean = false;
  const userDefaultsSuiteName: string = "";
  const useAmazon: boolean = false;

  Purchases.configure(
    apiKey,
    appUserID,
    observerMode
  );
  Purchases.configure(
    apiKey,
    appUserID,
    observerMode,
    userDefaultsSuiteName
  );

  Purchases.setProxyURL("");
  Purchases.setDebugLogsEnabled(true);
  Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.setSimulatesAskToBuyInSandbox(true);
  Purchases.setLogHandler((logLevel: LOG_LEVEL, message: string) => {    });
}

function checkLogHandler(logHandler: LogHandler) {
  Purchases.setLogHandler(logHandler);
}

function checkLogLevels(level: LOG_LEVEL) {
  switch (level) {
    case LOG_LEVEL.DEBUG:
    case LOG_LEVEL.VERBOSE:
    case LOG_LEVEL.INFO:
    case LOG_LEVEL.WARN:
    case LOG_LEVEL.ERROR:
  }
}

function checkPurchasesConfiguration() {
  const apiKey: string = "";
  const appUserID: string | null = "";
  const observerMode: boolean = false;
  const userDefaultsSuiteName: string = "";
  const useAmazon: boolean = false;

  Purchases.configureWith({
    apiKey,
    appUserID,
    observerMode
  });
  Purchases.configureWith({
    apiKey,
    appUserID,
    observerMode,
    userDefaultsSuiteName
  });
  Purchases.configureWith({
    apiKey,
    appUserID,
    observerMode,
    userDefaultsSuiteName,
    useAmazon
  });

  const configuration: PurchasesConfiguration = {
    apiKey,
    appUserID,
    observerMode,
    userDefaultsSuiteName,
    useAmazon
  }

  Purchases.configureWith(configuration);

  const simpleAmazonConfiguration: PurchasesConfiguration = {
    apiKey,
    useAmazon: true
  }

  Purchases.configureWith(simpleAmazonConfiguration);
}

function checkMisc() {
  Purchases.presentCodeRedemptionSheet();
  Purchases.invalidateCustomerInfoCache();
}

function checkListeners() {
  const shouldPurchaseListener: ShouldPurchasePromoProductListener = deferredPurchase => {};

  Purchases.addShouldPurchasePromoProductListener(shouldPurchaseListener);
  Purchases.removeShouldPurchasePromoProductListener(shouldPurchaseListener);
}

function checkSyncObserverModeAmazonPurchase(productID: string,
                                             receiptID: string,
                                             amazonUserID: string,
                                             isoCurrencyCode?: string | null,
                                             price?: number | null) {
  Purchases.syncObserverModeAmazonPurchase(
    productID, receiptID, amazonUserID, isoCurrencyCode, price);
}

function checkBeginRefundRequest(
  entitlementInfo: PurchasesEntitlementInfo,
  purchasesStoreProduct: PurchasesStoreProduct
) {
  Purchases.beginRefundRequestForActiveEntitlement((refundRequestStatus: REFUND_REQUEST_STATUS) => {}, errorCallback);
  Purchases.beginRefundRequestForEntitlement(entitlementInfo, (refundRequestStatus: REFUND_REQUEST_STATUS) => {}, errorCallback);
  Purchases.beginRefundRequestForProduct(purchasesStoreProduct, (refundRequestStatus: REFUND_REQUEST_STATUS) => {}, errorCallback);
}
