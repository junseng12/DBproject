/* eslint-disable no-undef */
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AjouBackground from "../assets/AjouBackground.png";

import styles from "./Main.module.css";
// import Registeration from "../components/RegisterationForm";
import Private from "../components/Private";
import Search from "../components/SearchForm";
import Login from "../components/LoginForm";
import Apply from "../components/ApplyForm";
import Menu from "../components/Menu";
import RentMgeForm from "./RentMgeForm";
import ItemMgeForm from "./ItemMgeForm";

function Main() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //로그인 정보 기록
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
    console.log(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const saveLoginInfo = (userData) => {
    setLoggedInUser(userData);
  };

  // 관리자 여부 확인 함수
  const isAdmin = () => {
    if (isLoggedIn && loggedInUser.authority === true) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <Menu
        isLoggedIn={isLoggedIn}
        handleButtonClick={handleButtonClick}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
      />

      <div
        className={styles.background}
        style={{ backgroundImage: `url(${AjouBackground})` }}
      >
        <div className={styles.contentsContainer}>
          {/*조건에 따라 다른 Page 렌더링*/}
          {/* {currentPage === "Private" && <Private/>}
      {currentPage === "Search" && <SearchComponent />}
      {currentPage === "apply" && <ApplyComponent />}*/}

          {currentPage === "Private" && (
            <Private
              isLoggedIn={isLoggedIn}
              changeLogInpage={handleButtonClick}
              loggedInUser={loggedInUser}
            />
          )}

          {currentPage === "Search" && (
            <Routes>
              <Route
                path="*"
                element={
                  <Search
                    isLoggedIn={isLoggedIn}
                    changeLogInpage={handleButtonClick}
                    loggedInUser={loggedInUser}
                  />
                }
              />
            </Routes>
          )}
          {currentPage === "Apply" && (
            <Apply
              isLoggedIn={isLoggedIn}
              changeLogInpage={handleButtonClick}
              loggedInUser={loggedInUser}
            />
          )}

          {/* 관리자 관련 Page */}
          {currentPage === "RentMge" && (
            <RentMgeForm
              isLoggedIn={isLoggedIn}
              changeLogInpage={handleButtonClick}
              loggedInUser={loggedInUser}
            />
          )}

          {currentPage === "ItemMge" && (
            <ItemMgeForm
              isLoggedIn={isLoggedIn}
              changeLogInpage={handleButtonClick}
              loggedInUser={loggedInUser}
            />
          )}

          {currentPage === "Login" && (
            <Login handleLogin={handleLogin} saveLoginInfo={saveLoginInfo} />
          )}
          {/* {currentPage === "Register" && <Registeration />} */}
        </div>
      </div>
    </div>
  );
}

export default Main;
