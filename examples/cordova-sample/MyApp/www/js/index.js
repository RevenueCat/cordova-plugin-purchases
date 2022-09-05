/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
    document.getElementById("get-offerings").addEventListener("click", this.getOfferings); 
    document.getElementById("get-products").addEventListener("click", this.getProducts);
    document.getElementById("get-customer-info").addEventListener("click", this.getCustomerInfo);
    document.getElementById("login-random").addEventListener("click", this.loginRandom);
    document.getElementById("login-known").addEventListener("click", this.loginKnown);
    document.getElementById("log-out").addEventListener("click", this.logOut);
    document.getElementById("sync-purchases").addEventListener("click", this.syncPurchases);
    document.getElementById("restore-purchases").addEventListener("click", this.restorePurchases);
    document.getElementById("can-make-payments").addEventListener("click", this.canMakePayments);
    document.getElementById("set-subs-attributes").addEventListener("click", this.setSubsAttributes);
    document.getElementById("check-intro-eligibility").addEventListener("click", this.checkIntroEligibility);
    document.getElementById("is-anonymous").addEventListener("click", this.isAnonymous);
    document.getElementById("invalidate-customer-info-cache").addEventListener("click", this.invalidateCustomerInfoCache)
    document.getElementById("toggle-simulates-ask-to-buy-in-sandbox").addEventListener("click", this.toggleSimulatesAskToBuyInSandbox)
    document.getElementById("present-code-redemption-sheet").addEventListener("click", this.presentCodeRedemptionSheet)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent("deviceready");
    this.setupShouldPurchasePromoProductListener();
    Purchases.setPhoneNumber("12345678");
    Purchases.setDisplayName("Garfield");
    Purchases.setAttributes({ "favorite_cat": "garfield" });
    Purchases.setEmail("garfield@revenuecat.com");
  },

  setupShouldPurchasePromoProductListener: function() {
    Purchases.addShouldPurchasePromoProductListener((makeDeferredPurchase) => {
      console.log("This codes executes right before making the purchase");
      makeDeferredPurchase();
      console.log("This codes executes right after making the purchase");
    });
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector(".listening");
    var receivedElement = parentElement.querySelector(".received");

    listeningElement.setAttribute("style", "display:none;");
    receivedElement.setAttribute("style", "display:block;");

    console.log("Received Event: " + id);
    console.log("---------");
    Purchases.setDebugLogsEnabled(true);
    Purchases.configure("api_key", () => {
      initializePurchasesSDK();
    });
  },
  
  getOfferings: function() { 
    Purchases.getOfferings(
      offerings => {
        setStatusLabelText(offerings);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  getProducts: function() {
    Purchases.getOfferings(
      offerings => {
        var productIdentifiers = [];
        for (const [key, offering] of Object.entries(offerings.all)) {
          offering.availablePackages.forEach(package => {
            productIdentifiers.push(package.product.identifier);
          });
        }
        
        Purchases.getProducts(
          productIdentifiers,
          products => {
            setStatusLabelText(products);
          },
          error => {
            setStatusLabelText(error);
          }
        );
      },
      error => {
        setStatusLabelText(error);
      }
    );

  },

  getPackages: function() {
    Purchases.getPackages(
      packages => {
        setStatusLabelText(packages);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  getCustomerInfo: function() {
    Purchases.getCustomerInfo(
      customerInfo => {
        setStatusLabelText(customerInfo);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  loginRandom: function() {
    Purchases.logIn(
      "random:" + self.crypto.randomUUID(),
      info => {
        setStatusLabelText(info);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  loginKnown: function() {
    Purchases.logIn(
      "test",
      info => {
        setStatusLabelText(info);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  logOut: function() {
    Purchases.logOut(
      info => {
        setStatusLabelText(info);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  syncPurchases: function() {
    Purchases.syncPurchases();
    setStatusLabelText("Sync Purchases called. This method does not have a callback.");
  },

  restorePurchases: function() {
    Purchases.restorePurchases(
      info => {
        setStatusLabelText(info);
      },
      error => {
        setStatusLabelText(error);
      }
    )
  },

  canMakePayments: function() {
    Purchases.canMakePayments(
      info => {
        setStatusLabelText(info);
      },
      error => {
        setStatusLabelText(error);
      }
    )
  },

  setSubsAttributes: function() {
    Purchases.setPhoneNumber("12345678");
    Purchases.setDisplayName("Garfield");
    Purchases.setAttributes({ "favorite_cat": "garfield" });
    Purchases.setEmail("garfield@revenuecat.com");  
    Purchases.setAdjustID("AdjustID");
    Purchases.setAppsflyerID("AppsflyerID");
    Purchases.setFBAnonymousID("FBAnonymousID");
    Purchases.setMparticleID("MparticleID");
    Purchases.setOnesignalID("OnesignalID");
    Purchases.setAirshipChannelID("AirshipChannelID");
    Purchases.setFirebaseAppInstanceID("FirebaseAppInstanceID");
    Purchases.setMixpanelDistinctID("MixpanelDistinctID");
    Purchases.setCleverTapID("CleverTapID");
    Purchases.setMediaSource("MediaSource");
    Purchases.setCampaign("Campaign");
    Purchases.setAdGroup("AdGroup");
    Purchases.setAd("Ad");
    Purchases.setKeyword("Keyword");
    Purchases.setCreative("Creative");
    Purchases.collectDeviceIdentifiers();
    setStatusLabelText("subscriber attributes set");
  },

  checkIntroEligibility: function() {
    Purchases.getOfferings(
      offerings => {
        var productIdentifiers = [];
        for (const [key, offering] of Object.entries(offerings.all)) {
          offering.availablePackages.forEach(package => {
            productIdentifiers.push(package.product.identifier);
          });
        }
        
        Purchases.checkTrialOrIntroductoryPriceEligibility(
          productIdentifiers,
          info => {
            setStatusLabelText(info);
          }
        );
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },
  
  isAnonymous: function() { 
    Purchases.isAnonymous(
      isAnonymous => {
        setStatusLabelText(isAnonymous);
      }
    );
  },
  
  invalidateCustomerInfoCache: function() {
    setStatusLabelText("invalidating customer info cache");
    Purchases.invalidateCustomerInfoCache();
  },
  
  simulatesAskToBuyInSandbox: false,
  toggleSimulatesAskToBuyInSandbox: function() {
    this.simulatesAskToBuyInSandbox = !this.simulatesAskToBuyInSandbox;
    setStatusLabelText("setting simulatesAskToBuyInSandbox to " + this.simulatesAskToBuyInSandbox);
    Purchases.setSimulatesAskToBuyInSandbox(simulatesAskToBuyInSandbox);
  },
  
  presentCodeRedemptionSheet: function() {
    setStatusLabelText("presenting code redemption sheet");
    Purchases.presentCodeRedemptionSheet();
  },

};

initializePurchasesSDK = function() {
  this.setupShouldPurchasePromoProductListener();
  Purchases.enableAdServicesAttributionTokenCollection();
  this.setupPurchaseButtons();
}

setupShouldPurchasePromoProductListener = function() {
  Purchases.addShouldPurchasePromoProductListener((makeDeferredPurchase) => {
    console.log("This codes executes right before making the purchase");
    makeDeferredPurchase();
    console.log("This codes executes right after making the purchase");
  });
},

setupPurchaseButtons = function () { 
  var prototypeButton = document.getElementById("prototype-button");
  Purchases.getOfferings(
    offerings => {
      const availablePackages = offerings.current.availablePackages;
      availablePackages.forEach(package => {
        var purchaseButton = prototypeButton.cloneNode(true);
        purchaseButton.hidden = false;
        purchaseButton.id = package.product.identifier;
        purchaseButton.textContent = "Buy " + package.identifier + package.product.priceString;
        purchaseButton.style = "";
        prototypeButton.parentNode.appendChild(purchaseButton);
        purchaseButton.addEventListener("click", function() {
          Purchases.purchasePackage(package,
            customerInfo => { 
              setStatusLabelText(customerInfo);
            },
            error => {
              setStatusLabelText(error);
            });
        });
      });
    },
    error => {
      setStatusLabelText(error);
    }
  );
}

setStatusLabelText = function(myObject) { 
  var objectString = JSON.stringify(myObject, null, 4);
  console.log(objectString);

  document.getElementById("status").innerText = objectString;
}

app.initialize();
