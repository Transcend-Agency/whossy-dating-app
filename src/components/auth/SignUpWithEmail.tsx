import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import SignInWithEmail from "./SignInWithEmail";

const Signup = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        if (userCredential) {
          //   navigate("/thanks");
          console.log("User created");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form className="text-3xl" onSubmit={register}>
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
      <SignInWithEmail />
    </>
  );
};

export default Signup;
