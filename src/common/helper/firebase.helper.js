import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCg6UC51mUPrJvop252pCcy5vIFHs6atgc",
  authDomain: "foodorderingapp-d0523.firebaseapp.com",
  projectId: "foodorderingapp-d0523",
  storageBucket: "foodorderingapp-d0523.appspot.com",
  messagingSenderId: "21611617949",
  appId: "1:21611617949:web:5620f85aa6f9feeb27fe74",
  measurementId: "G-XDVR7W8NX8",
};
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
