import {initializeApp} from 'firebase/app';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseApp = {
  apiKey: 'AIzaSyBCqBD_w3D_yiV2w63rlLoH8ZSqRPS-wCM',
  authDomain: 'gallery-360-africa.firebaseapp.com',
  projectId: 'gallery-360-africa',
  storageBucket: 'gallery-360-africa.appspot.com',
  messagingSenderId: '977191750253',
  appId: '1:977191750253:web:1ca1b1b961d4831f5fcd64',
  measurementId: 'G-2WMFTWZVE8',
};

const app = firebase.initializeApp(firebaseApp);
const db = app.firestore();
db.settings({experimentalAutoDetectLongPolling: true})
const auth = app.auth();
const userCollection = db.collection('users');
const bookingCollection = db.collection('booking');
const realtimedb = app.database();
const storage = app.storage(); //"gs://restaurantbooking-328010.appspot.com"
const storageRef = storage.ref();
const fb = firebase.storage.TaskEvent.STATE_CHANGED;

export {
  db,
  auth,
  userCollection,
  firebaseApp,
  realtimedb,
  storage,
  bookingCollection,
  storageRef,
  fb,
};
