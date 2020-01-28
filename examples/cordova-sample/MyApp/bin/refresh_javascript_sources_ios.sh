# in case this script is run from another directory, cd into the directory of the script
SCRIPT_DIRECTORY="$(dirname "$(realpath "$0")")"

# run the transpiling step
cd $SCRIPT_DIRECTORY/../plugins/cordova-plugin-purchases
npm run build

# delete the file that stores the current version of the plugins so that cordova is forced to refresh
rm $SRCROOT/ios.json

# copy other js files through cordova
cd $SRCROOT/../../
cordova prepare ios
