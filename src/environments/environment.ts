// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://api.wolframalpha.com/',
  version: 'v2/query',
  input: 'input=',
  appid: 'appid=',
  api_key:'Y28G28-V7Y7YQU724',
  json: '&output=json',
  firebase: {
    apiKey: "AIzaSyA01hanWhzV7CVrE_29K4gG3k47EmO3QQc",
    authDomain: "metodos-numericos-6384d.firebaseapp.com",
    databaseURL: "https://metodos-numericos-6384d.firebaseio.com",
    projectId: "metodos-numericos-6384d",
    storageBucket: "metodos-numericos-6384d.appspot.com",
    messagingSenderId: "657920474537"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
