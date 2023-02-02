import Purchases from "../src/plugin/plugin";
import {LOG_LEVEL, LogHandler} from "../www/plugin";

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
      ["api_key", "app_user_id", false, undefined, false, false]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id"});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", false, undefined, false, false]
    );
  });

  it("configure fires PurchasesPlugin with the correct arguments when specifying observermode", () => {
    Purchases.configure("api_key", "app_user_id", true);

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", true, undefined, false, false]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when specifying observermode", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", observerMode: true});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", true, undefined, false, false]
    );
  });

  it("configure fires PurchasesPlugin with the correct arguments when setting user defaults suite name", () => {
    const expected = "suite-name";

    Purchases.configure("api_key", "app_user_id", false, expected);

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", false, expected, false, false]
    );
  });

  it("configure fires PurchasesPlugin with the correct arguments when setting user defaults suite name", () => {
    const expected = "suite-name";

    Purchases.configure("api_key", "app_user_id", false, expected);

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", false, expected, false, false]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when using Amazon", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", useAmazon: true});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", false, undefined, false, true]
    );
  });

  it("configureWith fires PurchasesPlugin with the correct arguments when using StoreKit 2", () => {
    Purchases.configureWith({apiKey: "api_key", appUserID: "app_user_id", usesStoreKit2IfAvailable: true});

    expect(execFn).toHaveBeenCalledWith(
      null,
      null,
      "PurchasesPlugin",
      "configure",
      ["api_key", "app_user_id", false, undefined, true, false]
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
        Purchases.setLogHandler((logLevel, message) => {
          receivedLogLevel = logLevel
          expect(message).toEqual("message");
        });
        expect(execFn).toHaveBeenCalledWith(
            expect.any(Function),
            null,
            "PurchasesPlugin",
            "setLogHandler",
            []
        );
        let capturedCallback = execFn.mock.calls[0][0] as LogHandler;
        capturedCallback(LOG_LEVEL[value], "a message");
        expect(receivedLogLevel).toEqual(LOG_LEVEL[value]);
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

  // Creates a new type from an enum with string values so we can be iterated over the keys of the enum
  // https://www.petermorlion.com/iterating-a-typescript-enum/
  function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
  }
});
