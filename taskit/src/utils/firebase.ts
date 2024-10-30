import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializa o Firebase
const firebase = initializeApp(firebaseConfig);
const auth = initializeAuth(firebase, { persistence: getReactNativePersistence(AsyncStorage) });
const firestore = getFirestore(firebase);
const functions = getFunctions(firebase);

if (__DEV__) {
  connectAuthEmulator(
    auth,
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST || 'http://10.0.2.2:9099'
  );

  connectFirestoreEmulator(
    firestore,
    process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_HOST?.split(':')[0] || '10.0.2.2',
    parseInt(process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_HOST?.split(':')[1] || '8080', 10)
  );

  connectFunctionsEmulator(
    functions,
    process.env.EXPO_PUBLIC_FUNCTIONS_EMULATOR_HOST?.split(':')[0] || '10.0.2.2',
    parseInt(process.env.EXPO_PUBLIC_FUNCTIONS_EMULATOR_HOST?.split(':')[1] || '5001', 10)
  );
}

export { auth, firestore, functions };
