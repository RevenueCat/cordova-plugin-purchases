#! /bin/sh
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
cordova plugin add ../../../../cordova-plugin-purchases --link --save

cd ../../../../cordova-plugin-purchases
npm install
