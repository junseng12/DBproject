import React, { useState, useEffect } from "react";
import styles from "./Private.module.css";
import Item from "./Item";
import axios from "axios";

function Private({ isLoggedIn, changeLogInpage, loggedInUser }) {
  const [userInfo, setUserInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  //사용자 신청 내역 저장하는 변수
  const [applyRecords, setApplyRecords] = useState([]);
  const [showapplyRecord, setShowapplyRecord] = useState(false);
  //사용자 대여 내역 저장하는 변수
  const [rentalRecords, setRentalRecords] = useState([]);
  const [showRentalRecords, setShowRentalRecords] = useState(false);
  useEffect(() => {
    // 로그인 상태가 변경될 때마다 사용자 정보를 가져오는 로직 작성
    if (isLoggedIn) {
      // 데이터베이스에서 사용자 정보를 가져오는 API 호출 등의 로직을 수행
      const user = loggedInUser;
      setUserInfo(user);
      // console.log(user);
    } else {
      setUserInfo(null); // 로그아웃한 경우 사용자 정보 초기화
    }
  }, [isLoggedIn]);

  // 사용자 정보 조회 API 호출
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/user/info");

      if (response.status === 200) {
        const userData = response.data;
        setUserInfo(userData);
        showUserInfo(true);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 내 정보 확인하는 함수
  const showUserInfo = () => {
    setShowapplyRecord(false);
    setShowRentalRecords(false);
    setShowInfo(true);
  };

  // 사용자 물품 신청 내역 확인하는 함수
  const handleApplyRecordsClick = () => {
    const savedApplyRecords =
      JSON.parse(localStorage.getItem("applyRecords")) || [];
    setApplyRecords(savedApplyRecords);
    setShowInfo(false);
    setShowRentalRecords(false);
    setShowapplyRecord(true);
  };
  // // 사용자 대여 물품 내역 확인하는 함수
  // const handleRentalRecordsClick = () => {
  //   const savedRentalRecords =
  //     JSON.parse(localStorage.getItem("rentalRecords")) || [];
  //   setRentalRecords(savedRentalRecords);
  //   setShowInfo(false);
  //   setShowapplyRecord(false);
  //   setShowRentalRecords(true);
  // };

  // 대여 조회 API 함수
  const fetchRentalRecords = async () => {
    try {
      const response = await axios.get("/rent/mylist");

      if (response.status === 200) {
        const rentalData = response.data;
        setRentalRecords(rentalData);

        //Rental한 내역 조회하도록 설정
        setShowInfo(false);
        setShowapplyRecord(false);
        setShowRentalRecords(true);
      } else {
        // 대여 조회 API 요청이 실패한 경우
        console.error(response.data);
        console.error(response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //대여 연장 API 함수
  const handleExtendRental = async (index) => {
    try {
      const item = rentalRecords[index];
      const itemId = item.item_id;
      const response = await axios.get(`/rent/extend/${itemId}`);

      if (response.status === 200) {
        // 연장 성공
        // 세부 변경 필요
        const updatedRentalRecords = [...rentalRecords];
        updatedRentalRecords[index] = response.data.updatedItem;
        setRentalRecords(updatedRentalRecords);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자 물품 신청 데이터 삭제하는 함수 - API 구현
  const handleCancelApply = (index) => {
    const updatedApplyRecords = [...applyRecords];
    updatedApplyRecords.splice(index, 1); // 선택한 물품 신청 내역 삭제

    setApplyRecords(updatedApplyRecords);
    localStorage.setItem("applyRecords", JSON.stringify(updatedApplyRecords));
  };

  // 사용자 대여 물품 데이터 삭제하는 함수
  // const handleCancelRental = (index) => {
  //   const updatedRentalRecords = [...rentalRecords];
  //   updatedRentalRecords.splice(index, 1);

  //   setApplyRecords(updatedRentalRecords);
  //   localStorage.setItem("rentalRecords", JSON.stringify(updatedRentalRecords));
  // };

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    changeLogInpage("Login"); // 로그인 페이지로 전환
    return null; // Private 컴포넌트 자체를 렌더링하지 않음
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <button onClick={fetchUserInfo}>내 정보</button>
          {/* 대여 현황에서 연체 일 표시되도록 */}
          <button onClick={fetchRentalRecords}>대여 현황 조회</button>
          <button>분실신고 내역 조회</button>
          <button onClick={handleApplyRecordsClick}>물품 신청 내역 조회</button>
        </div>

        <>
          {showInfo ? (
            <div className={styles.userInfoContainer}>
              <h2>사용자 정보</h2>
              <div>
                <div>학번: {userInfo.student_id}</div>
                <div>이메일: {userInfo.email}</div>
                <div>이름: {userInfo.name}</div>
                <div>전화번호: {userInfo.phoneNumber}</div>
                <div>비밀번호: {userInfo.password}</div>
                <div>학과: {userInfo.department}</div>
              </div>
            </div>
          ) : null}
        </>

        <>
          {showapplyRecord ? (
            <div className={styles.applyRecordsContainer}>
              <h2>물품 신청 내역</h2>
              {applyRecords.length > 0 ? (
                <ul className={styles.applyRecordsList}>
                  {applyRecords.map((record, index) => (
                    <li key={index} className={styles.applyRecordItem}>
                      <div className={styles.applyRecordInfo}>
                        <div>물품명: {record.itemName}</div>
                        <div>신청사유: {record.reason}</div>
                        <div>신청일자: {record.submissionDate}</div>
                      </div>
                      <button onClick={() => handleCancelApply(index)}>
                        신청 취소하기
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>물품 신청 내역이 없습니다.</p>
              )}
            </div>
          ) : null}
        </>

        <>
          {showRentalRecords ? (
            <div className={styles.itemContainer}>
              <h2>대여 현황</h2>
              {rentalRecords.length > 0 ? (
                <ul className={styles.applyRecordsList}>
                  {rentalRecords.map((item, index) => (
                    <li key={index} className={styles.applyRecordItem}>
                      <Item
                        item_id={item.item_id}
                        item_img={item.item_img}
                        name={item.name}
                        category_id={item.category_id}
                        status_id={item.status_id}
                      />
                      <div>대여일자: {item.timestamp}</div>
                      <button onClick={() => handleExtendRental(index)}>
                        연장하기
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>대여 현황이 없습니다.</p>
              )}
            </div>
          ) : null}
        </>
      </div>
    </>
  );
}

export default Private;
