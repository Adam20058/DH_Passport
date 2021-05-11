import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import QRCode from "react-qr-code";

import * as utils from "../../Utils";

const UserHome = (props) => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [qrOpen, setOpenQR] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const oneTimeKey = {
          userId: props.GetUniqueId,
        };
        let response = await fetch(`${utils.backendRoute}/user/getProfile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            jwt: props.setToken,
          },
          body: JSON.stringify(oneTimeKey),
        });
        let results = await response.json();
        console.log(results);
        return results;
      } catch (err) {
        console.log(err);
      }
    };
    getProfile().then((res) => {
      setStatus(res.success);
      setMessage(res.msg);
    });
  }, [props.setToken, props.GetUniqueId]);

  const renderProfile = () => {
    return (
      <>
        <figure className="image">
          {status ? (
            <img
              src="/images/checkmark.png"
              className="is-rounded"
              alt="logo"
            />
          ) : (
            <img src="/images/redx.png" className="is-rounded" alt="logo" />
          )}
        </figure>
        <div className="button has-text-weight-semibold m-top m-bottom is-large">
          {message}
        </div>
        <button
          className="button is-info is-medium m-top is-light"
          onClick={() => setOpenQR(true)}
        >
          Generate QR Code
        </button>
      </>
    );
  };
  const UserQRCode = () => {
    return (
      <>
        <QRCode value={props.GetUniqueId.toString()} size={290} level={"H"} />
        <button
          className="button is-info is-medium m-top is-light"
          onClick={() => setOpenQR(false)}
        >
          Go Back
        </button>
      </>
    );
  };
  return (
    <div className="custom-home-container">
      {!qrOpen ? renderProfile() : <UserQRCode />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, null)(UserHome);
