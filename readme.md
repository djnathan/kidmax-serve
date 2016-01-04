# kidmax Serve
Volunteer management system for kidmax

## Setup

### Prerequisites
Be sure to have [node.js](https://nodejs.org/en/download/) and the [Windows Git CLI](https://git-scm.com/downloads) installed on your machine.

Also install bower via npm.
```
npm install -g bower
```

### Install components
Modify package.json and bower.json to include any packages that you want to make availalble to your application.

Then open up a command prompt and cd to your project folder.  
Finally, run...
```
npm install
```

### Customize
TODO: Update the images files in the following locations to use your application's icon:
* assets/root
* assets/images
* build/mobile/res

### Mobile
A cordova project is already generated as part of this template.

Once you have a functioning Cordova environment you can add a platform and a default set of plugins by running...
```
cordova platform add android
cordova platform add ios
```

## Build

### Develop
This template includes a configured task runner in Grunt that has a live reload web server set up.

The following command cleans the build folders, builds and pushes all content to the appropriate locations, and fires up a node web server:
```
grunt
```
Once the web server is active, you can continue to modify the files and the subsequent changes will automatically be pushed and the browser refreshed.

To clean and build the wwwroot folder or the mobile\www folder without starting the web server, run the following commands respectively:
```
grunt web
grunt mobile
```

Please note that if you add libraries via bower, they will not be detected automatically.  Simply kill the webserver via Ctrl+C, and restart grunt.

### Mobile
To build for Android, connect your device and run the following commands:
```
grunt mobile
cordova run android --device
```