document.addEventListener('deviceready', function() {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure('MAESTRO_TESTS_REVENUECAT_API_KEY');

    window.addEventListener('onCustomerInfoUpdated', function(info) {
        var hasPro = info.entitlements.active && info.entitlements.active['pro'] !== undefined;
        var label = document.getElementById('entitlements-label');
        if (label) {
            label.textContent = 'Entitlements: ' + (hasPro ? 'pro' : 'none');
        }
    });

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
                showPaywallOverlay(pkg);
            }
        },
        function(error) {
            console.error('Error getting offerings:', error);
        }
    );
}

function showPaywallOverlay(pkg) {
    var overlay = document.createElement('div');
    overlay.id = 'paywall-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000';

    var card = document.createElement('div');
    card.style.cssText = 'background:white;padding:30px;border-radius:12px;text-align:center;max-width:300px;width:90%';

    var title = document.createElement('h2');
    title.textContent = 'Premium Access';

    var description = document.createElement('p');
    description.textContent = 'Get access to all features';

    var subscribeBtn = document.createElement('button');
    subscribeBtn.textContent = 'Subscribe';
    subscribeBtn.style.cssText = 'background:#4CAF50;color:white;border:none;padding:15px 40px;border-radius:8px;font-size:18px;cursor:pointer;margin-top:10px';
    subscribeBtn.onclick = function() {
        Purchases.purchasePackage(
            pkg,
            function(productIdentifier, customerInfo) {
                removePaywallOverlay();
                var hasPro = customerInfo.entitlements.active && customerInfo.entitlements.active['pro'] !== undefined;
                var label = document.getElementById('entitlements-label');
                if (label) {
                    label.textContent = 'Entitlements: ' + (hasPro ? 'pro' : 'none');
                }
            },
            function(errorInfo) {
                removePaywallOverlay();
                if (!errorInfo.userCancelled) {
                    console.error('Purchase error:', errorInfo.error);
                }
            }
        );
    };

    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = 'background:transparent;color:#666;border:none;padding:10px 20px;font-size:14px;cursor:pointer;margin-top:10px;display:block;width:100%';
    cancelBtn.onclick = removePaywallOverlay;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(subscribeBtn);
    card.appendChild(cancelBtn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
}

function removePaywallOverlay() {
    var overlay = document.getElementById('paywall-overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}
