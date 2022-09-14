// IMPORTING STUFF
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyC4k8IMstSPZgJ6HY70g4JQGv2qbEFWEeY",
    authDomain: "nosebook-bef30.firebaseapp.com",
    projectId: "nosebook-bef30",
    storageBucket: "nosebook-bef30.appspot.com",
    messagingSenderId: "773070583591",
    appId: "1:773070583591:web:b31b0b6203b2931383db02"
};

// INITIALIZING FIREBASE
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)