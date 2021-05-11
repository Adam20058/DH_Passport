import React, { useState } from "react";
import { employeeLog, isEmpOrUser } from "../../actions";
import { connect } from "react-redux";
import * as utils from "../../Utils";

const EmpLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong....");

  const mySubmitHandler = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      let response = await fetch(`${utils.backendRoute}/auth/loginEmployee`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (result.success) {
        props.employeeLog('both');
      } else {
        setErrorMessage(result.msg);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
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
          <h1 className="is-size-6 has-text-centered">Employee Login</h1>
          {isError === true ? (
            <div className="button is-danger m-bottom">{errorMessage}</div>
          ) : (
            ""
          )}
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
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  employeeLog,
  isEmpOrUser,
})(EmpLogin);
