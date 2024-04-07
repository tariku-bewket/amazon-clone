import firebase from 'firebase/compat/app';

//firebase authentication service
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAD6AWsucDag5mYrbUowjMDih3rEoRJtws',
  authDomain: 'clone-53304.firebaseapp.com',
  projectId: 'clone-53304',
  storageBucket: 'clone-53304.appspot.com',
  messagingSenderId: '517460735108',
  appId: '1:517460735108:web:90648c9b6c8d11a00afed1',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = app.firestore();
