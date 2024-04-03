import admin from "firebase-admin";
// var serviceAccount = require("../../../firebase-adminsdk.json");
var serviceAccount = require("../../../pc-api-7260691470752753621-857-firebase-adminsdk-jjj1u-4042a219ed.json");


export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://sample-project-e1a84.firebaseio.com"
});
