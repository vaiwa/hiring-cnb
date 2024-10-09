import { initializeApp, FirebaseApp } from 'firebase/app'
import { getFunctions, Functions, httpsCallable } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

console.info('TODO firebaseConfig', firebaseConfig) // TODO

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
    functionsInstance = getFunctions(firebase())
  }
  return functionsInstance
}

export function fn(name: string) {
  return httpsCallable(functions(), name)
}
