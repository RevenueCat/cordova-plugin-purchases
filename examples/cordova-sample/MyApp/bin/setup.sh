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

post_android_setup() {
  cd $OG_DIR
  mkdir -p platforms/android/gradle/wrapper
  cd platforms/android/gradle/wrapper
  GRADLE_VERSION=7.3.3
  echo "Setting gradle to ${GRADLE_VERSION}"
  echo "distributionUrl=https\://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip">gradle-wrapper.properties
}

post_ios_setup() {
  cd $OG_DIR
  SK_CONFIG_SCRIPT_PATH=bin/sk_config_setup.rb
  echo "Running ${SK_CONFIG_SCRIPT_PATH}"
  bundle exec ruby $SK_CONFIG_SCRIPT_PATH
}

common_configure() {
  if [ $PLATFORM == "ios" ]; then
    cordova platform add ios
  elif [ $PLATFORM == "android" ]; then
    cordova platform add android@11
  else
    cordova platform add ios
    cordova platform add android@11
  fi

  cordova plugin remove cordova-plugin-purchases
  cordova plugin add ../../../ --link --save

  cd ../../../
  npm install

  if [ $PLATFORM == "ios" ]; then
    post_ios_setup
  elif [ $PLATFORM == "android" ]; then
    post_android_setup
  else
    post_android_setup
    post_ios_setup
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
