// ---------------------------------------------------------------------------
// Screen: Purchase through paywall
//
// cordova-plugin-purchases does not have native paywall APIs, so this screen
// fetches offerings and performs a direct purchase via Purchases.purchasePackage().
// ---------------------------------------------------------------------------

function showPurchaseThroughPaywall() {
    var currentPackage = null;

    document.getElementById('app').innerHTML =
        '<p id="entitlements-label">Loading...</p>' +
        '<button id="purchase-btn" disabled>Loading offerings...</button>' +
        '<button id="back-btn" style="margin-top:16px">Back</button>';

    document.getElementById('back-btn').onclick = showTestCases;
    document.getElementById('purchase-btn').onclick = doPurchase;

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
                currentPackage = offerings.current.availablePackages[0];
                var btn = document.getElementById('purchase-btn');
                if (btn) {
                    btn.textContent = 'Purchase';
                    btn.disabled = false;
                }
            } else {
                showError('No packages in current offering');
            }
        },
        function(error) {
            showError('Offerings error: ' + (error.message || String(error)));
        }
    );

    function doPurchase() {
        if (!currentPackage) {
            showError('No package available');
            return;
        }
        Purchases.purchasePackage(
            currentPackage,
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
}
