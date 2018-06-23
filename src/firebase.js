import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

let firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
