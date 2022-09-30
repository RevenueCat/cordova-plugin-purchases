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
  ShouldPurchasePromoProductListener,
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
  Purchases.setSimulatesAskToBuyInSandbox(true);
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
