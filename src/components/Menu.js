import React from "react";
import styles from "./Menu.module.css";

function Menu({ isLoggedIn, handleButtonClick, setIsLoggedIn, isAdmin }) {
  return (
    <>
      {!isAdmin ? (
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <button onClick={() => handleButtonClick("Private")}>
              마이페이지
            </button>
          </li>
          <li className={styles.menuItem}>
            <button onClick={() => handleButtonClick("Search")}>
              물품조회
            </button>
          </li>
          <li className={styles.menuItem}>
            <button onClick={() => handleButtonClick("Apply")}>물품신청</button>
          </li>
          <li className={styles.menuItem}>
            {/* 로그인 시, 로그아웃으로 명칭 변경되어야 함 
            다른 페이지에서도 로그아웃이 되면 */}
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)}>로그아웃</button>
            ) : (
              <button onClick={() => handleButtonClick("Login")}>로그인</button>
            )}
          </li>
        </ul>
      ) : (
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <button onClick={() => handleButtonClick("RentMge")}>
              대여관리
            </button>
          </li>
          <li className={styles.menuItem}>
            <button onClick={() => handleButtonClick("ItemMge")}>
              물품관리
            </button>
          </li>
          <li className={styles.menuItem}>
            {/* 로그인 시, 로그아웃으로 명칭 변경되어야 함 
            다른 페이지에서도 로그아웃이 되면 */}
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)}>로그아웃</button>
            ) : (
              <button onClick={() => handleButtonClick("Login")}>로그인</button>
            )}
          </li>
        </ul>
      )}
    </>
  );
}

export default Menu;

{
  /* <ul className={styles.menu}>
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
          다른 페이지에서도 로그아웃이 되면 */
}
//     {isLoggedIn ? (
//       <button
//         onClick={() => {
//           setIsLoggedIn(false);
//         }}
//       >
//         로그아웃
//       </button>
//     ) : (
//       <button onClick={() => handleButtonClick("Login")}>로그인</button>
//     )}
//   </li>
// </ul> */}
