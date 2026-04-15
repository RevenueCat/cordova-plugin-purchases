// ---------------------------------------------------------------------------
// Screen: Purchase through paywall
//
// cordova-plugin-purchases does not have native paywall APIs, so this screen
// fetches offerings and performs a direct purchase via Purchases.purchasePackage().
// ---------------------------------------------------------------------------

var _currentPackage = null;

function showPurchaseThroughPaywall() {
    _currentPackage = null;

    document.getElementById('app').innerHTML =
        '<p id="entitlements-label">Loading...</p>' +
        '<button id="purchase-btn" onclick="_doPurchase()">Loading offerings...</button>' +
        '<button onclick="showTestCases()" style="margin-top:16px">Back</button>';

    if (typeof Purchases === 'undefined') {
        document.getElementById('entitlements-label').textContent = 'Entitlements: none';
        showError('SDK not loaded');
        return;
    }

    Purchases.getCustomerInfo(
        function(info) {
            var hasPro = info.entitlements.active && info.entitlements.active['pro'] !== undefined;
            document.getElementById('entitlements-label').textContent =
                'Entitlements: ' + (hasPro ? 'pro' : 'none');
        },
        function() {
            document.getElementById('entitlements-label').textContent = 'Entitlements: none';
        }
    );

    Purchases.getOfferings(
        function(offerings) {
            if (offerings.current && offerings.current.availablePackages.length > 0) {
                _currentPackage = offerings.current.availablePackages[0];
                var btn = document.getElementById('purchase-btn');
                if (btn) btn.textContent = 'Purchase';
            } else {
                showError('No packages in current offering');
            }
        },
        function(error) {
            showError('Offerings error: ' + (error.message || String(error)));
        }
    );
}

function _doPurchase() {
    if (!_currentPackage) {
        showError('No package available');
        return;
    }
    Purchases.purchasePackage(
        _currentPackage,
        function(productIdentifier, customerInfo) {
            var hasPro = customerInfo.entitlements.active && customerInfo.entitlements.active['pro'] !== undefined;
            document.getElementById('entitlements-label').textContent =
                'Entitlements: ' + (hasPro ? 'pro' : 'none');
        },
        function(errorInfo) {
            if (!errorInfo.userCancelled) {
                showError('Purchase error: ' + (errorInfo.message || 'failed'));
            }
        }
    );
}
