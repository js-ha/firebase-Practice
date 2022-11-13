import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/Firebase_config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userdata, setUserdata] = useState("");
  const [goodata, setGoodata] = useState("");

  const register = async () => {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setUserdata(data.user.email);
        console.log(data);
        // console.log(data.user.email);
        // console.log(typeof data.user.email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((data) => {
        setGoodata(data.user.displayName);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        console.log(auth);
      })
      .catch((error) => {
        console.log("로그아웃 실패");
        console.log(error.message);
      });
  };
  return (
    <div>
      <h1>회원가입</h1>
      <input
        placeholder='Email'
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        placeholder='Password'
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <button onClick={register}>Sign Up</button>
      <h1>로그인</h1>
      <input
        placeholder='Email'
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        placeholder='Password'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={Login}>Login</button>
      <div>{userdata ? `${userdata}` : null}</div>
      <div>
        <h1>구글 로그인</h1>
        <button onClick={GoogleLogin}>Google</button>
        <div>{goodata ? `${goodata}` : null}</div>
      </div>
      <div>
        <h1>로그아웃</h1>
        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
