import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpg_K1QmT8cbUFpsk9szAHJV5vhSDJG1A",
  authDomain: "eventx-e40ca.firebaseapp.com",
  projectId: "eventx-e40ca",
  storageBucket: "eventx-e40ca.appspot.com",
  messagingSenderId: "580004731161",
  appId: "1:580004731161:web:d6d460a3fcf5ca97188d88",
  measurementId: "G-J829HD6EJD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };