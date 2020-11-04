import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgZnRpoGnxhYpm4PD_88p7Pt6icqSbkI0",
    authDomain: "tyerra-app.firebaseapp.com",
    databaseURL: "https://tyerra-app.firebaseio.com",
    projectId: "tyerra-app",
    storageBucket: "tyerra-app.appspot.com",
    messagingSenderId: "44154961316",
    appId: "1:44154961316:web:e8471e2ee4ecf6e2fcd531"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, firebase };