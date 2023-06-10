import React from "react";
import PropTypes from "prop-types";

function ItemStatus({ numOfAvailable }) {
  // 조건부 스타일링을 위한 변수 설정
  const containerStyle = {
    position: "relative",
    width: "80px",
    height: "25px",
    border: numOfAvailable === 0 ? "1px solid #BC1A8F" : "1px solid #1A73BC",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: numOfAvailable === 0 ? "#BC1A8F" : "#1A73BC", // status_id가 2인 경우에만 색상을 변경
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

  if (numOfAvailable === 0) {
    statusText = "예약 가능";
    statusClassName = "reservable";
  } else {
    statusText = "대여 가능";
    statusClassName = "rentable";
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
