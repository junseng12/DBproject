import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import Item from "./Item";
import img from "../assets/spinner.gif";
import ItemStatus from "./ItemStatus";
import axios from "axios";

//{items} 를 props 로 SearchForm에서 받아서 불러 와야 함
function ItemMgeForm({ isLoggedIn, changeLogInpage, loggedInUser }) {
  //실제로는 Contents(=DB에서 item 관련 table) 컴포넌트를 import하여 보여줄 거임
  const [items, setItems] = useState([]);
  //현재 item이 나열되는 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // //페이지 당 표현될 수 있는 최대 item 수
  const itemsPerPage = 9;
  //물품 조회 종류(전체, 대여가능, 예약 가능)에 따른 filtering 조건
  const [showCondition, setShowCondition] = useState(0);
  const [applyList, setApplyList] = useState([]);

  // //사용자 정보 넣어놓기
  // const userInfo = loggedInUser;
  // const { student_id } = userInfo;
  const [itemName, setItemName] = useState("");
  const [number, setNumber] = useState(0);
  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  //물품 조회 API
  //물품 삭제 API
  //신청 내역 조회 API
  //물품 추가 조회 API

  useEffect(() => {
    //전체 물품 조회
    if (showCondition === 0) {
      fetchItems();
      //신청 물품 조회
    } else if (showCondition === 1) {
      fetchApplyList();
      console.log(applyList);
      //물품 추가
    } else if (showCondition === 2) {
      console.log(itemName);
      // 새로 item 불러옴
      fetchItems();
    }
  }, [showCondition]);

  // 전체 물품 조회 API 호출 함수 - 관리자
  const fetchItems = async () => {
    try {
      const response = await axios.get("/item/list/admin");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // setItems([
    //   {
    //     item_id: 1,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 2,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 3,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 4,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 5,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 6,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 7,
    //     category_name: "충전기",
    //   },
    //   {
    //     item_id: 8,
    //     category_name: "마우스",
    //   },
    //   {
    //     item_id: 9,
    //     category_name: "마우스",
    //   },
    //   {
    //     item_id: 10,
    //     category_name: "마우스",
    //   },
    //   {
    //     item_id: 11,
    //     category_name: "마우스",
    //   },
    //   {
    //     item_id: 12,
    //     category_name: "마우스",
    //   },
    //   {
    //     item_id: 13,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 14,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 15,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 16,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 17,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 18,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 19,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 20,
    //     category_name: "우산",
    //   },
    //   {
    //     item_id: 21,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 22,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 23,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 24,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 25,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 26,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 27,
    //     category_name: "보조배터리",
    //   },
    //   {
    //     item_id: 28,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 29,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 30,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 31,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 32,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 33,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 34,
    //     category_name: "공학용 계산기",
    //   },
    //   {
    //     item_id: 35,
    //     category_name: "머리끈",
    //   },
    //   {
    //     item_id: 36,
    //     category_name: "머리끈",
    //   },
    //   {
    //     item_id: 37,
    //     category_name: "머리끈",
    //   },
    //   {
    //     item_id: 41,
    //     category_name: "보드게임",
    //   },
    //   {
    //     item_id: 42,
    //     category_name: "보드게임",
    //   },
    //   {
    //     item_id: 43,
    //     category_name: "보드게임",
    //   },
    //   {
    //     item_id: 44,
    //     category_name: "보드게임",
    //   },
    // ]);
  };

  // 신청 물품 조회 API 호출 함수 - 관리자
  const fetchApplyList = async () => {
    try {
      const response = await axios.get("/apply/list");
      setApplyList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // setApplyList([
    //   {
    //     apply_id: 1,
    //     apply_name: "무선 마우스",
    //     reason: "202126878",
    //     link: "손목 아파요",
    //     student_id:
    //       "https://www.lifesum.co.kr/goods/goods_view.php?goodsNo=1000000251&gclid=CjwKCAjw1YCkBhAOEiwA5aN4AXO2hbgVEJZ0B438Pz0zE-79ZQZIN3iXgs3iDdQcq4wALk7jH-4Q4BoCS7sQAvD_BwE",
    //   },
    //   {
    //     apply_id: 2,
    //     apply_name: "안경닦이",
    //     reason: "202126878",
    //     link: "",
    //     student_id: "",
    //   },
    //   {
    //     apply_id: 5,
    //     apply_name: "슬리퍼",
    //     reason: "202126878",
    //     link: "",
    //     student_id: "",
    //   },
    // ]);

    console.log(applyList);
  };

  // 물품 삭제 API 호출 함수
  const deleteItem = async (item) => {
    try {
      const response = await axios.delete(`/item/delete/${item.item_id}`);
      console.log(response.data);
      // 물품 삭제 성공 시 다른 동작을 수행할 수 있습니다.
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

  //물품 추가 조회 API - 관리자
  async function handleAddItem(event, item) {
    const confirmation = window.confirm("물품 추가을 진행하시겠습니까?");

    if (confirmation) {
      // 추가 가능한 경우
      console.log("추가가능");

      // 추가 API 호출
      try {
        const response = await axios.post(`/item/add/${item.itemName}`);
        console.log(response.data);
        // 물품 추가 성공 시 추가한 물품을 신청 내역에 업데이트하거나 다른 동작을 수행할 수 있습니다.
        // fetchRentalHistory();
        alert("물품 추가가 완료되었습니다.");
      } catch (error) {
        console.log(error);
      }

      alert("물품 추가가 완료되었습니다.");
    }
  }

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
            setCurrentPage(1);
          }}
        >
          물품조회
        </button>
        <button
          className={showCondition === 1 ? styles.active : ""}
          onClick={() => {
            setShowCondition(1);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          신청내역
        </button>
        {/* 물품 추가 */}
        <button
          className={showCondition === 2 ? styles.active : ""}
          onClick={() => {
            setShowCondition(2);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          물품추가
        </button>
      </div>
      <></>
      <div className={styles.container}>
        {/* 물품 조회 */}
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
                    물품아이디 : {item.item_id} 물품명 : {item.category_name}
                  </div>
                  <button
                    onClick={() => deleteItem(item)}
                    style={{ float: "left" }}
                  >
                    물품삭제
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </>
        <>
          {/* 신청 내역  조회 */}
          {showCondition === 1 ? (
            <div>
              {applyList.map((item) => (
                <div key={item.apply_id} className={styles.itemContainer2}>
                  <div className={styles.applyitem}>
                    물품명 : {item.apply_name} 신청사유 : {item.reason}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
        <>
          {/* 물품 추가 */}
          {showCondition === 2 ? (
            <div className={styles.container2}>
              <form onSubmit={handleAddItem}>
                <div className={styles.line}>
                  <label className={styles.label}>물품명:</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={handleItemNameChange}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.label}>수량:</label>
                  <input
                    type="text"
                    value={number}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className={styles.line}>
                  <button type="submit" className={styles.btn2}>
                    추가하기
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </>

        {showCondition !== 2 ? (
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
        ) : null}
      </div>
    </>
  );
}

export default ItemMgeForm;
