import React from "react";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter/AppRouter";

import "./style/style.scss";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer/>
    </>
  );
}

export default App;
