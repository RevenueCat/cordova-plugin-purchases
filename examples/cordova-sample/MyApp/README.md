#### setup instructions

1. run 

```bash
sh bin/setup.sh
```

2. iOS

Edit the project settings in Xcode: 
Add a Run Script Build Phase, name it "Refresh Javascript Sources"
Add the following code: 

```bash
sh ../../../bin/refresh_javascript_sources_ios.sh
```
