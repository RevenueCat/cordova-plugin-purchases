source "https://rubygems.org"

gem 'xcodeproj'
gem 'fastlane'
gem 'danger'
# Used by the plugin-installation-test CI job so `cordova plugin add` can run
# `pod install` without relying on Homebrew (whose interactive prompt hangs CI).
gem 'cocoapods', '>= 1.14.0'

eval_gemfile("fastlane/Pluginfile")
