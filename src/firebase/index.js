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
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

// firestore functions
const db = getFirestore(app);
const getCollectionRef = (collectionName) => collection(db, collectionName);
const createCollection = (userDoc, collectionName) => collection(userDoc, collectionName);
const getSubcollectionRef = (username, subcollectionName) => collection(db, "users", username, subcollectionName); 
const getDocumentRef = (docId, collectionName) =>
  doc(db, collectionName, docId);
const getSubcollectionDocRef = (username, docId, subcollectionName) =>
  doc(db, "users", username, subcollectionName, docId);
const snapshot = (ref, func) => onSnapshot(ref, func);
const add = (collectionName, item) => addDoc(collectionName, item);
const deleteItem = (ref) => deleteDoc(ref);
const update = (docRef, newData) => updateDoc(docRef, newData);
const set = (docRef, newData) => setDoc(docRef, newData);
const get = (docRef) => getDoc(docRef);

// auth functions
const auth = getAuth(app);
const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
const googleProvider = () => new GoogleAuthProvider();
const googleSignUp = () => signInWithPopup(auth, googleProvider());
const logInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export {
  getCollectionRef,
  getDocumentRef,
  snapshot,
  add,
  deleteItem,
  update,
  auth,
  signUpWithEmail,
  googleSignUp,
  set,
  createCollection,
  get,
  logInWithEmail,
  getSubcollectionRef,
  getSubcollectionDocRef,
};
