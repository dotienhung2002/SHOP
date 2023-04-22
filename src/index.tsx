import { store } from "@Redux/storeConfig/store";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./assets/scss/index.scss";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const LazyApp = lazy(() => import("./App"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LazyApp />
      <ToastContainer newestOnTop pauseOnHover hideProgressBar />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
