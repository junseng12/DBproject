import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import Registeration from "./RegisterationForm";
import axios from "axios";

const LoginForm = ({ handleLogin, saveLoginInfo }) => {
  const [student_id, setStudent_id] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  // 로그인 관련 에러 발생 시 창 뜨도록 함
  const [loginError, setLoginError] = useState(false);
  //로그인 여부 확인하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStudent_idChange = (event) => {
    setStudent_id(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //추후에 변경할 코드
  const handleButtonClick = (props) => {
    if (isLoggedIn) {
      // 로그아웃 버튼을 누른 경우
      setIsLoggedIn(false);
      setRegister(false);
    } else if (props === "Register") {
      // 회원가입 버튼을 누른 경우
      setRegister(true);
    }
  };

  async function checkLogin(event, item) {
    event.preventDefault();

    try {
      const response = await axios.post("/user/login", {
        student_id: student_id,
        password: password,
      });

      if (response.status === 200) {
        // 로그인 성공
        console.log("로그인이 완료되었습니다.");
        setIsLoggedIn(true);
        setLoginError(false);
        handleLogin();
        saveLoginInfo(response.data);
        console.log(response.data);
      } else {
        // 로그인 실패
        if (response.errorCode === "INVALID_PASSWORD") {
          console.log(response.errorMessage);
        } else {
          console.log(response.errorMessage);
        }
        setLoginError(true);
      }
    } catch (error) {
      // 오류 처리
      console.log(event);
      setLoginError(true);
    }
  }

  // // 데이터베이스에서 정보 가져와 비교 진행함
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // 로그인 처리 로직 작성
  //   console.log("학번:", student_id);
  //   console.log("비밀번호:", password);

  //   let matchFound = false;

  //   // localStorage에서 저장된 데이터 가져오기
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     const storedData = JSON.parse(localStorage.getItem(key));
  //     const storedStudentId = storedData.student_id;
  //     const storedPassword = storedData.password;

  //     if (student_id === storedStudentId && password === storedPassword) {
  //       matchFound = true;
  //       break;
  //     }
  //   }

  //   if (matchFound) {
  //     setIsLoggedIn(true);
  //     setLoginError(false);
  //     handleLogin();
  //   } else {
  //     setLoginError(true);
  //   }
  // };

  //회원가입 창 띄우고 내리는 함수
  const handleRegister = () => {
    setRegister(false); // 회원가입 폼 닫기
  };

  return (
    <div>
      {register ? (
        <Registeration handleRegister={handleRegister} />
      ) : (
        <>
          {isLoggedIn ? (
            <div>{/* 로그인 후에 표시할 내용 */}</div>
          ) : (
            <form onSubmit={checkLogin} className={styles.container}>
              {loginError && (
                <div className={styles.error}>
                  유효하지 않은 학번 또는 비밀번호입니다.
                </div>
              )}
              <div className={styles.line}>
                <label htmlFor="studentId" className={styles.label}>
                  학번:
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="studentId"
                  value={student_id}
                  onChange={handleStudent_idChange}
                />
              </div>
              <div className={styles.line}>
                <label htmlFor="password" className={styles.label}>
                  비밀번호:
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className={styles.line}>
                <button type="submit" className={styles.btn}>
                  로그인
                </button>
                <button
                  onClick={() => handleButtonClick("Register")}
                  type="register"
                  className={styles.btn}
                >
                  회원가입
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default LoginForm;
