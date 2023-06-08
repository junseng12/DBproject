/* eslint-disable no-undef */
import React from "react";
import AjouUniv from "../assets/AjouUnivlogo.png";
import AjouRental from "../assets/AjouRentallogo.png";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "226px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={AjouUniv}
          style={{ margin: "10px", width: "127px", height: "123px" }}
          alt="Logo"
        />
        <img src={AjouRental} style={{ margin: "10px" }} alt="Logo" />
      </div>
    </header>
  );
}

export default Header;
