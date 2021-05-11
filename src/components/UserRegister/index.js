import React, { useState } from "react";
import { connect } from "react-redux";

import { setUniqueID } from "../../actions";
import SignUp from "./signup";
import * as utils from "../../Utils";

const UserRegister = (props) => {
  const [isError, setIsError] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong....");
  const [typeOfKey, setKey] = useState("");
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [OHIP, setOHIP] = useState("");
  const [fullName, setFullName] = useState("");

  const oneTimeSubmitHandler = async (event) => {
    event.preventDefault();
    const oneTimeKey = {
      type: "vaccinated",
    };
    oneTimeKey[typeOfKey] = oneTimeCode;
    if(typeOfKey === 'c_type'){
      oneTimeKey['type'] = "covid_test"
    }
    try {
      let response = await fetch(`${utils.backendRoute}/auth/keyVerification`, {
        method: "POST",
        body: JSON.stringify(oneTimeKey),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (result.success) {
        // Render next step
        setStep1(false);
        setStep2(true);
      } else {
        setErrorMessage(result.msg);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };
  const verificationSubmitHandler = async (event) => {
    event.preventDefault();
    let lastName = fullName.split(" ")[1];
    let firstName = fullName.split(" ")[0];
    const credentials = {
      lastName,
      firstName,
      OHIP,
    };
    try {
      let response = await fetch(`${utils.backendRoute}/auth/verifyIdentity`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (result.success) {
        // Render next step
        setStep2(false);
        setStep3(true);
        props.setUniqueID(result.data.userId);
      } else {
        setErrorMessage(result.msg);
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  const renderChoicesBlock = () => {
    return (
      <>
        <button
          className="button is-medium is-info is-fullwidth custom-button-bottom"
          onClick={(e) => {
            setStep1(true);
            setKey("v_key");
          }}
        >
          Enter Vaccination Key
        </button>
        <button
          className="button is-medium is-info is-fullwidth"
          onClick={(e) => {
            setStep1(true);
            setKey("c_key");
          }}
        >
          Enter Covid Test Key
        </button>
      </>
    );
  };

  const renderOneTimeForm = () => {
    return (
      <form onSubmit={oneTimeSubmitHandler}>
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
  const renderVerificationForm = () => {
    return (
      <form onSubmit={verificationSubmitHandler}>
        <div className="field">
          <label className="label">Enter OHIP card number</label>
          <p className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="OHIP number"
              onChange={(e) => setOHIP(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <label className="label">Enter Full Name</label>
          <p className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control custom-login-button">
            <button className="button is-success is-small">
              Submit Information
            </button>
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
          {typeOfKey === "" ? renderChoicesBlock() : null}
          {step1 === false ? null : renderOneTimeForm()}
          {step2 === false ? null : renderVerificationForm()}
          {step3 === false ? null : <SignUp />}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setUniqueID,
})(UserRegister);
