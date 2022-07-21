#! /bin/sh

START_TIME=`date +%s`
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

if [ $# -eq 2 ]
then
  PLATFORM=$2
else
  PLATFORM="all"
fi

common_configure() {
  if [ $PLATFORM == "ios" ]; then
    cordova platform add ios
  elif [ $PLATFORM == "android" ]; then
    cordova platform add android
  else
    cordova platform add ios
    cordova platform add android
  fi

  cordova plugin remove cordova-plugin-purchases
  cordova plugin add ../../../ --link --save

  cd ../../../
  npm install

  if [[ $PLATFORM == "ios" || $PLATFORM == "all" ]]; then
    cd $OG_DIR
    SK_CONFIG_SCRIPT_PATH=bin/sk_config_setup.rb
    echo "Running ${SK_CONFIG_SCRIPT_PATH}"
    bundle exec ruby $SK_CONFIG_SCRIPT_PATH
  fi

}

configure() {
  echo "Configuring for platform:" $PLATFORM

  cordova platform remove ios
  cordova platform remove android

  common_configure
}

configure

END_TIME=`date +%s`
RUNTIME=$((END_TIME-START_TIME))
echo "Setup took" $RUNTIME "seconds"
