import React, { useState } from "react";
import { connect } from "react-redux";
import {setUniqueID, loginToken, isLoggedIn} from '../../actions'

import * as utils from "../../Utils";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [verificationCode, setVerificationCode] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong....");

  const mySubmitHandler = async (event) => {
    event.preventDefault();
    const creds = {
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      userId: props.GetUniqueId,
    };
    try {
      let response = await fetch(`${utils.backendRoute}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      console.log(result);
      if (result.success) {
        // Render next step
        console.log('In res.success')
        setVerificationCode(true)
      } else {
        console.log('In Error')
        setErrorMessage(result.msg);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };
  const myCodeSubmitHandler = async (event) => {
    event.preventDefault();
    const oneTimeKey = {
      key: oneTimeCode,
    };
    try {
      let response = await fetch(
        `${utils.backendRoute}/text/verifyOneTimeText`,
        {
          method: "POST",
          body: JSON.stringify(oneTimeKey),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let result = await response.json();
      console.log(result);
      if (result.success) {
        props.loginToken(result.data.token);
        props.isLoggedIn(true);
      } else {

        setErrorMessage(result.msg);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };
  const loginForm = () => {
    return (
      <form onSubmit={mySubmitHandler}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-phone"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control custom-login-button">
            <button className="button is-success is-small">Register</button>
          </p>
        </div>
      </form>
    );
  };

  const verifyTextForm = () => {
    return (
      <form onSubmit={myCodeSubmitHandler}>
        <div className="field">
          <label className="label">Enter one time code</label>
          <p className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="One time code"
              onChange={(e) => setOneTimeCode(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control custom-login-button">
            <button className="button is-success is-small">Submit Code</button>
          </p>
        </div>
      </form>
    );
  };

  return <>{!verificationCode ? loginForm() : verifyTextForm()}</>;
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  isLoggedIn,
  loginToken,
  setUniqueID,
})(SignUp);
