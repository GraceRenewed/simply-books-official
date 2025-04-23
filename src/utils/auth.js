import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { firebaseApp } from './client'; // your initialized firebaseApp

const auth = getAuth(firebaseApp);

const signIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const signOut = () => firebaseSignOut(auth);

export { signIn, signOut };
