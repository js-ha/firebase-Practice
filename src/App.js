import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/Firebase_config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        placeholder="Email"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <button onClick={register}>Sign Up</button>
      <div>
        <h1>구글 로그인</h1>
        <button onClick={GoogleLogin}>Google</button>
      </div>
    </div>
  );
}

export default App;
