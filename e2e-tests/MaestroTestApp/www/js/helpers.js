export function showError(msg) {
    var el = document.getElementById('error-msg');
    if (!el) {
        el = document.createElement('p');
        el.id = 'error-msg';
        el.style.cssText = 'color:red;font-size:12px';
        document.getElementById('app').appendChild(el);
    }
    el.textContent = msg;
}
