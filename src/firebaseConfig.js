// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL13MIeDAmjnKRIoU5SrmvG5utoK0meug", // Make sure this is correct
  authDomain: "coursesystem-4cbca.firebaseapp.com",
  projectId: "coursesystem-4cbca",
  storageBucket: "coursesystem-4cbca.appspot.com",
  messagingSenderId: "793409794092",
  appId: "1:793409794092:web:your-app-id-here", // Update with actual app ID
  measurementId: "your-measurement-id-here" // If applicable
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Facebook Auth Provider setup
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  'display': 'popup'
});

// Google Auth Provider setup (if needed)
const googleProvider = new GoogleAuthProvider();

// Exporting for use in your login component
export { auth, facebookProvider, googleProvider };
