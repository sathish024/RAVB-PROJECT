// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2HmapR4lcWDcKn1DxK3lgeHd-_yNIQvU",
  authDomain: "ravb-86a28.firebaseapp.com",
  projectId: "ravb-86a28",
  storageBucket: "ravb-86a28.firebasestorage.app",
  messagingSenderId: "244944999075",
  appId: "1:244944999075:web:aeb025484db831b715a516"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPhoneNumber, RecaptchaVerifier };