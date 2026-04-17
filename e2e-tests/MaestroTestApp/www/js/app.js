// ---------------------------------------------------------------------------
// Test case registry
// To add a new test case:
//   1. Create www/js/screens/your_test_case.js (see purchase_through_paywall.js)
//   2. Add a <script> tag for it in index.html
//   3. Add an entry to TEST_CASES below
// ---------------------------------------------------------------------------

var TEST_CASES = [
    { title: 'Purchase through paywall', flowKey: 'purchase_through_paywall', show: showPurchaseThroughPaywall }
];

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

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
        var match = testFlow ? TEST_CASES.filter(function(tc) { return tc.flowKey === testFlow; })[0] : null;
        if (match) {
            match.show();
        } else {
            showTestCases();
        }
    }, function() {
        showTestCases();
    });
}, false);

// ---------------------------------------------------------------------------
// Test Cases list screen
// ---------------------------------------------------------------------------

function showTestCases() {
    var app = document.getElementById('app');
    app.innerHTML = '<h1>Test Cases</h1>';
    TEST_CASES.forEach(function(tc) {
        var btn = document.createElement('button');
        btn.textContent = tc.title;
        btn.onclick = tc.show;
        app.appendChild(btn);
    });
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

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
