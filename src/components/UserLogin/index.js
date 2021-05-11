import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUniqueID, loginToken, isLoggedIn, employeeLog} from "../../actions";
import * as utils from "../../Utils";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [verificationCode, setVerificationCode] = useState(false);
  const [oneTimeCode, setOneTimeCode] = useState("false");
  const [errorMessage, setErrorMessage] = useState("Something went wrong....");

  const mySubmitHandler = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      let response = await fetch(`${utils.backendRoute}/auth/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (result.success) {
        setVerificationCode(true);
      } else {
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
        props.setUniqueID(result.data.uniqueId);
        console.log("Logged in called here");
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
            <button className="button is-success is-small">Login</button>
            <Link to="/register">
              <button className="button is-info is-small">Sign Up</button>
            </Link>
          </p>
        </div>
        <div className="content flex-center">
          <p className="is-size-7">
            Are you an employee? Click <span onClick={()=> props.employeeLog('isEmpOrUser')}>Here</span>
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
  return (
    <section className="hero has-background-light is-fullheight ">
      <div className="custom-login">
        <div className="box">
          <div className="j-center">
            <figure className="image is-128x128  is-flex">
              <img
                src="/images/myhealth.jpeg"
                className="is-rounded"
                alt="logo"
              />
            </figure>
          </div>
          <div className="custom-flex">
            <h1 className="is-size-4">Digital Health Passport</h1>
          </div>
          {isError === true ? (
            <div className="button is-danger m-bottom">{errorMessage}</div>
          ) : (
            ""
          )}
          {!verificationCode ? loginForm() : verifyTextForm()}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  isLoggedIn,
  loginToken,
  setUniqueID,
  employeeLog
})(UserLogin);
