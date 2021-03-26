import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { store, StoreContext } from "./Store/store";
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ScrollToTop from './Layout/ScrollToTop';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.min.css'


export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
   <Router history={history}>
      <ScrollToTop/>
    <App />
    </Router >
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
