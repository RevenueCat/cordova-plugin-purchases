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
    document.getElementById("get-packages").addEventListener("click", this.getPackages);
    document.getElementById("get-customer-info").addEventListener("click", this.getCustomerInfo);
    document.getElementById("login-random").addEventListener("click", this.loginRandom);
    document.getElementById("login-known").addEventListener("click", this.loginKnown);
    document.getElementById("log-out").addEventListener("click", this.logOut);
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
    Purchases.configure("api_key");
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
    Purchases.getProducts(
      products => {
        setStatusLabelText(products);
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
      "known",
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
  
};

setStatusLabelText = function(myObject) { 
  var objectString = JSON.stringify(myObject, null, 4);
  console.log(objectString);

  document.getElementById("status").innerText = objectString;
}


initializePurchasesSDK = function() {

  this.setupShouldPurchasePromoProductListener();

  Purchases.enableAdServicesAttributionTokenCollection();
  Purchases.getCustomerInfo(
    info => {
      const isPro = typeof info.entitlements.active.pro_cat !== "undefined";
      console.log("isPro " + JSON.stringify(isPro));
      console.log(JSON.stringify(info));
    },
    error => {
      debugger;
      console.log(JSON.stringify(error));
    }
  );

  Purchases.isAnonymous(
    isAnonymous => {
      console.log("ISANONYMOUS " + isAnonymous);
      }
  );

  Purchases.getOfferings(
    offerings => {
      Purchases.checkTrialOrIntroductoryPriceEligibility([offerings.current.lifetime.product.identifier, "some_offering"],
        map => {
          console.log(map)
        }
      );
      console.log(JSON.stringify(offerings));
    },
    ( error ) => {
      console.log(JSON.stringify(error));
    }
  );

  Purchases.setPhoneNumber("12345678");
  Purchases.setDisplayName("Garfield");
  Purchases.setAttributes({ "favorite_cat": "garfield" });
  Purchases.setEmail("garfield@revenuecat.com");
}

setupShouldPurchasePromoProductListener = function() {
  Purchases.addShouldPurchasePromoProductListener((makeDeferredPurchase) => {
    console.log("This codes executes right before making the purchase");
    makeDeferredPurchase();
    console.log("This codes executes right after making the purchase");
  });
},

app.initialize();
