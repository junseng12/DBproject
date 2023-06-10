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
            marginTop: "46px",
            marginLeft: "44px",
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
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid rgba(81, 165, 212, 0.7)",
            // border: "1px solid #51A5D4",
            boxShadow: "0px 0px 5px 2px rgba(81, 165, 212, 0.7)",

            width: "194px",
            height: "97px",
            boxSizing: "border-box",
            background: "#FFFFFF",
            boxShadow: "6px 6px 5px 0px rgba(81, 165, 212, 0.7)",
            borderRadius: "25px",
            margin: "70px",
          }}
        >
          <div
            style={{
              fontFamily: "Gmarket Sans TTF",
              fontStyle: "normal",
              fontWeight: 300,
              fontSize: "36px",
              lineHeight: "41px",
              textAlign: "center",
              color: "#000000",
              margin: "8px",
            }}
          >
            Ajou Rental
          </div>
          <div />

          <div
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
