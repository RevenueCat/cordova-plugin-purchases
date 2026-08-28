#### setup instructions

1. cd into the root of the example project, then:

```bash

gem install bundler
````

2. Prepare workspace with API key and StoreKit config file

Pass `ios`, `android`, or `all`, to control which projects get configured, saving you a few seconds of time if you need to `setup.sh` a lot.
Alternatively, you can leave this arg off and it will default to `all`

```bash
sh bin/setup.sh <your_api_key> [ios|android|all]
```

3. Coreutils

Use homebrew to install coreutils

```bash
brew install coreutils
```

4. iOS

Edit the project settings in Xcode: 
Add a Run Script Build Phase, name it "Refresh Javascript Sources"
Add the following code: 

```bash
sh $PROJECT_DIR/../../bin/refresh_javascript_sources_ios.sh
```

You're ready to go! 

#### when making changes: 

##### In Swift code:

You can just make the edits straight from Xcode or AppCode, then build and you're good. 

#### In Javascript code, but not the javascript code for the plugin: 

You can just make the edits straight from Xcode or AppCode, then build and you're good. 

#### In the plugin's javascript code:

Unfortunately, the only way to reflect the changes at the time of this writing seems to be to reinstall the plugin, by running `sh bin/setup.sh <your_api_key> ios` again.

The build step will transpile the typescript files into js, however. So you can make the updates from Xcode, but you'll have to reinstall the plugin after any changes.

Reinstalling has to go through `setup.sh`: it packs the plugin into a tarball outside the repo first, and `cordova plugin add ../../../` on its own would have cordova copy the repo into itself.


#### Troubleshooting iOS

If the setup doesn't work, the Swift package cache may be stale. Open `platforms/ios/App.xcworkspace` and use File > Packages > Reset Package Caches, or run `cordova platform rm ios && cordova platform add ios` to start from scratch.
