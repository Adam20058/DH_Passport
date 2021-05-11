import React, { useState } from "react";

import QRCode from "react-qr-code";

const UserQRCode = () => {
  return (
    <>
      <QRCode value="hey" size={290} level={"H"} />
      <button
        className="button is-info is-medium m-top is-light"
        
      >
        Go Back
      </button>
    </>
  );
};

export default UserQRCode;
