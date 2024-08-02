import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from ".";

export const signInWithGoogle = (callbackFn: (res: any) => void) => {
    signInWithPopup(auth, googleProvider).then(callbackFn);
};

export const signInWithFacebook = (callbackFn: (res: any) => void) => {
    signInWithPopup(auth, facebookProvider).then(callbackFn);
};