import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "./Store/store";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import PreLoader from "./UI/PreLoader/PreLoader";
import Login from "./Components/Login/Login";
import { Route } from "react-router";
import Switch from "react-bootstrap/esm/Switch";
import Users from "./Components/Users/Users";
import Projects from "./Components/Projects/Projects";
import Clients from "./Components/Clients/Clients";
import ModalContainer from "./UI/Modal/ModalContainer";
import Invoice from "./Components/Invoices/Invoice";
import Dashboard from "./Components/DashBoard/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const { uiStore, commonStore, userStore } = useStore();

  const { handleScroll, preLoader, setPreLoader } = uiStore;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (commonStore.token) {
      userStore.getUser().finally(() => uiStore.setPreLoader(false));
    } else {
      uiStore.setPreLoader(false);
    }
  }, [commonStore, handleScroll, setPreLoader, uiStore, userStore]);

  return (
    <>
      <ToastContainer position="bottom-right" />

      {preLoader && <PreLoader />}
      {!preLoader&&
      <>
      
      <ModalContainer />
      <Navbar />
      <Switch>
        <Route exact path="/userLogin" component={Login} />
        {userStore.isLoggedIn && userStore.user?.isAdmin && (
          <>
            <Route exact path="/users" component={Users} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/invoices" component={Invoice} />
          </>
        )}
        {userStore.isLoggedIn && !userStore.user?.isAdmin &&
          <Route exact path="/invoices" component={Invoice} />
        }
        <Route exact path="/" component={Dashboard} />
      </Switch>
      <Footer />
      </>}
    </>
  );
}

export default observer(App);
