
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCH8IdOgm_2xV5DqUSj7rLnfxKIBs_CNWc",
  authDomain: "vidssharing-12938.firebaseapp.com",
  databaseURL: "https://vidssharing-12938.firebaseio.com",
  projectId: "vidssharing-12938",
  storageBucket: "vidssharing-12938.appspot.com",
  messagingSenderId: "71112012908",
  appId: "1:71112012908:web:81fb8b1972a1210e845449"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const firebase1 = firebase