import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { auth } from "./firebase";

export const signupWithEmail = async (email: string, password: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return await cred.user.getIdToken();
};

export const loginWithEmail = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return await cred.user.getIdToken();
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);

  return await cred.user.getIdToken();
};

export async function firebaseLogout() {
  const auth = getAuth();
  await signOut(auth);
}
