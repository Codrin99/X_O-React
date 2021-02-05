import React, { useState, useEffect } from "react";
import { doLogin, reqLoginError, reqLoggedIn } from "./../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from './login.module.css';
import logo from "../../images/Logo.png";

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isNotValid, setIsNotValid] = useState(false);
  const [serverError, setServerError] = useState(false);
  const dispatch = useDispatch();
  const serverErrorSelector = useSelector(reqLoginError);
  const serverIsLoggedIn = useSelector(reqLoggedIn);
  let history = useHistory();

  const login = () => {
    const data = {
      email,
      password,
    };
    dispatch(doLogin(data));
  };

  useEffect(() => {
    setServerError(serverErrorSelector);
    setIsNotValid(!(email && password));

    if (serverIsLoggedIn) {
      console.log("Redirect ...");
      history.push("/game");
    }
  }, [email, password, serverErrorSelector, serverIsLoggedIn]);

  return (
    <>
      <div className={styles.loginBox}>
      <img src={logo} className={styles.logo} alt="logo"></img>
      <h1>TIC TAC TOE</h1>
      {isNotValid && (
        <div className="alert alert-info">
          Email and password are required
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger">
          Server Error: email or password is invalid
        </div>
      )}
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Email ..."
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <input
        type="password"
        className="form-control form-control-lg"
        placeholder="Password ..."
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <div className={styles.container}>
        <button  disabled={isNotValid} onClick={login} className={styles.loginBtn}>
          <p className={styles.btnText}>Login</p>
          <div className={styles.fill}></div>
        </button>
	    </div>

      </div>
    </>
  );
}