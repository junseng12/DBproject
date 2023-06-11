import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import Item from "./Item";
import img from "../assets/spinner.gif";
import ItemStatus from "./ItemStatus";
import axios from "axios";

//{items} 를 props 로 SearchForm에서 받아서 불러 와야 함
function RentMgeForm({ isLoggedIn, changeLogInpage }) {
  //실제로는 Contents(=DB에서 item 관련 table) 컴포넌트를 import하여 보여줄 거임
  const [items, setItems] = useState([]);
  //현재 item이 나열되는 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  //페이지 당 표현될 수 있는 최대 item 수
  const itemsPerPage = 6;
  //물품 조회 종류(전체, 대여가능, 예약 가능)에 따른 filtering 조건
  const [showCondition, setshowCondition] = useState(0);
  const [expiredItems, setExpiredItems] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  // //사용자 정보 넣어놓기
  // const userInfo = loggedInUser;
  // const { student_id } = userInfo;
  // const student_id = "202021062";
  //대여 현황 조회 API
  //연체 내역 조회 API
  //신고 내역 조회 API

  useEffect(() => {
    //대여 현황 조회 API
    if (showCondition === 0) {
      fetchRentItems();
      //연체 내역 조회 API
    } else if (showCondition === 1) {
      fetchExpiredRentItems();
      //신고 내역 조회 API
    } else if (showCondition === 2) {
      fetchLostItems();
    }
  }, [showCondition]);

  //대여 현황 조회 API - 관리자
  const fetchRentItems = async () => {
    try {
      const response = await axios.get("/rent/list");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // setItems([
    //   {
    //     item_id: 8,
    //     category_name: "마우스",
    //     student_id: "202126878",
    //     start_date: "2023-06-08",
    //     end_date: "2023-06-15",
    //   },
    //   {
    //     item_id: 21,
    //     category_name: "보조배터리",
    //     student_id: "202126878",
    //     start_date: "2023-06-08",
    //     end_date: "2023-06-15",
    //   },
    //   {
    //     item_id: 1,
    //     category_name: "충전기",
    //     student_id: "202126878",
    //     start_date: "2023-05-31",
    //     end_date: "2023-06-07",
    //   },
    //   {
    //     item_id: 13,
    //     category_name: "우산",
    //     student_id: "202326910",
    //     start_date: "2023-05-31",
    //     end_date: "2023-06-07",
    //   },
    //   {
    //     item_id: 28,
    //     category_name: "공학용 계산기",
    //     student_id: "202326910",
    //     start_date: "2023-05-30",
    //     end_date: "2023-06-06",
    //   },
    // ]);
    console.log(items);
  };

  // 연체 내역 조회 API
  const fetchExpiredRentItems = async () => {
    try {
      const response = await axios.get("/rent/expired");
      setExpiredItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setExpiredItems([
      {
        item_id: 13,
        category_name: "우산",
        student_id: "202326910",
        start_date: "2023-05-31",
        end_date: "2023-06-07",
        overdue: 4,
      },
      {
        item_id: 2,
        category_name: "충전기",
        student_id: "202326910",
        start_date: "2023-05-31",
        end_date: "2023-06-07",
        overdue: 4,
      },
      {
        item_id: 41,
        category_name: "보드게임",
        student_id: "202226412",
        start_date: "2023-05-31",
        end_date: "2023-06-07",
        overdue: 4,
      },
      {
        item_id: 42,
        category_name: "보드게임",
        student_id: "202226412",
        start_date: "2023-06-01",
        end_date: "2023-06-08",
        overdue: 3,
      },
      {
        item_id: 43,
        category_name: "보드게임",
        student_id: "202023442",
        start_date: "2023-06-02",
        end_date: "2023-06-09",
        overdue: 2,
      },
      {
        item_id: 44,
        category_name: "보드게임",
        student_id: "202023442",
        start_date: "2023-06-02",
        end_date: "2023-06-09",
        overdue: 2,
      },
    ]);
    console.log(expiredItems);
  };

  //신고 내역 조회 API
  const fetchLostItems = async () => {
    try {
      const response = await axios.get("/lost/list");
      setLostItems(response.data);
    } catch (error) {
      console.log(error);
    }

    // setLostItems([
    //   {
    //     item_id: 1,
    //     category_name: "충전기",
    //     student_id: "202126878",
    //     lost_date: "2023-06-08",
    //   },
    //   {
    //     item_id: 35,
    //     category_name: "머리끈",
    //     student_id: "202326910",
    //     lost_date: "2023-06-06",
    //   },
    //   {
    //     item_id: 14,
    //     category_name: "우산",
    //     student_id: "202326910",
    //     lost_date: "2023-06-06",
    //   },
    // ]);

    console.log(lostItems);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // async function handleReserve(event, item) {
  //   const confirmation = window.confirm("물품 추가를 진행하시겠습니까?");

  //   if (confirmation) {
  //     물품 추가 가능한 경우
  //     console.log("추가가능");

  //     물품 추가 API 호출
  //     try {
  //       const response = await axios.post("/rent", {
  //         reserve_id: "예약번호",
  //         student_id: student_id,
  //         category_id: item.category_id,
  //       });

  //       if (response.status === 201) {
  //         물품 추가 성공
  //         console.log(response.msg);
  //       } else {
  //         물품 추가 실패
  //         console.log("추가에 실패했습니다.");
  //       }
  //     } catch (error) {
  //       오류 처리
  //       console.error("추가 과정에서 오류가 발생했습니다.", error);
  //     }
  //   }
  // }

  //반납 승인 API
  const handleReturn = async (item) => {
    const confirmation = window.confirm("반납을 승인하시겠습니까?");

    if (confirmation) {
      try {
        const response = await axios.get(`/rent/return/${item.item_id}`);

        if (response.status === 200) {
          // 반납 승인 성공
          console.log(response.data.msg);
          // 반납 승인 후 대여 현황 다시 불러오기
          fetchRentItems();
        } else {
          // 반납 승인 실패
          console.log("반납 승인에 실패했습니다.");
        }
      } catch (error) {
        console.error("반납 승인 과정에서 오류가 발생했습니다.", error);
      }
    }
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
            setshowCondition(0);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          대여현황
        </button>
        <button
          className={showCondition === 1 ? styles.active : ""}
          onClick={() => {
            setshowCondition(1);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          연체내역
        </button>
        {/* 예약 가능한 물품 - 삭제인지 확인 가능한 것인지 */}
        <button
          className={showCondition === 2 ? styles.active : ""}
          onClick={() => {
            setshowCondition(2);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          신고내역
        </button>
      </div>
      <></>
      <div className={styles.container}>
        <div>
          {/* 대여 현황*/}
          <>
            {showCondition === 0 ? (
              <div>
                {/* <Item
                item_id={item.item_id}
                item_img={item.item_img}
                name={item.name}
                category_id={item.category_id}
                status_id={item.status_id}
              /> */}
                {currentItems.map((item) => (
                  <div key={item.item_id} className={styles.itemContainer2}>
                    <div className={styles.applyitem}>
                      물품아이디 : {item.item_id}
                    </div>
                    <div> / 대여자 : {item.student_id}</div>
                    <button
                      onClick={() => handleReturn(item)}
                      style={{ float: "left" }}
                    >
                      반납승인
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </>
          {/* 연체내역 */}
          {/* "item_id": 13,
    "category_name": "우산",
    "student_id": "202326910",
    "start_date": "2023-05-31",
    "end_date": "2023-06-07" */}
          <>
            {showCondition === 1 ? (
              <div className={styles.itemGrid}>
                {expiredItems.map((item) => (
                  <div key={item.item_id} className={styles.itemContainer}>
                    {/* item 코드인데, 내부 설정 변경하기 위해 그냥 씀 */}
                    <div>
                      <img src={img} alt={img} className={styles.item_img} />
                      <div>
                        <div className={styles.item_name}>
                          <div className={styles.category_name}>
                            {item.category_name}
                          </div>
                          <div>예상반납기간: {item.end_date}</div>
                          <div className={styles.expireditem}>
                            {item.overdue} 일 째 연체 중
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
          {/* 신고내역 */}
          <>
            {showCondition === 2 ? (
              <div>
                {lostItems.map((item) => (
                  <div key={item.item_id} className={styles.itemContainer2}>
                    <div className={styles.applyitem}>
                      물품아이디 : {item.item_id} / 분실자 : {item.student_id}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
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
      </div>
    </>
  );
}

export default RentMgeForm;
