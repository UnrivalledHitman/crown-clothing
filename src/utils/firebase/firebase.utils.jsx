import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDAQx-9c5QjCLmTZmKehdOoOsH4xAil5RA",
  authDomain: "crown-clothing-db-5e3b5.firebaseapp.com",
  projectId: "crown-clothing-db-5e3b5",
  storageBucket: "crown-clothing-db-5e3b5.appspot.com",
  messagingSenderId: "970269248036",
  appId: "1:970269248036:web:8370613ed87c54dbe526b1",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

// Google Auth Provider setup
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore database setup
export const db = getFirestore();

// Function to create or retrieve user document from Firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; // Exit if no user

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log("User Doc Reference:", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("User Snapshot:", userSnapshot);
  console.log("User Snapshot Exists:", userSnapshot.exists());

  // Create user document if it doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      console.log("User document created successfully.");
    } catch (error) {
      console.error("Error creating user document", error.message);
    }
  } else {
    console.log("User already exists in Firestore.");
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
