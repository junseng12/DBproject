import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const API_PORT = 8080; // 백엔드 서버의 포트 번호

// 백엔드 서버와의 통신을 위한 API 주소
const API_URL = `http://localhost:${API_PORT}/api`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
