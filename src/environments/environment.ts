// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/',
  firebaseConfig: {
    apiKey: "AIzaSyDuwg4uzVLBKXGznBoeoxQ25yjy60wNsyQ",
    authDomain: "test-firebase-329d1.firebaseapp.com",
    databaseURL: "https://test-firebase-329d1-default-rtdb.firebaseio.com",
    projectId: "test-firebase-329d1",
    storageBucket: "test-firebase-329d1.appspot.com",
    messagingSenderId: "639022186555",
    appId: "1:639022186555:web:5980976e2f28742a621c1e",
    measurementId: "G-0Q7Y5D2GZP"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
