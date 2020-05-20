import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAiFra3hmMEore7QNZdZSUG0h3q3NUKg4I",
    authDomain: "meetnewfriends-6e495.firebaseapp.com",
    databaseURL: "https://meetnewfriends-6e495.firebaseio.com",
    projectId: "meetnewfriends-6e495",
    storageBucket: "meetnewfriends-6e495.appspot.com",
    messagingSenderId: "34155896062",
    appId: "1:34155896062:web:36d0f8b4d5ca94abc899af",
    measurementId: "G-WC91Q8GSP0",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {firebase, storage};
