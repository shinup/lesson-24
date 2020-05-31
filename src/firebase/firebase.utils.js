import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAaOPBQvWlI0oxbl9_mqMiOzEF7YCAqcX0",
  authDomain: "crwn-db-a929a.firebaseapp.com",
  databaseURL: "https://crwn-db-a929a.firebaseio.com",
  projectId: "crwn-db-a929a",
  storageBucket: "crwn-db-a929a.appspot.com",
  messagingSenderId: "569062710132",
  appId: "1:569062710132:web:1166fac35fe536e2102a21",
  measurementId: "G-X376XZFD8W"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
