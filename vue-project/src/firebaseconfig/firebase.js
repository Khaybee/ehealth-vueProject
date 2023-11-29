// Initialize Firebase in your Vue app
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAMXoBdp7gpo6Q3zUqN8VwxZGPY0jLTC58",
    authDomain: "sample-data-3d140.firebaseapp.com",
    databaseURL: "https://sample-data-3d140-default-rtdb.firebaseio.com",
    projectId: "sample-data-3d140",
    storageBucket: "sample-data-3d140.appspot.com",
    messagingSenderId: "335304732007",
    appId: "1:335304732007:web:1a21cd6903340c293253c2",
    measurementId: "G-451SQBC91L"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const ref = db.ref('people'); // Reference to the 'people' collection
