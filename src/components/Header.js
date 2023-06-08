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
        <div
          style={{
            width: "127px",
            height: "123px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "center",
            marginTop: "20px",
            position: "absolute",
            left: 0,
            top: 0,
            backgroundImage: `url(${AjouUniv})`, // 배경으로 설정
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={AjouRental}
            style={{
              margin: "10px",
            }}
            alt="Logo"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
