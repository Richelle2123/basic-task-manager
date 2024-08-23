import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDciVKQcfPigveeNFBVvmD2d_aUTwPnqEc",
    authDomain: "task-management-a9d29.firebaseapp.com",
    projectId: "task-management-a9d29",
    storageBucket: "task-management-a9d29.appspot.com",
    messagingSenderId: "168922030100",
    appId: "1:168922030100:web:ecbef823c6e16d97444701",
    measurementId: "G-XLHB7SQJPM"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
