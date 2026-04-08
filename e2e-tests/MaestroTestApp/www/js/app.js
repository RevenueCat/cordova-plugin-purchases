var currentPackage = null;

var TEST_FLOW_SCREEN_MAP = {
    'purchase_through_paywall': function() { showPurchaseScreen(); }
};

document.addEventListener('deviceready', function() {
    try {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
        Purchases.configure('MAESTRO_TESTS_REVENUECAT_API_KEY');

        window.addEventListener('onCustomerInfoUpdated', function(info) {
            var hasPro = info && info.entitlements && info.entitlements.active &&
                         info.entitlements.active['pro'] !== undefined;
            var label = document.getElementById('entitlements-label');
            if (label) {
                label.textContent = 'Entitlements: ' + (hasPro ? 'pro' : 'none');
            }
        });
    } catch (e) {
        console.error('SDK init error: ' + e.message);
    }

    LaunchArgs.getTestFlow(function(testFlow) {
        var navigateFn = testFlow ? TEST_FLOW_SCREEN_MAP[testFlow] : null;
        if (navigateFn) {
            navigateFn();
        } else {
            showTestCases();
        }
    }, function() {
        showTestCases();
    });
}, false);

setTimeout(function() {
    if (!document.getElementById('app').innerHTML.trim()) {
        showTestCases();
    }
}, 10000);

function showTestCases() {
    document.getElementById('app').innerHTML =
        '<h1>Test Cases</h1>' +
        '<button onclick="showPurchaseScreen()">Purchase through paywall</button>';
}

function showError(msg) {
    var el = document.getElementById('error-msg');
    if (!el) {
        el = document.createElement('p');
        el.id = 'error-msg';
        el.style.cssText = 'color:red;font-size:12px';
        document.getElementById('app').appendChild(el);
    }
    el.textContent = msg;
}

function showPurchaseScreen() {
    document.getElementById('app').innerHTML =
        '<p id="entitlements-label">Loading...</p>' +
        '<button id="purchase-btn" onclick="purchase()">Loading offerings...</button>' +
        '<button onclick="showTestCases()" style="margin-top:16px">Back</button>';

    if (typeof Purchases !== 'undefined') {
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
                    if (btn) btn.textContent = 'Purchase';
                } else {
                    showError('No packages in current offering');
                }
            },
            function(error) {
                showError('Offerings error: ' + (error.message || String(error)));
            }
        );
    } else {
        document.getElementById('entitlements-label').textContent = 'Entitlements: none';
        showError('SDK not loaded');
    }
}

function purchase() {
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
