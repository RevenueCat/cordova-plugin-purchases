document.addEventListener('deviceready', function() {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure('MAESTRO_TESTS_REVENUECAT_API_KEY');
    showTestCases();
}, false);

function showTestCases() {
    document.getElementById('app').innerHTML =
        '<h1>Test Cases</h1>' +
        '<button onclick="showPurchaseScreen()">Purchase through paywall</button>';
}

function showPurchaseScreen() {
    document.getElementById('app').innerHTML =
        '<p id="entitlements-label">Entitlements: none</p>' +
        '<button id="paywall-btn" onclick="presentPaywall()">Present Paywall</button>' +
        '<button onclick="showTestCases()">Back</button>';

    window.addEventListener('onCustomerInfoUpdated', function(info) {
        var hasPro = info.entitlements.active && info.entitlements.active['pro'] !== undefined;
        var label = document.getElementById('entitlements-label');
        if (label) {
            label.textContent = 'Entitlements: ' + (hasPro ? 'pro' : 'none');
        }
    });

    Purchases.getCustomerInfo(
        function(info) {
            var hasPro = info.entitlements.active && info.entitlements.active['pro'] !== undefined;
            var label = document.getElementById('entitlements-label');
            if (label) {
                label.textContent = 'Entitlements: ' + (hasPro ? 'pro' : 'none');
            }
        },
        function(error) {
            console.error('Error getting customer info:', error);
        }
    );
}

function presentPaywall() {
    Purchases.getOfferings(
        function(offerings) {
            if (offerings.current && offerings.current.availablePackages.length > 0) {
                var pkg = offerings.current.availablePackages[0];
                Purchases.purchasePackage(
                    pkg,
                    function(productIdentifier, customerInfo) {
                        var hasPro = customerInfo.entitlements.active && customerInfo.entitlements.active['pro'] !== undefined;
                        var label = document.getElementById('entitlements-label');
                        if (label) {
                            label.textContent = 'Entitlements: ' + (hasPro ? 'pro' : 'none');
                        }
                    },
                    function(errorInfo) {
                        if (!errorInfo.userCancelled) {
                            console.error('Purchase error:', errorInfo.error);
                        }
                    }
                );
            }
        },
        function(error) {
            console.error('Error getting offerings:', error);
        }
    );
}
