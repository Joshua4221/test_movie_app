// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAdhGGbzYuJeu7AL5tsy0lfBaJZbT2wquU',
  authDomain: 'test-app-cbefd.firebaseapp.com',
  projectId: 'test-app-cbefd',
  storageBucket: 'test-app-cbefd.firebasestorage.app',
  messagingSenderId: '839650303120',
  appId: '1:839650303120:web:0ea830bf94b979e6d68c15',
  measurementId: 'G-ZB25M0V1ZN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
