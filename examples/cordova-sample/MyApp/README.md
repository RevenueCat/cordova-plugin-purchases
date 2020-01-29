#### setup instructions

1. cd into the root of the example project, then:

```bash
sh bin/setup.sh
```

2. api key

Edit the api key in index.js

```bash
sed -i .bck s/api_key/<your_api_key>/ www/js/index.js
```


2. iOS

Edit the project settings in Xcode: 
Add a Run Script Build Phase, name it "Refresh Javascript Sources"
Add the following code: 

```bash
sh ../../bin/refresh_javascript_sources_ios.sh
```

You're ready to go! 

#### when making changes: 

##### In Obj-C code:

You can just make the edits straight from Xcode or AppCode, then build and you're good. 

#### In Javascript code: 

If you make changes in javascript code, you have to build twice and then run. 
This is beacuse the build phase runs `cordova prepare ios`, which in turn modifies the `.xcproject` file. This file can't be changed before it's time for compilation, because otherwise the build will be cancelled. 
So we run it as the last step of the build, after files have been copied. Thus, the need to run it twice - once to actually refresh the javascript files, and once more to have the new files copied over to the project by cordova. 
