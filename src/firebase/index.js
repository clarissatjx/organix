import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// functions
const db = getFirestore(app);
const getCollectionRef = (collectionName) => collection(db, collectionName);
const getDocumentRef = (docId, collectionName) =>
  doc(db, collectionName, docId);
const snapshot = (ref, func) => onSnapshot(ref, func);
const add = (collectionName, item) => addDoc(collectionName, item);
const deleteItem = (ref) => deleteDoc(ref);
const update = (docRef, newData) => updateDoc(docRef, newData);

export { getCollectionRef, getDocumentRef, snapshot, add, deleteItem, update };
