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
  PurchasesStoreTransaction,
  PurchasesVirtualCurrencies,
} from '../www/plugin';

import Purchases from '../www/plugin';
import {IN_APP_MESSAGE_TYPE, PURCHASES_ARE_COMPLETED_BY_TYPE, PurchasesAreCompletedBy, STOREKIT_VERSION} from "../src/plugin/plugin";

const errorCallback = (error: PurchasesError) => {
};

function checkPurchases(purchases: Purchases) {
  const productIds: string[] = [];

  Purchases.getOfferings(offerings => {
    const offeringsData: PurchasesOfferings = offerings;
  }, errorCallback);
  Purchases.getProducts(productIds, products => {
    const productsData: PurchasesStoreProduct[] = products;
  }, errorCallback);
  Purchases.restorePurchases(callback => {
    const customerInfo: CustomerInfo = callback;
  }, errorCallback);
}

function checkUsers(purchases: Purchases) {
  Purchases.getAppUserID(appUserID => {
    const userID: string = appUserID;
  });
  Purchases.logIn("userId", loginResult => {
    const login: LogInResult = loginResult;
  }, errorCallback);
  Purchases.logOut(callback => {
    const customerInfo: CustomerInfo = callback;
  }, errorCallback);
  Purchases.getCustomerInfo(callback => {
    const customerInfo: CustomerInfo = callback;
  }, errorCallback);
  Purchases.isAnonymous(callback => {
    const isAnonymous: boolean = callback;
  });
}

function checkPurchasing(purchases: Purchases,
                         product: PurchasesStoreProduct,
                         discount: PurchasesStoreProductDiscount,
                         pack: PurchasesPackage) {
  const productId: string = "";
  const upgradeInfo: UpgradeInfo | null = null;
  const features: BILLING_FEATURE[] = [];

  const purchaseCallback = ({productIdentifier, customerInfo,}: {
    productIdentifier: string;
    customerInfo: CustomerInfo;
  }) => {
  };
  const errorCallbackUserCancelled = ({error, userCancelled,}: { error: PurchasesError; userCancelled: boolean; }) => {
  };

  Purchases.purchaseProduct(productId, purchaseCallback, errorCallbackUserCancelled, upgradeInfo, PURCHASE_TYPE.INAPP);
  Purchases.purchasePackage(pack, purchaseCallback, errorCallbackUserCancelled, upgradeInfo);
  Purchases.syncPurchases();

  Purchases.canMakePayments(features, callback => {
    const canMakePayments: boolean = callback;
  }, errorCallback);
  Purchases.getOfferings(offerings => {
    const offeringsData: PurchasesOfferings = offerings;
  }, errorCallback);

  const eligibilityCallback = (map: { [productId: string]: IntroEligibility; }) => {
  };
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
    appUserID
  );
  Purchases.configure(
    apiKey,
    appUserID,
    userDefaultsSuiteName
  );

  Purchases.setProxyURL("");
  Purchases.setDebugLogsEnabled(true);
  Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.setSimulatesAskToBuyInSandbox(true);
  Purchases.setLogHandler((logLevel: LOG_LEVEL, message: string) => {
  });
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

function checkPurchasesAreCompletedBy() {
  const purchasesAreCompletedByRevenueCat: PurchasesAreCompletedBy = PURCHASES_ARE_COMPLETED_BY_TYPE.REVENUECAT;
  const purchasesAreCompletedByMyApp: PurchasesAreCompletedBy = {type: PURCHASES_ARE_COMPLETED_BY_TYPE.MY_APP, storeKitVersion: STOREKIT_VERSION.STOREKIT_2};
}

function checkPurchasesConfiguration() {
  const apiKey: string = "";
  const appUserID: string | null = "";
  const purchasesAreCompletedBy: PurchasesAreCompletedBy = PURCHASES_ARE_COMPLETED_BY_TYPE.REVENUECAT;
  const userDefaultsSuiteName: string = "";
  const useAmazon: boolean = false;
  const shouldShowInAppMessagesAutomatically: boolean = true;
  const storeKitVersion: STOREKIT_VERSION = STOREKIT_VERSION.STOREKIT_2;

  Purchases.configureWith({
    apiKey,
    appUserID,
    purchasesAreCompletedBy
  });
  Purchases.configureWith({
    apiKey,
    appUserID,
    purchasesAreCompletedBy,
    userDefaultsSuiteName
  });
  Purchases.configureWith({
    apiKey,
    appUserID,
    purchasesAreCompletedBy,
    userDefaultsSuiteName,
    useAmazon
  });
  Purchases.configureWith({
    apiKey,
    appUserID,
    purchasesAreCompletedBy,
    userDefaultsSuiteName,
    useAmazon,
    shouldShowInAppMessagesAutomatically
  });

  const configuration: PurchasesConfiguration = {
    apiKey,
    appUserID,
    purchasesAreCompletedBy,
    userDefaultsSuiteName,
    storeKitVersion,
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
  Purchases.showInAppMessages();
  const messageTypes: IN_APP_MESSAGE_TYPE[] = [];
  Purchases.showInAppMessages(messageTypes);
  Purchases.recordPurchase("product_id", (transaction: PurchasesStoreTransaction) => {}, (error: PurchasesError) => {});
}

function checkListeners() {
  const shouldPurchaseListener: ShouldPurchasePromoProductListener = deferredPurchase => {
  };

  Purchases.addShouldPurchasePromoProductListener(shouldPurchaseListener);
  Purchases.removeShouldPurchasePromoProductListener(shouldPurchaseListener);
}

function checkSyncAmazonPurchase(productID: string,
                                 receiptID: string,
                                 amazonUserID: string,
                                 isoCurrencyCode?: string | null,
                                 price?: number | null) {
  Purchases.syncObserverModeAmazonPurchase(
    productID, receiptID, amazonUserID, isoCurrencyCode, price);
  Purchases.syncAmazonPurchase(
    productID, receiptID, amazonUserID, isoCurrencyCode, price);
}

function checkBeginRefundRequest(
  entitlementInfo: PurchasesEntitlementInfo,
  purchasesStoreProduct: PurchasesStoreProduct
) {
  Purchases.beginRefundRequestForActiveEntitlement((refundRequestStatus: REFUND_REQUEST_STATUS) => {
  }, errorCallback);
  Purchases.beginRefundRequestForEntitlement(entitlementInfo, (refundRequestStatus: REFUND_REQUEST_STATUS) => {
  }, errorCallback);
  Purchases.beginRefundRequestForProduct(purchasesStoreProduct, (refundRequestStatus: REFUND_REQUEST_STATUS) => {
  }, errorCallback);
}

function checkFetchAndPurchaseWinBackOffersForProduct(
  product: PurchasesStoreProduct,
) {
  Purchases.getEligibleWinBackOffersForProduct(
    product,
    (winBackOffers) => {
      Purchases.purchaseProductWithWinBackOffer(
        product,
        winBackOffers[0],
        ({productIdentifier, customerInfo}) => {},
        ({error, userCancelled}) => {}
      );
    },
    errorCallback
  );
}

function checkFetchAndPurchaseWinBackOffersForPackage(
  aPackage: PurchasesPackage,
) {
  Purchases.getEligibleWinBackOffersForPackage(
    aPackage,
    (winBackOffers) => {
      Purchases.purchasePackageWithWinBackOffer(
        aPackage,
        winBackOffers[0],
        ({productIdentifier, customerInfo}) => {},
        ({error, userCancelled}) => {}
      );
    },
    errorCallback
  );
}

function checkGetVirtualCurrencies() {
  Purchases.getVirtualCurrencies(
    (virtualCurrencies: PurchasesVirtualCurrencies) => {}, 
    errorCallback
  );
}