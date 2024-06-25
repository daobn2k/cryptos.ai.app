# get started app

1. npm start -> open app with command line expo

# build production ios

Step:
1. npx expo prebuild --clean

2. npx expo run:ios ( with ios simulator)

3. check xcode build

4. eas build --platform ios --auto-submit or eas build --platform ios ( for build not submit)

5. check testflight app

# build production android

same step in build ios 1. 2.

run command line:  eas build --platform android --auto-submit or eas build --platform android ( for build not submit)

# build update code not for package , native module only js code , images ...

eas update --branch "branch_name" --message "message_build"