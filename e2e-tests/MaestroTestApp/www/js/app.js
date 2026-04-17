import { TEST_CASES } from './test_cases.js';
import { showTestCases } from './test_cases_screen.js';

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
        var match = testFlow ? TEST_CASES.find(function(tc) { return tc.flowKey === testFlow; }) : null;
        if (match) {
            match.show({ onBack: showTestCases });
        } else {
            showTestCases();
        }
    }, function() {
        showTestCases();
    });
}, false);
