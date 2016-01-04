module.exports = function(context) {
  // make sure android or ios platform is part of build 
  if (context.opts.platforms.indexOf('android') < 0 && context.opts.platforms.indexOf('ios') < 0) {
    return;
  }
  
  var exec = context.requireCordovaModule('child_process').execSync,
      path = context.requireCordovaModule('path'),
      deferral = context.requireCordovaModule('q').defer();
        
  var plugins = require('../plugins.json');

  console.log('Platform add detected...');
  console.log('Installing all plugins identified in package.json...');
  plugins.common = plugins.common || [];
  plugins.common.forEach(function (plugin) {
    console.log('Beginning installation of ' + plugin);
    var result = exec('cordova plugin add ' + plugin);
    process.stdout.write(result);
    console.log('Plugin installation for ' + plugin + ' has ended.');
  });

  if (context.opts.platforms.indexOf('android') >= 0) {
    console.log('Installing all plugins specifically related to Android ...');
    plugins.androidOnly = plugins.androidOnly || [];
    plugins.androidOnly.forEach(function (plugin) {
      console.log('Beginning installation of ' + plugin);
      var result = exec('cordova plugin add ' + plugin);
      process.stdout.write(result);
      console.log('Plugin installation for ' + plugin + ' has ended.');
    });
  }

  if (context.opts.platforms.indexOf('ios') >= 0) {
    console.log('Installing all plugins specifically related to iOS ...');
    plugins.iosOnly = plugins.iosOnly || [];
    plugins.iosOnly.forEach(function (plugin) {
      console.log('Beginning installation of ' + plugin);
      var result = exec('cordova plugin add ' + plugin);
      process.stdout.write(result);
      console.log('Plugin installation for ' + plugin + ' has ended.');
    });
  }
  
  return deferral.promise;
};