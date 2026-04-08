var exec = require('cordova/exec');

module.exports = {
    getTestFlow: function(success, error) {
        exec(success, error, 'LaunchArgs', 'getTestFlow', []);
    }
};
