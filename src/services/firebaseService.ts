import { initializeApp, FirebaseApp } from 'firebase/app'
import { getFunctions, Functions, httpsCallable } from 'firebase/functions'

const REGION = 'europe-west3' // Frankfurt
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let firebaseInstance: FirebaseApp | null = null
let functionsInstance: Functions | null = null

export function init(): void {
  firebase()
  functions()
}

export function firebase(): FirebaseApp {
  if (!firebaseInstance) {
    firebaseInstance = initializeApp(firebaseConfig)
  }
  return firebaseInstance
}

export function functions(): Functions {
  if (!functionsInstance) {
    functionsInstance = getFunctions(firebase(), REGION)
  }
  return functionsInstance
}

export function fn(name: string) {
  return httpsCallable(functions(), name)
}
