import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Main from "./components/Main";
import Search from "./components/SearchForm";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import MainPage from "../pages/MainPage";
// import OtherPage from "../pages/OtherPage";
import Contents from "./pages/Contents.js";
import RegistrationForm from "./components/RegisterationForm.js";

function App() {
  return (
    <>
      <Header />
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </>
    </>
  );
}

export default App;

{
  /* <Router>
  <Switch>
    <Route path="../pages/MainPage" exact>
      {/* 다른 prop을 전달하며 MainPage 컴포넌트 렌더링 */
}
//       <MainPage isOtherPropVisibles={true} />
//     </Route>
//     <Route path="../pages/OtherPage" exact>
//       {/* 다른 prop을 전달하며 OtherPage 컴포넌트 렌더링 */}
//       <OtherPage isSomePropVisibles={true} />
//     </Route>
//   </Switch>
// </Router> */}
