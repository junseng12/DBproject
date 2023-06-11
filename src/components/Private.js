import React, { useState, useEffect } from "react";
import styles from "./Private.module.css";
import Item from "./Item";
import axios from "axios";
import img from "../assets/spinner.gif";

function Private({ isLoggedIn, changeLogInpage, loggedInUser }) {
  const [userInfo, setUserInfo] = useState(null);
  // const [showInfo, setShowInfo] = useState(false);
  //사용자 신청 내역 저장하는 변수
  // const [applyRecords, setApplyRecords] = useState([]);

  //사용자 대여 내역 저장하는 변수
  const [rentalRecords, setRentalRecords] = useState([]);
  const [showCondition, setShowCondition] = useState(false); // 새로운 변수 추가

  //사용자 예약 내역 저장하는 변수
  const [reserveData, setReserveData] = useState([]);

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 사용자 정보를 가져오는 로직 작성
    if (isLoggedIn) {
      // 데이터베이스에서 사용자 정보를 가져오는 API 호출 등의 로직을 수행
      // const user = loggedInUser;
      // setUserInfo(user);
      // console.log(user);
      fetchUserInfo();
      console.log(isLoggedIn);
    } else {
      setUserInfo(null); // 로그아웃한 경우 사용자 정보 초기화
    }
  }, [isLoggedIn]);

  // 내 정보 확인하는 함수
  // 대여 조회 API 함수

  // 예약 조회 API 함수 - 이거 찾아봐야 함

  useEffect(() => {
    // 내 정보 확인하는 함수
    if (showCondition === 0) {
      // fetchUserInfo();
      console.log(userInfo);
      // 대여 조회 API 함수
    } else if (showCondition === 1) {
      fetchRentalRecords();
      // 예약 조회 API 함수 - 이거 찾아봐야 함
    } else if (showCondition === 2) {
      fetchReserveRecords();
      console.log(showCondition);
    }
  }, [showCondition]);

  // 사용자 정보 조회 API 호출
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/user/info");

      if (response.status === 200) {
        const userData = response.data;

        setUserInfo(userData);
        // showUserInfo(true);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }

    setUserInfo({
      student_id: "202126878",
      name: "신수민",
      email: "tlsssm1212@ajou.ac.kr",
      phone_num: "010-9337-6537",
      department: "소프트웨어학과",
    });
    console.log(userInfo);
  };

  // 대여 조회 API 함수
  const fetchRentalRecords = async () => {
    try {
      const response = await axios.get("/rent/mylist");

      if (response.status === 200) {
        const rentalData = response.data;
        setRentalRecords(rentalData);

        //Rental한 내역 조회하도록 설정
        // setShowInfo(false);
        // setShowapplyRecord(false);
        // setShowRentalRecords(true);
      } else {
        // 대여 조회 API 요청이 실패한 경우
        console.error(response.data);
        console.error(response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }

    setRentalRecords([
      {
        item_id: 8,
        category_name: "마우스",
        start_date: "2023-06-08",
        end_date: "2023-06-15",
      },
      {
        item_id: 21,
        category_name: "보조배터리",
        start_date: "2023-06-08",
        end_date: "2023-06-15",
      },
    ]);
  };

  //대여 연장 API 함수
  const handleExtendRental = async (index) => {
    const confirmation = window.confirm("해당 물품 대여를 연장하시겠습니까?");

    if (confirmation) {
      try {
        const item = rentalRecords[index];
        const itemId = item.item_id;
        const response = await axios.get(`/rent/extend/${itemId}`);

        if (response.status === 200) {
          // 연장 성공
          // 세부 변경 필요
          const updatedRentalRecords = [...rentalRecords];
          updatedRentalRecords[index] = response.data.updatedItem;
          //어디에 변경?
          alert(response.data.msg);
        } else {
          alert(response.data.errorMessage);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // {
    //   "msg": "대여 연장이 완료되었습니다.",
    //   "status": 200
    // }
  };

  //예약 조회 API 함수
  const fetchReserveRecords = async () => {
    try {
      const response = await axios.get("/reserve/mylist");

      if (response.status === 200) {
        setReserveData(response.data);
      } else {
        // 예약 조회 API 요청이 실패한 경우
        console.error(response.data);
        console.error(response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }

    setReserveData([
      {
        reserve_id: 1,
        category_name: "보드게임",
      },
    ]);
    // 예약 목록 데이터를 처리하는 로직을 추가하세요
  };

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    changeLogInpage("Login"); // 로그인 페이지로 전환
    return null; // Private 컴포넌트 자체를 렌더링하지 않음
  }

  return (
    <>
      <div className={styles.sidebar}>
        {/* 버튼 별로 status_id에 따른 item들을 보이도록 함 */}
        <button
          className={showCondition === 0 ? styles.active : ""}
          onClick={() => {
            setShowCondition(0);
            console.log(showCondition);
          }}
        >
          내정보
        </button>
        <button
          className={showCondition === 1 ? styles.active : ""}
          onClick={() => {
            setShowCondition(1);
            console.log(showCondition);
          }}
        >
          대여목록
        </button>
        {/* 물품 추가 */}
        <button
          className={showCondition === 2 ? styles.active : ""}
          onClick={() => {
            setShowCondition(2);
            console.log(showCondition);
          }}
        >
          예약목록
        </button>
      </div>
      <></>
      <>
        <div className={styles.container}>
          {/* <div className={styles.menu}>
            <button onClick={fetchUserInfo}>내 정보</button>
            {/* 대여 현황에서 연체 일 표시되도록 */}
          {/* <button onClick={fetchRentalRecords}>대여목록</button>
            <button>예약목록</button>
            {/* <button onClick={handleApplyRecordsClick}>물품 신청 내역 조회</button> */}
          {/* </div> */}

          <>
            {showCondition === 0 ? (
              <div className={styles.userInfoContainer}>
                <h2>사용자 정보</h2>
                <div>
                  <div>학번: {userInfo.student_id}</div>
                  <div>이메일: {userInfo.email}</div>
                  <div>이름: {userInfo.name}</div>
                  <div>전화번호: {userInfo.phone_num}</div>
                  <div>학과: {userInfo.department}</div>
                </div>
              </div>
            ) : null}
          </>
          <>
            {showCondition === 1 ? (
              <div className={styles.itemGrid}>
                {rentalRecords.length > 0 ? (
                  <ul className={styles.applyRecordsList}>
                    {rentalRecords.map((item, index) => (
                      <li key={index} className={styles.applyRecordItem}>
                        {/* item 코드인데, 내부 설정 변경하기 위해 그냥 씀 */}
                        <div>
                          <img
                            src={img}
                            alt={img}
                            className={styles.item_img}
                          />
                          <div>
                            <div className={styles.item_name}>
                              <div className={styles.category_name}>
                                {item.category_name}
                              </div>

                              <div>대여일자: {item.start_date}</div>
                              <button onClick={() => handleExtendRental(index)}>
                                연장하기
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>대여 현황이 없습니다.</p>
                )}
              </div>
            ) : null}
          </>

          {/* [
                  {
                    "reserve_id": 1,
                    "category_name": "보드게임"
                }
            ] */}
          {/* 예약내역 */}
          <>
            {showCondition === 2 ? (
              <div className={styles.itemGrid}>
                {reserveData.map((item) => (
                  <div key={item.reserve_id} className={styles.itemContainer2}>
                    {/* item 코드인데, 내부 설정 변경하기 위해 그냥 씀 */}
                    <div>
                      <img src={img} alt={img} className={styles.item_img} />
                      <div>
                        <div className={styles.item_name}>
                          <div className={styles.category_name}>
                            예약물품명: {item.category_name}
                          </div>

                          {/* <div>${category_id}</div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        </div>
      </>
    </>
  );
}

export default Private;
