import { TEST_CASES } from './test_cases.js';

export function showTestCases() {
    var app = document.getElementById('app');
    app.innerHTML = '<h1>Test Cases</h1>';
    TEST_CASES.forEach(function(tc) {
        var btn = document.createElement('button');
        btn.textContent = tc.title;
        btn.onclick = function() { tc.show({ onBack: showTestCases }); };
        app.appendChild(btn);
    });
}
