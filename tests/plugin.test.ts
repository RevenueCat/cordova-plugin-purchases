import Purchases from "../src/plugin/plugin";
import {LOG_LEVEL, PurchasesError, PurchasesEntitlementInfo, PurchasesStoreProduct, PRODUCT_CATEGORY, PURCHASES_ARE_COMPLETED_BY_TYPE, STOREKIT_VERSION, PurchasesAreCompletedByMyApp, PurchasesStoreTransaction} from "../www/plugin";

const execFn = jest.fn();

window.cordova = {
  exec: execFn
};

describe("Purchases", () => {
  it("configure fires PurchasesPlugin with the correct arguments", () => {
    Purchases.configure("api_key", "app_user_id");

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", undefined, undefined, undefined, false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id"});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", undefined, undefined, undefined, false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when specifying PurchasesAreCompletedBy.REVENUECAT", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", purchasesAreCompletedBy: PURCHASES_ARE_COMPLETED_BY_TYPE.REVENUECAT});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", "REVENUECAT", undefined, undefined, false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when specifying PurchasesAreCompletedByMyApp", () => {
    let purchasesAreCompletedByMyApp: PurchasesAreCompletedByMyApp = {type: PURCHASES_ARE_COMPLETED_BY_TYPE.MY_APP, storeKitVersion: STOREKIT_VERSION.STOREKIT_2};
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", purchasesAreCompletedBy: purchasesAreCompletedByMyApp});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", "MY_APP", undefined, "STOREKIT_2", false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the PurchasesAreCompletedByMyApp storekit version if conflict present", () => {
    let purchasesAreCompletedByMyApp: PurchasesAreCompletedByMyApp = {type: PURCHASES_ARE_COMPLETED_BY_TYPE.MY_APP, storeKitVersion: STOREKIT_VERSION.STOREKIT_2};
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", purchasesAreCompletedBy: purchasesAreCompletedByMyApp, storeKitVersion: STOREKIT_VERSION.STOREKIT_1});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", "MY_APP", undefined, "STOREKIT_2", false, true]
    );
  });

  it("configure fires PurchasesPlugin with the correct arguments when setting user defaults suite name", () => {
    const expected = "suite-name";

    Purchases.configure("api_key", "app_user_id", expected);

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", undefined, expected, undefined, false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when using Amazon", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", useAmazon: true});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", undefined, undefined, undefined, true, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when using StoreKit 2", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", storeKitVersion: STOREKIT_VERSION.STOREKIT_2});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", undefined, undefined, "STOREKIT_2", false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when disabling in app messages from showing", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", useAmazon: true, shouldShowInAppMessagesAutomatically: false});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", undefined, undefined, undefined, true, false]
    );
  });

  it("configure setups delegate callback", () => {
    Purchases.configure("api_key", "app_user_id");

    expect(execFn).toHaveBeenCalledWith(
      expect.any(Function),
      null,
      "PurchasesPlugin",
      "setupDelegateCallback",
      []
    );
  });

  it("configureWith setups delegate callback", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id"});

    expect(execFn).toHaveBeenCalledWith(
      expect.any(Function),
      null,
      "PurchasesPlugin",
      "setupDelegateCallback",
      []
    );
  });

  it("setProxyURL fires PurchasesPlugin with the correct arguments", () => {
    const expected = "https://proxy.com";
    Purchases.setProxyURL(expected);

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "setProxyURLString",
      [expected]
    );
  });

  describe("setLogLevel", () => {
    // If the enum is backed by string values, iterating over the enum won’t work because the `value` in our loop is a
    // string instead of a number. The indexer of `LOG_LEVEL` can only accept `VERBOSE`, `DEBUG`...
    // We need a helper method to create a new type `enumKeys`
    for (const value of enumKeys(LOG_LEVEL)) {
      it(`setLogLevel(${value}) fires PurchasesPlugin with the correct arguments`, () => {
        Purchases.setLogLevel(LOG_LEVEL[value]);
        expect(execFn).toHaveBeenCalledWith(
            null,
            null,
            "PurchasesPlugin",
            "setLogLevel",
            [value]
        );
      });
    }
  });

  describe("setLogHandler", () => {
    // If the enum is backed by string values, iterating over the enum won’t work because the `value` in our loop is a
    // string instead of a number. The indexer of `LOG_LEVEL` can only accept `VERBOSE`, `DEBUG`...
    // We need a helper method to create a new type `enumKeys`
    for (const value of enumKeys(LOG_LEVEL)) {
      it(`setLogHandler fires the callback for ${value} logs`, () => {
        let receivedLogLevel;
        let messageReceived;
        Purchases.setLogHandler((logLevel, message) => {
          receivedLogLevel = logLevel;
          messageReceived = message;
        });
        expect(execFn).toHaveBeenCalledWith(
            expect.any(Function),
            null,
            "PurchasesPlugin",
            "setLogHandler",
            []
        );
        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback({logLevel: value, message: "message"});
        expect(receivedLogLevel).toEqual(value);
        expect(messageReceived).toEqual("message");
      });
    }

    it("enumKeys returns all LOG_LEVEL options", () => {
      expect(enumKeys(LOG_LEVEL).length).toEqual(Object.keys(LOG_LEVEL).length);
    });
  });

  describe("canMakePayments", () => {
    describe("when no parameters are passed", () => {
      it("calls Purchases with empty list", () => {
        Purchases.canMakePayments(
          undefined,
          canPay => {},
          error => {}
        );

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "canMakePayments",
          [[]]
        );
      });
    });
    describe("when empty list is passed", () => {
      it("calls Purchases with empty list", () => {
        Purchases.canMakePayments(
          [],
          canPay => {},
          error => {}
        );
        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "canMakePayments",
          [[]]
        );
      });
    });
    describe("when list of parameters are passed", () => {
      it("calls Purchases with list of features", () => {
        Purchases.canMakePayments(
          [Purchases.BILLING_FEATURE.SUBSCRIPTIONS],
          canPay => {},
          error => {}
        );
        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "canMakePayments",
          [[0]]
        );
      });
    });
    describe("when list of parameters are passed", () => {
        it("parameters are mapped successfully", () => {
          const expected = [[0, 4, 3, 1, 2]]

          Purchases.canMakePayments(
            [Purchases.BILLING_FEATURE.SUBSCRIPTIONS,
              Purchases.BILLING_FEATURE.PRICE_CHANGE_CONFIRMATION,
              Purchases.BILLING_FEATURE.SUBSCRIPTIONS_ON_VR,
              Purchases.BILLING_FEATURE.SUBSCRIPTIONS_UPDATE,
              Purchases.BILLING_FEATURE.IN_APP_ITEMS_ON_VR],
            canPay => {},
            error => {}
          );
          expect(execFn).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function),
            "PurchasesPlugin",
            "canMakePayments",
            expected
          );
        });
      });
  });

  describe("showInAppMessages", () => {
    describe("when no parameters are passed", () => {
      it("calls Purchases with no parameters", () => {
        Purchases.showInAppMessages();

        expect(execFn).toHaveBeenCalledWith(
          null,
          null,
          "PurchasesPlugin",
          "showInAppMessages",
          [undefined]
        );
      });
    });
    describe("when empty list is passed", () => {
      it("calls Purchases with empty list", () => {
        Purchases.showInAppMessages(
          [],
        );
        expect(execFn).toHaveBeenCalledWith(
          null,
          null,
          "PurchasesPlugin",
          "showInAppMessages",
          [[]]
        );
      });
    });
    describe("when list of parameters are passed", () => {
      it("calls Purchases with list of message types", () => {
        Purchases.showInAppMessages(
          [Purchases.IN_APP_MESSAGE_TYPE.BILLING_ISSUE],
        );
        expect(execFn).toHaveBeenCalledWith(
          null,
          null,
          "PurchasesPlugin",
          "showInAppMessages",
          [[0]]
        );
      });
    });
    describe("when list of parameters are passed", () => {
      it("parameters are mapped successfully", () => {
        const expected = [[0, 2, 1]]

        Purchases.showInAppMessages(
          [Purchases.IN_APP_MESSAGE_TYPE.BILLING_ISSUE,
            Purchases.IN_APP_MESSAGE_TYPE.GENERIC,
            Purchases.IN_APP_MESSAGE_TYPE.PRICE_INCREASE_CONSENT],
        );
        expect(execFn).toHaveBeenCalledWith(
          null,
          null,
          "PurchasesPlugin",
          "showInAppMessages",
          expected
        );
      });
    });
  });

  describe("beginRefundRequest", () => {
    function stubBeginRefundRequestError() {
      let expectedError: PurchasesError = {
        code: 31,
        message: 'Error when trying to begin refund request',
        readableErrorCode: 'BEGIN_REFUND_REQUEST_ERROR',
        underlyingErrorMessage: 'Unable to request refund'
      }
      return expectedError;
    }

    function stubEntitlementInfo() {
      let entitlementInfo: PurchasesEntitlementInfo = {
        identifier: 'entitlement_id',
        isActive: true,
        willRenew: true,
        periodType: 'NORMAL',
        latestPurchaseDate: new Date().toDateString(),
        originalPurchaseDate: new Date().toDateString(),
        expirationDate: new Date().toDateString(),
        store: 'appStore',
        productIdentifier: 'product_id',
        isSandbox: true,
        unsubscribeDetectedAt: new Date().toDateString(),
        billingIssueDetectedAt: new Date().toDateString()
      }
      return entitlementInfo;
    }

    function stubStoreProduct() {
      let storeProduct: PurchasesStoreProduct = {
        identifier: 'product_id',
        description: 'product_description',
        title: 'product_title',
        price: 1.99,
        priceString: '$1.99',
        currencyCode: 'USD',
        introPrice: null,
        discounts: null,
        productCategory: PRODUCT_CATEGORY.NON_SUBSCRIPTION,
        subscriptionPeriod: 'P1M',
        defaultOption: null,
        subscriptionOptions: null,
        presentedOfferingIdentifier: null
      }
      return storeProduct;
    }

    describe("for active entitlement", () => {
      it("calls Purchases with correct parameters", () => {
        let receivedRefundRequestStatus;
        Purchases.beginRefundRequestForActiveEntitlement(
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForActiveEntitlement",
          []
        );
      });

      it("returns REFUND_REQUEST_STATUS.SUCCESS", () => {
        let receivedRefundRequestStatus;
        Purchases.beginRefundRequestForActiveEntitlement(
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback(0);
        expect(receivedRefundRequestStatus).toEqual(Purchases.REFUND_REQUEST_STATUS.SUCCESS);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForActiveEntitlement",
          []
        );
      });

      it("returns REFUND_REQUEST_STATUS.USER_CANCELLED", () => {
        let receivedRefundRequestStatus;
        Purchases.beginRefundRequestForActiveEntitlement(
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback(1);
        expect(receivedRefundRequestStatus).toEqual(Purchases.REFUND_REQUEST_STATUS.USER_CANCELLED);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForActiveEntitlement",
          []
        );
      });

      it("returns error", () => {
        let receivedError;
        Purchases.beginRefundRequestForActiveEntitlement(
          refundRequestStatus => {},
          error => {
            receivedError = error;
          }
        );

        let callsToMock = execFn.mock.calls;
        let capturedErrorCallback = callsToMock[callsToMock.length - 1][1];
        let expectedError = stubBeginRefundRequestError();
        capturedErrorCallback(expectedError);
        expect(receivedError).toEqual(expectedError);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForActiveEntitlement",
          []
        );
      });
    });

    describe("for entitlement", () => {
      it("calls Purchases with correct parameters", () => {
        let receivedRefundRequestStatus;
        let entitlementInfo = stubEntitlementInfo();
        Purchases.beginRefundRequestForEntitlement(
          entitlementInfo,
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForEntitlementId",
          [entitlementInfo.identifier]
        );
      });

      it("returns REFUND_REQUEST_STATUS.SUCCESS", () => {
        let receivedRefundRequestStatus;
        let entitlementInfo = stubEntitlementInfo();
        Purchases.beginRefundRequestForEntitlement(
          entitlementInfo,
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback(0);
        expect(receivedRefundRequestStatus).toEqual(Purchases.REFUND_REQUEST_STATUS.SUCCESS);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForEntitlementId",
          [entitlementInfo.identifier]
        );
      });

      it("returns REFUND_REQUEST_STATUS.USER_CANCELLED", () => {
        let receivedRefundRequestStatus;
        let entitlementInfo = stubEntitlementInfo();
        Purchases.beginRefundRequestForEntitlement(
          entitlementInfo,
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback(1);
        expect(receivedRefundRequestStatus).toEqual(Purchases.REFUND_REQUEST_STATUS.USER_CANCELLED);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForEntitlementId",
          [entitlementInfo.identifier]
        );
      });

      it("returns error", () => {
        let receivedError;
        let entitlementInfo = stubEntitlementInfo();
        Purchases.beginRefundRequestForEntitlement(
          entitlementInfo,
          refundRequestStatus => {},
          error => {
            receivedError = error;
          }
        );

        let callsToMock = execFn.mock.calls;
        let capturedErrorCallback = callsToMock[callsToMock.length - 1][1];
        let expectedError = stubBeginRefundRequestError();
        capturedErrorCallback(expectedError);
        expect(receivedError).toEqual(expectedError);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForEntitlementId",
          [entitlementInfo.identifier]
        );
      });
    });

    describe("for product", () => {
      it("calls Purchases with correct parameters", () => {
        let receivedRefundRequestStatus;
        let storeProduct = stubStoreProduct();
        Purchases.beginRefundRequestForProduct(
          storeProduct,
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForProductId",
          [storeProduct.identifier]
        );
      });

      it("returns REFUND_REQUEST_STATUS.SUCCESS", () => {
        let receivedRefundRequestStatus;
        let storeProduct = stubStoreProduct();
        Purchases.beginRefundRequestForProduct(
          storeProduct,
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback(0);
        expect(receivedRefundRequestStatus).toEqual(Purchases.REFUND_REQUEST_STATUS.SUCCESS);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForProductId",
          [storeProduct.identifier]
        );
      });

      it("returns REFUND_REQUEST_STATUS.USER_CANCELLED", () => {
        let receivedRefundRequestStatus;
        let storeProduct = stubStoreProduct();
        Purchases.beginRefundRequestForProduct(
          storeProduct,
          refundRequestStatus => {
            receivedRefundRequestStatus = refundRequestStatus;
          },
          error => {}
        );

        let callsToMock = execFn.mock.calls;
        let capturedCallback = callsToMock[callsToMock.length - 1][0];
        capturedCallback(1);
        expect(receivedRefundRequestStatus).toEqual(Purchases.REFUND_REQUEST_STATUS.USER_CANCELLED);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForProductId",
          [storeProduct.identifier]
        );
      });

      it("returns error", () => {
        let receivedError;
        let storeProduct = stubStoreProduct();
        Purchases.beginRefundRequestForProduct(
          storeProduct,
          refundRequestStatus => {},
          error => {
            receivedError = error;
          }
        );

        let callsToMock = execFn.mock.calls;
        let capturedErrorCallback = callsToMock[callsToMock.length - 1][1];
        let expectedError = stubBeginRefundRequestError();
        capturedErrorCallback(expectedError);
        expect(receivedError).toEqual(expectedError);

        expect(execFn).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          "PurchasesPlugin",
          "beginRefundRequestForProductId",
          [storeProduct.identifier]
        );
      });
    });
  });

  describe("syncAmazonPurchase", () => {
    it("calls Purchases with the correct arguments", () => {
      Purchases.syncAmazonPurchase(
          'productID_test',
          'receiptID_test',
          'amazonUserID_test',
          'isoCurrencyCode_test',
          3.4,
      );

      expect(execFn).toHaveBeenCalledWith(
          null,
          null,
          "PurchasesPlugin",
          "syncAmazonPurchase",
          [
            'productID_test',
            'receiptID_test',
            'amazonUserID_test',
            'isoCurrencyCode_test',
            3.4
          ]
      );
    });
  });


  describe("recordPurchase", () => {
    it("calls Purchases with the correct arguments", () => {
      Purchases.recordPurchase(
          'productID_test',
          (transaction: PurchasesStoreTransaction) => {},
          (error: PurchasesError) => {},
      );

      expect(execFn).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        "PurchasesPlugin",
        "recordPurchase",
        ['productID_test']
      );
    });
  });

  // Creates a new type from an enum with string values so we can be iterated over the keys of the enum
  // https://www.petermorlion.com/iterating-a-typescript-enum/
  function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
  }
});
