import firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyB66Uo1vHEUXgrJBCrZxbPpObADyjZgEHI",
    authDomain: "cambalache-ffaca.firebaseapp.com",
    projectId: "cambalache-ffaca",
    storageBucket: "cambalache-ffaca.appspot.com",
    messagingSenderId: "981453259779",
    appId: "1:981453259779:web:83610121fe3123d9c07a36",
    measurementId: "G-79RJPCSX20"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();

export default {
    firebase,
    db,
    auth,
    store
};
