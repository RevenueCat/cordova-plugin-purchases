# in case this script is run from another directory, cd into the directory of the script
SCRIPT_DIRECTORY="$(dirname "$(realpath "$0")")"

# run the transpiling step
cd $SCRIPT_DIRECTORY/../plugins/cordova-plugin-purchases
npm run build

# copy other js files through cordova
cd $SRCROOT/../../
cordova prepare ios

# copy the plugin javascript file, since cordova prepare misses it
cd $SCRIPT_DIRECTORY/../plugins/cordova-plugin-purchases
cp www/plugin.js $SRCROOT/www/plugins/cordova-plugin-purchases/www/plugin.js
