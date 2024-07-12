import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const SignInWithGoogle = () => {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((res) => console.log(res));
  };

  return (
    <button
      className="bg-red-600 text-white p-3 text-3xl"
      onClick={googleLogin}
    >
      SIGN IN WITH GOOGLE
    </button>
  );
};

export default SignInWithGoogle;
