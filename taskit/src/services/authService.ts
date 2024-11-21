import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';

import { auth, firestore } from '../utils/firebase';

export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signUp = async (
  email: string,
  password: string,
  additionalData: any
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Salva os dados no Firestore
  const userDocRef = doc(firestore, 'users', user.uid);
  await setDoc(userDocRef, { email, ...additionalData });

  return user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const getUserDataFromFirestore = async (uid: string) => {
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};
