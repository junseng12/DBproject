/* eslint-disable no-undef */
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import styles from "./Main.module.css";
// import Registeration from "../components/RegisterationForm";
import Private from "../components/Private";
import Search from "../components/SearchForm";
import Login from "../components/LoginForm";
import Apply from "../components/ApplyForm";

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

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <button onClick={() => handleButtonClick("Private")}>
            마이페이지
          </button>
        </li>
        <li className={styles.menuItem}>
          <button onClick={() => handleButtonClick("Search")}>물품조회</button>
        </li>
        <li className={styles.menuItem}>
          <button onClick={() => handleButtonClick("Apply")}>물품신청</button>
        </li>
        <li className={styles.menuItem}>
          {/* 로그인 시, 로그아웃으로 명칭 변경되어야 함 
          다른 페이지에서도 로그아웃이 되면 */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
              }}
            >
              로그아웃
            </button>
          ) : (
            <button onClick={() => handleButtonClick("Login")}>로그인</button>
          )}
        </li>
      </ul>

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

        {currentPage === "Login" && (
          <Login handleLogin={handleLogin} saveLoginInfo={saveLoginInfo} />
        )}
        {/* {currentPage === "Register" && <Registeration />} */}
      </div>
    </div>
  );
}

export default Main;
