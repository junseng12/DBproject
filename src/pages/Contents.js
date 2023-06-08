import Item from "../components/Item.js";
import styles from "./Contents.module.css";
import React, { useState, useEffect } from "react";
import Loading from "../components/Loading.js";

// 조건 부 렌더링을 통해 이 Contents를 나타낼 Page는
function Contents() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const getitems = async () => {
  //   const response = await fetch(
  //     //물품 정보 Data 받아올 주소
  //     "https://yts.mx/api/v2/list_items.json?minimum_rating=9&sort_by=year"
  //   );
  //   const json = await response.json();
  //   setItems(json.data.items);
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   getitems();
  // }, []);
  setItems([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
  setLoading(false);

  console.log(items);
  return (
    <div className={styles.container}>
      {loading ? (
        <Loading /> // Loading이 true면 컴포넌트를 띄우고, false면 null(빈 값)처리 하여 컴포넌트 숨김
      ) : (
        // {loading ? (
        //   <div className={styles.loader}>
        //     <span>Loading...</span>
        //   </div>
        // ) : (
        //여기 item proptype에 맞게 변형
        <div className={styles.items}>
          {items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              year={item.year}
              coverImg={item.medium_cover_image}
              title={item.title}
              summary={item.summary}
              genres={item.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Contents;
