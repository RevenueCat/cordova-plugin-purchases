#! /bin/sh

command -v bundle >/dev/null 2>&1 || { echo >&2 "bundler is not installed. run gem install bundler."; exit 1; }
OG_DIR=$PWD

echo "Running bundle install."
bundle install

if [ -z "$1" ]
  then
    echo "No API Key supplied, use setup.sh <API_KEY> (without <>'s) if you wish to setup the project with an api key."
  else
  	API_KEY=$1
	sed -i .bck s/api_key/$1/ www/js/index.js
fi

cordova platform remove ios
cordova platform remove android

cordova platform add ios
cordova platform add android

cordova plugin remove cordova-plugin-purchases
cordova plugin add ../../../ --link --save

cd ../../../
npm install

cd $OG_DIR
SK_CONFIG_SCRIPT_PATH=bin/sk_config_setup.rb
echo "Running ${SK_CONFIG_SCRIPT_PATH}"
bundle exec ruby $SK_CONFIG_SCRIPT_PATH
