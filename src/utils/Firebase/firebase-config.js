// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBdFVrj7jed9XFf1htfBtec3GMP6kzytUU',
  authDomain: 'hidden-objects-game-86b65.firebaseapp.com',
  projectId: 'hidden-objects-game-86b65',
  storageBucket: 'hidden-objects-game-86b65.appspot.com',
  messagingSenderId: '193529652516',
  appId: '1:193529652516:web:c9732c79498c74cafdbfb1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);

// collection reference
const colRef = collection(db, 'items');

// queries
