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
  // const itemsPerPage = 6;
  //물품 조회 종류(전체, 대여가능, 예약 가능)에 따른 filtering 조건
  const [showCondition, setshowCondition] = useState(0);
  const [applyList, setApplyList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(items.length / itemsPerPage);

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
        setIsSubmitted(true);
      } catch (error) {
        console.log(error);
      }
      setIsSubmitted(true);
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
          물품 조회
        </button>
        <button
          onClick={() => {
            setshowCondition(1);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          신청 내역
        </button>
        {/* 예약 가능한 물품 - 삭제인지 확인 가능한 것인지 */}
        <button
          onClick={() => {
            setshowCondition(2);
            console.log(showCondition);
            setCurrentPage(1);
          }}
        >
          물품 추가
        </button>
      </div>
      <>
        {showCondition === 0 ? (
          <div className={styles.itemGrid}>
            {items.map((item) => (
              <div key={item.category_name} className={styles.itemContainer}>
                {/* <Item
                  item_id={item.item_id}
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
              </div>
            ))}
          </div>
        ) : null}

        {showCondition === 1 ? (
          <div className={styles.itemGrid}>
            {applyList.map((item) => (
              <div key={item.category_name} className={styles.itemContainer}>
                {/* <Item
                  item_id={item.item_id}
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
              </div>
            ))}
          </div>
        ) : null}

        {showCondition === 2 ? (
          <div className={styles.container2}>
            {isSubmitted ? (
              <div className={styles.notification}>
                <p>물품 추가가 완료되었습니다. 감사합니다.</p>
              </div>
            ) : (
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
            )}
          </div>
        ) : null}
      </>

      {/* <div className={styles.pagination}>
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
      </div> */}
    </div>
  );
}

export default ItemMgeForm;
