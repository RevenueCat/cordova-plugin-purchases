// Single registration point for every E2E test case.
// To add a new test case:
//   1. Create www/js/screens/your_test_case.js that `export`s a `show*` function.
//   2. Add an entry to TEST_CASES below (import + one object).
// Mirrors the pattern used by purchases-flutter (lib/test_cases.dart).

import { showPurchaseThroughPaywall } from './screens/purchase_through_paywall.js';
import { showCustomerInfoOnRelaunch } from './screens/customer_info_on_relaunch.js';

export const TEST_CASES = [
    { title: 'Purchase through paywall', flowKey: 'purchase_through_paywall', show: showPurchaseThroughPaywall },
    { title: 'Customer info on relaunch', flowKey: 'customer_info_on_relaunch', show: showCustomerInfoOnRelaunch }
];
