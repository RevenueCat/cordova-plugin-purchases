#### setup instructions

1. cd into the root of the example project, then:

```bash

gem install bundler
````

2. Prepare workspace with API key and StoreKit config file

```bash
sh bin/setup.sh <your_api_key>
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

Unfortunately, the only way to reflect the changes at the time of this writing seems to be to remove the plugin and re-add it. 

The build step will transpile the typescript files into js, however. So you can make the updates from Xcode, but you'll have to remove and add the plugin manually after any changes. 


#### Troubleshooting iOS

If the setup doesn't work, it might because the pod spec repo is out of date.
cd into the iOS platform folder `platforms/ios` where `Podfile` lives, and run `pod install --repo-update`
