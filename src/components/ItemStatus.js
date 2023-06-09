import React from "react";
import PropTypes from "prop-types";

function ItemStatus({ numOfAvailable }) {
  // 조건부 스타일링을 위한 변수 설정
  const containerStyle = {
    position: "relative",
    width: "80px",
    height: "25px",
    border: numOfAvailable === 0 ? "1px solid #6E6E6E" : "1px solid #1a73bc",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: numOfAvailable === 0 ? "#6E6E6E" : "#1a73bc", // status_id가 2인 경우에만 색상을 변경
  };

  const statusStyle = {
    position: "relative",
    fontFamily: "Gmarket Sans TTF",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "15px",
    lineHeight: "17px",
  };

  let statusText = "";
  let statusClassName = "";

  switch (numOfAvailable) {
    case 0:
      statusText = "예약 가능";
      statusClassName = "reservable";

    case 1:
      statusText = "대여 가능";
      statusClassName = "rentable";
      break;
    default:
      statusText = "알 수 없음";
      statusClassName = "unknown";
      break;
  }

  return (
    <div style={containerStyle}>
      <div style={statusStyle}>{statusText}</div>
    </div>
  );
}

ItemStatus.propTypes = {
  status_id: PropTypes.number.isRequired,
};

export default ItemStatus;
