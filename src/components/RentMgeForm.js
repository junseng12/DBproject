import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import Item from "./Item";
import img from "../assets/spinner.gif";
import ItemStatus from "./ItemStatus";
import axios from "axios";

//{items} 를 props 로 SearchForm에서 받아서 불러 와야 함
function RentMgeForm({ isLoggedIn, changeLogInpage, loggedInUser }) {
  //실제로는 Contents(=DB에서 item 관련 table) 컴포넌트를 import하여 보여줄 거임
  const [items, setItems] = useState([]);
  //현재 item이 나열되는 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  //페이지 당 표현될 수 있는 최대 item 수
  const itemsPerPage = 6;
  //물품 조회 종류(전체, 대여가능, 예약 가능)에 따른 filtering 조건
  const [showCondition, setshowCondition] = useState(0);

  // //사용자 정보 넣어놓기
  // const userInfo = loggedInUser;
  // const { student_id } = userInfo;

  //대여 현황 조회 API
  //연체 내역 조회 API
  //신고 내역 조회 API

  useEffect(() => {
    //전체 물품 조회
    if (showCondition === 0) {
      fetchItems();
      //신청 물품 조회
    } else if (showCondition === 1) {
      fetchAvailableRentalItems();
      //물품 추가
    } else if (showCondition === 2) {
      fetchAvailableReserveItems();
    }
  }, [showCondition]);

  // 전체 물품 조회 API 호출 함수
  const fetchItems = async () => {
    try {
      const response = await axios.get("/item/list");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 대여 가능한 물품 조회 API 호출 함수
  const fetchAvailableRentalItems = async () => {
    try {
      const response = await axios.get("/item/list/available-rental");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 예약 가능한 물품 조회 API 호출 함수
  const fetchAvailableReserveItems = async () => {
    try {
      const response = await axios.get("/item/list/available-reserve");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  //Item을 예약하는 로직
  async function handleRent(event, item) {
    const confirmation = window.confirm("물품 대여를 진행하시겠습니까?");

    if (confirmation) {
      // 대여 가능한 경우
      console.log("대여가능");

      // 대여 API 호출
      try {
        const response = await axios.post("/rent", {
          rent_id: "대여번호",
          start_date: new Date().toLocaleString(), // 대여 시각 (POST한 시각)
          end_date: new Date().toLocaleString() + 14, // 대여 시각으로부터 2주로 고정
          extension_num: 0,
          student_id: student_id,
          item_id: item.item_id,
        });

        if (response.status === 201) {
          // 대여 성공
          console.log(response.msg);

          // ITEM 테이블에서 해당 물품 상태 대여중으로 업데이트
          await axios.put(`/item/${item.item_id}`, {
            status_id: "대여 중",
          });
        } else {
          // 대여 실패
          console.log("대여에 실패했습니다.");
        }
      } catch (error) {
        // 오류 처리
        console.error("대여 과정에서 오류가 발생했습니다.", error);
      }
    }
  }

  async function handleReserve(event, item) {
    const confirmation = window.confirm("물품 추가를 진행하시겠습니까?");

    if (confirmation) {
      // 물품 추가 가능한 경우
      console.log("추가가능");

      // 물품 추가 API 호출
      try {
        const response = await axios.post("/rent", {
          reserve_id: "예약번호",
          student_id: student_id,
          category_id: item.category_id,
        });

        if (response.status === 201) {
          // 물품 추가 성공
          console.log(response.msg);
        } else {
          // 물품 추가 실패
          console.log("추가에 실패했습니다.");
        }
      } catch (error) {
        // 오류 처리
        console.error("추가 과정에서 오류가 발생했습니다.", error);
      }
    }
  }

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    changeLogInpage("Login"); // 로그인 페이지로 전환
    return null; // Private 컴포넌트 자체를 렌더링하지 않음
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        {/* 버튼 별로 status_id에 따른 item들을 보이도록 함 */}
        <button
          onClick={() => {
            setshowCondition(2);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          물품 조회
        </button>
        <button
          onClick={() => {
            setshowCondition(0);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          신청 내역
        </button>
        {/* 예약 가능한 물품 - 삭제인지 확인 가능한 것인지 */}
        <button
          onClick={() => {
            setshowCondition(1);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          물품 추가
        </button>
      </div>
      <div className={styles.itemGrid}>
        {currentItems.map((item) => (
          <div key={item.item_id} className={styles.itemContainer}>
            <Item
              item_id={item.item_id}
              item_img={item.item_img}
              name={item.name}
              category_id={item.category_id}
              status_id={item.status_id}
            />
            <div className={styles.item_status}>
              <ItemStatus status_id={item.status_id} />
              {item.status_id === 0 && (
                <button
                  className={styles.btn}
                  onClick={(event) => handleRent(event, item)}
                >
                  대여하기
                </button>
              )}
              {item.status_id === 1 && (
                <button
                  className={styles.btn}
                  onClick={(event) => handleReserve(event, item)}
                >
                  예약하기
                </button>
              )}
              {item.status_id === 2 && (
                <button className={styles.btn}>대여/예약불가</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={styles.btn}
          >
            이전 페이지
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={styles.btn}
          >
            다음 페이지
          </button>
        )}
      </div>
    </div>
  );
}

export default RentMgeForm;
