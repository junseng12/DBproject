import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import Item from "./Item";
import img from "../assets/spinner.gif";
import ItemStatus from "./ItemStatus";
import axios from "axios";

//{items} 를 props 로 SearchForm에서 받아서 불러 와야 함
function SearchForm({ isLoggedIn, changeLogInpage, loggedInUser }) {
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
  const student_id = "12341234";
  //페이지를 변경하는 함수

  useEffect(() => {
    //전체 물품 조회
    if (showCondition === 0) {
      fetchItems();
      //대여 가능한 물품 조회
    } else if (showCondition === 1) {
      fetchAvailableRentalItems();
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

    setItems([
      {
        category_name: "마우스",
        numOfTotal: 5,
        numOfAvailable: 5,
      },
      {
        category_name: "충전기",
        numOfTotal: 7,
        numOfAvailable: 5,
      },
      {
        category_name: "우산",
        numOfTotal: 8,
        numOfAvailable: 6,
      },
      {
        category_name: "보조배터리",
        numOfTotal: 7,
        numOfAvailable: 6,
      },
      {
        category_name: "공학용 계산기",
        numOfTotal: 7,
        numOfAvailable: 6,
      },
      {
        category_name: "머리끈",
        numOfTotal: 3,
        numOfAvailable: 2,
      },
      {
        category_name: "보드게임",
        numOfTotal: 4,
        numOfAvailable: 0,
      },
    ]);
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

      // Private 페이지로 이동
      changeLogInpage("Private");
    }
  }

  async function handleReserve(event, item) {
    const confirmation = window.confirm("물품 예약을 진행하시겠습니까?");

    if (confirmation) {
      // 예약 가능한 경우
      console.log("예약가능");
      // 예약 처리 로직
      changeLogInpage("Private");

      // 예약 API 호출
      try {
        const response = await axios.post("/rent", {
          reserve_id: "예약번호",
          student_id: student_id,
          category_id: item.category_id,
        });

        if (response.status === 201) {
          // 예약 성공
          console.log(response.msg);
        } else {
          // 예약 실패
          console.log("예약에 실패했습니다.");
        }
      } catch (error) {
        // 오류 처리
        console.error("예약 과정에서 오류가 발생했습니다.", error);
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
            setshowCondition(0);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          전체
        </button>
        <button
          onClick={() => {
            setshowCondition(1);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          대여 가능한 물품
        </button>
        {/* 예약 가능한 물품 - 삭제인지 확인 가능한 것인지 */}
        <button
          onClick={() => {
            setshowCondition(2);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          예약 가능한 물품
        </button>
      </div>
      <div className={styles.itemGrid}>
        {currentItems.map((item) => (
          <div key={item.category_name} className={styles.itemContainer}>
            {/* <Item
              category_name={item.item_id}
              item_img={item.item_img}
              name={item.name}
              category_id={item.category_id}
              status_id={item.status_id}
            /> */}
            <Item
              category_name={item.category_name}
              item_img={img}
              numOfTotal={item.numOfTotal}
              numOfAvailable={item.numOfAvailable}
            />
            <div className={styles.item_status}>
              <ItemStatus numOfAvailable={item.numOfAvailable} />
              {item.numOfAvailable > 0 && (
                <button
                  className={styles.btn}
                  onClick={(event) => handleRent(event, item)}
                >
                  대여하기
                </button>
              )}
              {item.numOfAvailable === 0 && (
                <button
                  className={styles.btn}
                  onClick={(event) => handleReserve(event, item)}
                >
                  예약하기
                </button>
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

export default SearchForm;
