import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const SignInWithFacebook = () => {
  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then((res) => console.log(res));
  };

  return (
    <button
      className="bg-red-600 text-white p-3 text-3xl"
      onClick={facebookLogin}
    >
      SIGN IN WITH FACEBOOK
    </button>
  );
};

export default SignInWithFacebook;
