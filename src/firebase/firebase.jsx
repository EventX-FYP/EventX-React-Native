import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const provider = new GoogleAuthProvider();

export const createUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log(user)
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const signOutAuth = () => {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const authState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

export const signInWithGoogle = async () => {
  try {
    // await GoogleSignin.hasPlayServices();
    // await GoogleSignin.signOut();
    // const userInfo = await GoogleSignin.signIn();
    // console.log(userInfo);
    return true;
  } catch (error) {
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   console.log('user cancelled the login flow');
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   console.log('operation (e.g. sign in) is in progress already');
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   console.log('play services not available or outdated');
    // } else {
    //   console.log(error);
    // }
    throw new Error(error);
  }
};