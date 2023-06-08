import React, { useState } from "react";
import styles from "./RegisterationForm.module.css";
import axios from "axios";

function RegistrationForm({ handleRegister }) {
  const [student_id, setstudent_id] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/signup", {
        student_id: student_id,
        name: name,
        email: email,
        password: password,
        phone_num: phoneNumber,
        department: department,
      });

      if (response.status === 201) {
        // 회원가입 성공
        console.log("회원가입이 완료되었습니다.");
        // 로그인 상태 변경 및 회원가입 폼 닫기
        handleRegister();
      } else {
        // 회원가입 실패
        console.log(response.errorMessage);
      }
    } catch (error) {
      // 오류 처리
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.line}>
        <label className={styles.label}>학번</label>
        <input
          className={styles.input}
          type="text"
          value={student_id}
          onChange={(e) => setstudent_id(e.target.value)}
        />
      </div>
      <div className={styles.line}>
        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.line}>
        <label className={styles.label}>이름</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.line}>
        <label className={styles.label}>전화번호</label>
        <input
          className={styles.input}
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className={styles.line}>
        <label className={styles.label}>비밀번호</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.line}>
        <label className={styles.label}>학과</label>
        <input
          className={styles.input}
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div className={styles.line}>
        <button className={styles.registerbtn} type="submit">
          회원가입
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
