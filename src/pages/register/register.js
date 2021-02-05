import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doRegister,
  reqRegisterData,
  clearRegisterData,
  userSlice,
} from "./../../slices/userSlice";
import { useHistory } from "react-router-dom";
import styles from './register.module.css';
import logo from "../../images/Logo.png";

// name email password confirm_password
export function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerResponse = useSelector(reqRegisterData);

  useEffect(() => {
    if (registerResponse && registerResponse._id) {
      history.push("/login");
      dispatch(clearRegisterData());
    }
    setIsValid(!(name && email && password && confirm_password));
  }, [registerResponse, name, email, password, confirm_password]);

  const register = () => {
    const data = {
      name,
      email,
      passwords: {
        password,
        confirm_password,
      },
    };

    console.log(data);
    if (!isValid) dispatch(doRegister(data));
  };

  return (
    <>
    <div className={styles.loginBox}>
      <img src={logo} className={styles.logo} alt="logo"></img>
      <h1>TIC TAC TOE</h1>

      {isValid ? (
        <div className="alert alert-danger">Invalid or incomplete form</div>
      ) : (
        <div className="alert alert-success">Now you can register</div>
      )}

      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Name ..."
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
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
      <input
        type="password"
        className="form-control form-control-lg"
        placeholder="Confirm Password ..."
        onChange={(event) => setConfirmPassword(event.target.value)}
        value={confirm_password}
      />

      <div className={styles.container}>
        <button  disabled={isValid} onClick={register} className={styles.registerBtn}>
          <p className={styles.btnText}>Register</p>
        <div className={styles.fill}></div>
        </button>
	    </div>
      </div>
    </>
  );
}