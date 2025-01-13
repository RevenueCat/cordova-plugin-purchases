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
    document.getElementById("show-paywall").addEventListener("click", this.showPaywall);
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
    document.getElementById("begin-refund-request-active-entitlement").addEventListener("click", this.beginRefundRequestForActiveEntitlement)
    document.getElementById("begin-refund-request-entitlement").addEventListener("click", this.beginRefundRequestForEntitlement)
    document.getElementById("begin-refund-request-product-id").addEventListener("click", this.beginRefundRequestForProduct)
    document.getElementById("show-in-app-messages").addEventListener("click", this.showInAppMessages)
    document.getElementById("record-purchase").addEventListener("click", this.recordPurchase)
    document
      .getElementById("load-and-purchase-product-for-winback-testing")
      .addEventListener("click", this.loadAndPurchaseProductForWinbackTesting);
    document
      .getElementById("fetch-and-purchase-eligible-winback-offers-for-product")
      .addEventListener(
        "click",
        this.fetchAndPurchaseEligibleWinbackOffersForProduct
      );
    document
      .getElementById("load-and-purchase-package-for-winback-testing")
      .addEventListener("click", this.loadAndPurchasePackageForWinbackTesting);
    document
      .getElementById("fetch-and-purchase-eligible-winback-offers-for-package")
      .addEventListener(
        "click",
        this.fetchAndPurchaseEligibleWinbackOffersForPackage
      );
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
    Purchases.configureWith({
      apiKey: "api_key",
    });
    initializePurchasesSDK();
  },

  showPaywall: function() {
    Purchases.getOfferings(
      offerings => {

        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          var paywallDiv = document.createElement("div")

          var metadataDiv = document.createElement("div")
          paywallDiv.appendChild(metadataDiv);
          metadataDiv.appendChild(document.createTextNode(JSON.stringify(offerings.current.metadata)));

          var packages = offerings.current.availablePackages;
          packages.forEach((package) => {
            // Packages div
            var packageDiv = document.createElement("div")
            paywallDiv.appendChild(packageDiv)
            packageDiv.classList.add("package")

            // Package info
            var identifierDiv = document.createElement("div")
            packageDiv.appendChild(identifierDiv)
            identifierDiv.appendChild(document.createTextNode(package.product.identifier))
            var priceDiv = document.createElement("div")
            packageDiv.appendChild(priceDiv)
            priceDiv.appendChild(document.createTextNode(package.product.priceString))

            // Buy Package
            var buyPackageButton = document.createElement("button")
            packageDiv.appendChild(buyPackageButton);
            buyPackageButton.textContent = "Buy Package";
            buyPackageButton.id = "package-" + package.identifier;
            buyPackageButton.style = "";
            buyPackageButton.addEventListener("click", function() {
              Purchases.purchasePackage(package,
                customerInfo => {
                  setStatusLabelText(customerInfo);
                },
                error => {
                  setStatusLabelText(error);
                });
            });

            // Buy Product (deprecated)
            var buyProductButton = document.createElement("button")
            packageDiv.appendChild(buyProductButton);
            buyProductButton.textContent = "Buy Product (deprecated)";
            buyPackageButton.id = "product-" + package.product.identifier;
            buyProductButton.style = "";
            buyProductButton.addEventListener("click", function() {
              Purchases.purchaseProduct(package.product.identifier,
                customerInfo => {
                  setStatusLabelText(customerInfo);
                },
                error => {
                  setStatusLabelText(error);
                });
            });

            // Buy Store Product
            var buyProductButton = document.createElement("button")
            packageDiv.appendChild(buyProductButton);
            buyProductButton.textContent = "Buy Store Product";
            buyPackageButton.id = "product-" + package.product.identifier;
            buyProductButton.style = "";
            buyProductButton.addEventListener("click", function() {
              Purchases.purchaseStoreProduct(package.product,
                customerInfo => {
                  setStatusLabelText(customerInfo);
                },
                error => {
                  setStatusLabelText(error);
                });
            });

            // Buy Subscription Options
            var options = package.product.subscriptionOptions || [];
            options.forEach((option) => {
              var pricePhases = option.pricingPhases.map((phase) => {
                return phase.price.formatted + " for " + phase.billingPeriod.iso8601;
              }).join(" > ");

              // Buy Subscription Option
              var buyOptionButton = document.createElement("button")
              packageDiv.appendChild(buyOptionButton);
              buyOptionButton.innerHTML = "<div style=\"text-align: left;\"><div>Buy " + option.id + "</div><div>" + pricePhases + "</div></div>";
              buyPackageButton.id = "option-" + option.id;
              buyOptionButton.style = "";
              buyOptionButton.addEventListener("click", function() {
                Purchases.purchaseSubscriptionOption(option,
                  customerInfo => {
                    setStatusLabelText(customerInfo);
                  },
                  error => {
                    setStatusLabelText(error);
                  });
              });
            });
          });

          document.getElementById("paywall").innerHTML = "";
          document.getElementById("paywall").appendChild(paywallDiv);
        } else {
          setStatusLabelText("No current");
        }
      },
      error => {
        setStatusLabelText(error);
      }
    );
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

  beginRefundRequestForActiveEntitlement: function() {
    setStatusLabelText("beginning refund request for active entitlement");
    Purchases.beginRefundRequestForActiveEntitlement(refundRequestStatus => {
      setStatusLabelText(Purchases.REFUND_REQUEST_STATUS[refundRequestStatus]);
    }, error => {
      setStatusLabelText(error);
    });
  },

  beginRefundRequestForEntitlement: function() {
    setStatusLabelText("beginning refund request by entitlement id");
    Purchases.getCustomerInfo(
      customerInfo => {
        if (!customerInfo.entitlements.active) {
          setStatusLabelText("customer info doesn't have active entitlements");
          return;
        }
        let activeEntitlement = Object.values(customerInfo.entitlements.active)[0];
        setStatusLabelText("beginning refund request for entitlement id: " +
          activeEntitlement.identifier);
        Purchases.beginRefundRequestForEntitlement(activeEntitlement, refundRequestStatus => {
          setStatusLabelText(Purchases.REFUND_REQUEST_STATUS[refundRequestStatus]);
        }, error => {
          setStatusLabelText(error);
        });
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  beginRefundRequestForProduct: function() {
    setStatusLabelText("beginning refund request by product id");
    Purchases.getCustomerInfo(
      customerInfo => {
        if (!customerInfo.entitlements.active) {
          setStatusLabelText("customer info doesn't have active entitlements");
          return;
        }
        let activeProductIdentifier = Object.values(customerInfo.entitlements.active)[0].productIdentifier;
        Purchases.getProducts([activeProductIdentifier], products => {
          if (!products) {
            setStatusLabelText("couldn't get products");
            return;
          }
          setStatusLabelText("beginning refund request by product id: " + products[0].identifier);
          Purchases.beginRefundRequestForProduct(products[0], refundRequestStatus => {
            setStatusLabelText(Purchases.REFUND_REQUEST_STATUS[refundRequestStatus]);
          }, error => {
            setStatusLabelText(error);
          });
        });
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  showInAppMessages: function () {
    setStatusLabelText("beginning showInAppMessages");
    Purchases.showInAppMessages();
    setStatusLabelText("finished showInAppMessages");
  },

  recordPurchase: function () {
    setStatusLabelText("beginning recordPurchase");
    Purchases.recordPurchase(
      "test_product_id",
      transaction => {
        setStatusLabelText(transaction);
      },
      error => {
        setStatusLabelText(error);
      }
    );
  },

  loadAndPurchaseProductForWinbackTesting: function() {
    Purchases.getProducts(["com.revenuecat.monthly_4.99"], products => {
      if (products && products.length > 0) {
        const product = products[0];
        Purchases.purchaseProduct(
          product.identifier,
          customerInfo => {
            setStatusLabelText(customerInfo);
          },
          error => {
            setStatusLabelText(error);
          }
        );
      } else {
        setStatusLabelText("No product found");
      }
    });
  },

  fetchAndPurchaseEligibleWinbackOffersForProduct: function() {
    setStatusLabelText(
      "fetching and purchasing eligible winback offers for product"
    );
    Purchases.getProducts(
      ["com.revenuecat.monthly_4.99"],
      products => {
        if (products && products.length > 0) {
          const product = products[0];
          setStatusLabelText(
            "About to fetch eligible winback offers for product"
          );
          Purchases.getEligibleWinBackOffersForProduct(
            product,
            winBackOffers => {
              setStatusLabelText(
                "Winback offers: " + JSON.stringify(winBackOffers)
              );

              if (winBackOffers && winBackOffers.length > 0) {
                const winBackOffer = winBackOffers[0];
                setStatusLabelText(
                  "About to purchase product with winback offer"
                );
                Purchases.purchaseProductWithWinBackOffer(
                  product,
                  winBackOffer,
                  ({ productIdentifier, customerInfo }) => {
                     setStatusLabelText({ productIdentifier, customerInfo });
                  },
                  ({ error, userCancelled }) => {
                    setStatusLabelText({ 'error': error, 'userCancelled': userCancelled });
                  }
                );
              } else {
                setStatusLabelText("No eligible winback offers found");
              }
            },
            error => {
              setStatusLabelText(
                "Error getting winback offers: " + JSON.stringify(error)
              );
            }
          );
        } else {
          setStatusLabelText("No product found");
        }
      },
      error => {
        setStatusLabelText("Error getting products: " + JSON.stringify(error));
      }
    );
  },

  loadAndPurchasePackageForWinbackTesting: function() {
    setStatusLabelText("Loading package for winback testing");
    Purchases.getOfferings(
      offerings => {
        setStatusLabelText("Got offerings: " + JSON.stringify(offerings));
        if (
          offerings &&
          offerings.current &&
          offerings.current.availablePackages
        ) {
          const package = offerings.current.availablePackages.find(
            pkg =>
              pkg.product.identifier ===
              "com.revenuecat.monthly_4.99.1_week_intro"
          );
          if (package) {
            setStatusLabelText(
              "Found package with product: " + package.product.identifier
            );

            Purchases.purchasePackage(
              package,
              ({ productIdentifier, customerInfo }) => {
                setStatusLabelText({ productIdentifier, customerInfo });
              },
              ({ error, userCancelled }) => {
                setStatusLabelText({ 'error': error, 'userCancelled': userCancelled });
              }
            );
          } else {
            setStatusLabelText(
              "Could not find package with product com.revenuecat.monthly_4.99.1_week_intro"
            );
          }
        } else {
          setStatusLabelText("No packages available in current offering");
        }
      },
      error => {
        setStatusLabelText("Error getting offerings: " + JSON.stringify(error));
      }
    );
  },

  fetchAndPurchaseEligibleWinbackOffersForPackage: function() {
    setStatusLabelText("Loading package for winback testing");
    Purchases.getOfferings(
      offerings => {
        setStatusLabelText("Got offerings: " + JSON.stringify(offerings));
        if (
          offerings &&
          offerings.current &&
          offerings.current.availablePackages
        ) {
          const package = offerings.current.availablePackages.find(
            pkg =>
              pkg.product.identifier ===
              "com.revenuecat.monthly_4.99.1_week_intro"
          );
          if (package) {
            setStatusLabelText(
              "Found package with product: " + package.product.identifier
            );

            Purchases.getEligibleWinBackOffersForPackage(
              package,
              winBackOffers => {
                setStatusLabelText("Got win back offers: " + JSON.stringify(winBackOffers));
                if (winBackOffers && winBackOffers.length > 0) {
                  const winBackOffer = winBackOffers[0];
                  Purchases.purchasePackageWithWinBackOffer(
                    package,
                    winBackOffer,
                    ({ productIdentifier, customerInfo }) => {
                      setStatusLabelText({ productIdentifier, customerInfo });
                    },
                    ({ error, userCancelled }) => {
                      setStatusLabelText({ error, userCancelled });
                    }
                  );
                } else {
                  setStatusLabelText("No win back offers available");
                }
              },
              error => {
                setStatusLabelText("Error getting win back offers: " + JSON.stringify(error));
              }
            );
          } else {
            setStatusLabelText(
              "Could not find package with product com.revenuecat.monthly_4.99.1_week_intro"
            );
          }
        } else {
          setStatusLabelText("No packages available in current offering");
        }
      },
      error => {
        setStatusLabelText("Error getting offerings: " + JSON.stringify(error));
      }
    );
  },
};

initializePurchasesSDK = function() {
  this.setupShouldPurchasePromoProductListener();
  Purchases.enableAdServicesAttributionTokenCollection();
  this.setupPurchaseButtons();
  window.addEventListener("onCustomerInfoUpdated", (info) => {
    console.log("customer info updated!");
    console.log(info);
  });
}

setupShouldPurchasePromoProductListener = function() {
  Purchases.addShouldPurchasePromoProductListener((makeDeferredPurchase) => {
    console.log("This codes executes right before making the purchase");
    makeDeferredPurchase();
    console.log("This codes executes right after making the purchase");
  });
}

setupPurchaseButtons = function () {
  const prototypeButton = document.getElementById("prototype-button");
  const parentNode = prototypeButton.parentNode;
  Purchases.getOfferings(
    offerings => {
      const availablePackages = offerings.current.availablePackages;
      availablePackages.forEach(package => {
        var purchaseButton = prototypeButton.cloneNode(true);
        purchaseButton.hidden = false;
        purchaseButton.id = package.product.identifier;
        purchaseButton.textContent = "Buy " + package.identifier + " " + package.product.priceString;
        purchaseButton.style = "";
        parentNode.appendChild(purchaseButton);
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

