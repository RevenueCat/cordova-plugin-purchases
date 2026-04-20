import { showTestCases } from './test_cases_screen.js';

document.addEventListener('deviceready', function() {
    try {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
        Purchases.configure('MAESTRO_TESTS_REVENUECAT_API_KEY');
    } catch (e) {
        console.error('SDK init error: ' + e.message);
    }

    showTestCases();
}, false);
