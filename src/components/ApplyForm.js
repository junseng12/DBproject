import React, { useState } from "react";
import styles from "./ApplyForm.module.css";
import axios from "axios";

function ApplyForm({ isLoggedIn, changeLogInpage, loggedInUser }) {
  const [itemName, setItemName] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  //사용자 정보 연동
  const student_id = "202021062";
  // const userInfo = loggedInUser;
  // const { student_id } = userInfo;

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  async function handleApply(event, item) {
    const confirmation = window.confirm("물품 예약을 진행하시겠습니까?");

    if (confirmation) {
      // 신청 가능한 경우
      console.log("신청가능");
      // 신청 처리 로직

      // 신청 API 호출
      try {
        const response = await axios.post("/rent", {
          apply_id: "신청번호",
          apply_name: item.itemName,
          reason: item.reason,
          link: "구매링크",
          student_id: student_id,
        });

        if (response.status === 201) {
          // 신청 성공
          console.log(response.msg);
        } else {
          // 신청 실패
          console.log("신청에 실패했습니다.");
        }
      } catch (error) {
        // 오류 처리
        console.error("신청 과정에서 오류가 발생했습니다.", error);
      }

      // Private 페이지로 이동
      setIsSubmitted(true);
      changeLogInpage("Private");
    }
  }

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    changeLogInpage("Login"); // 로그인 페이지로 전환
    return null; // Private 컴포넌트 자체를 렌더링하지 않음
  }

  return (
    <div className={styles.container}>
      {isSubmitted ? (
        <div className={styles.notification}>
          <p>물품 신청이 완료되었습니다. 감사합니다.</p>
        </div>
      ) : (
        <form onSubmit={handleApply}>
          <div className={styles.line}>
            <label className={styles.label}>물품명:</label>
            <input
              type="text"
              value={itemName}
              onChange={handleItemNameChange}
            />
          </div>
          <div className={styles.line}>
            <label className={styles.label}>신청사유:</label>
            <input type="text" value={reason} onChange={handleReasonChange} />
          </div>
          <div className={styles.line}>
            <button type="submit" className={styles.btn}>
              신청하기
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ApplyForm;
