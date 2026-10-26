// Created by Antonio Pallares.

import { showError } from '../helpers.js';

var receivedCustomerInfo = false;

window.addEventListener('onCustomerInfoUpdated', function() {
    receivedCustomerInfo = true;
    var label = document.getElementById('customer-info-callback');
    if (label) {
        label.textContent = 'Customer info callback received';
    }
});

export function showCustomerInfoOnRelaunch(opts) {
    document.getElementById('app').innerHTML =
        '<p id="customer-info-callback">' +
        (receivedCustomerInfo ? 'Customer info callback received' : 'Waiting for customer info callback') +
        '</p>' +
        '<p id="customer-info-cache"></p>' +
        '<button id="cache-customer-info">Cache customer info</button>' +
        '<button id="back-btn" style="margin-top:16px">Back</button>';

    document.getElementById('back-btn').onclick = (opts && opts.onBack) || function() {};
    document.getElementById('cache-customer-info').onclick = function() {
        Purchases.getCustomerInfo(
            function() {
                document.getElementById('customer-info-cache').textContent = 'Customer info cached';
            },
            function(error) {
                showError('Customer info error: ' + (error.message || String(error)));
            }
        );
    };
}
