import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBquL_5DfaXss5-lxNQW8rTj4sSQyaEffU",
    authDomain: "codespear-25a05.firebaseapp.com",
    projectId: "codespear-25a05",
    storageBucket: "codespear-25a05.appspot.com",
    messagingSenderId: "283517529309",
    appId: "1:283517529309:web:d2ac99f9cca312feca3f34",
    measurementId: "G-01FVTR6DBH"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);