import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import SignInWithGoogle from "../components/auth/SignInWithGoogle";
import SignInWithFacebook from "../components/auth/SignInWithFacebook";

const Auth = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // some fancy firebase shit
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        if (userCredential) {
          console.log("You've been logged ");
        }
      })
      .catch((error: any) => {
        console.log("No such user exists ", error);
      });
  };
  return (
    <>
      <form className="text-3xl" onSubmit={login}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <button>SUBMIT</button>
      </form>
      <SignInWithGoogle />
      <SignInWithFacebook />
    </>
  );
};

export default Auth;
