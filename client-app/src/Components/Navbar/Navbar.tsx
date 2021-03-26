import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useWindowDimensions from "../../Hooks/WindowSizeHook";
import { useStore } from "../../Store/store";
import ButtonPrimary from "../../UI/Button/ButtonPrimary";
import "./Navbar.css";
import { history } from "../../index";

function Navbar() {
  const { uiStore, userStore } = useStore();

  const { mobileMenu, setMobileMenu } = uiStore;

  const { isLoggedIn, user } = userStore;

  const { width } = useWindowDimensions();

  useEffect(() => {
    // for fixing a bug when the window is resized back to original, the mobile menu remains attached
    if (width >= 992) {
      setMobileMenu(false);
    }
    // disabling the scroll when the mobile menu is visible

    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [setMobileMenu, width, mobileMenu]);

  return (
    <div id="header-wrap" className="is-clearfix">
      <header
        id="header"
        // in order to keep the navigation menu's position fixed when scrolled or on mobile to prevent glitchy padding-related 'bouncing'
        className={`site-header `}
      >
        <div id="header-inner" className="site-header-inner container">
          <div className="level top">
            <div className="level-left">
              <div id="header-logo" className="site-logo ">
                <div id="logo-inner" className="site-logo-inner">
                  <Link to="/">
                    <img alt="logistics" src="images/logo2.png" />
                    <span className="logo-text">Invoice App</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="level-right-hamburger" style={{ display: "none" }}>
              <div
                className={`hamburger-menu ${
                  mobileMenu ? `expanded` : undefined
                } `}
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <span className="hamburger-menu-icon"></span>
              </div>
            </div>
          </div>
          <div className="level main-menu">
            <div className="level-left">
              <div className="nav-wrap">
                <nav className="main-navigation left">
                  <ul className="menu">
                    <li className="menu-down-icon">
                      <NavLink to="/" exact activeClassName="active">
                        Home
                      </NavLink>
                    </li>
                    {userStore.isLoggedIn && userStore.user?.isAdmin && (
                      <>
                        <li className="menu-down-icon">
                          <NavLink
                            to="/projects"
                            exact
                            activeClassName="active"
                          >
                            Projects
                          </NavLink>
                        </li>
                        <li className="menu-down-icon">
                          <NavLink to="/clients" exact activeClassName="active">
                            Clients
                          </NavLink>
                        </li>
                        <li className="menu-down-icon">
                          <NavLink to="/users" exact activeClassName="active">
                            Users
                          </NavLink>
                        </li>
                      </>
                    )}
                    {userStore.isLoggedIn && !userStore.user?.isAdmin && (
                      <>
                        <li className="menu-down-icon">
                          <NavLink
                            to="/invoices"
                            exact
                            activeClassName="active"
                          >
                            Invoices
                          </NavLink>
                        </li>
                      </>
                    )}
                    {!isLoggedIn && (
                      <li className="menu-down-icon">
                        <NavLink to="/userLogin" exact activeClassName="active">
                          Login
                        </NavLink>
                      </li>
                    )}
                    {isLoggedIn && (
                      <li className="menu-down-icon">
                        <span onClick={() => userStore.logout()}>Logout</span>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="level-right">
              <ul className="header-menu-icons social">
                <li>
                  Welcome{" "}
                  {isLoggedIn && (
                    <span>
                      {user?.name} {user?.surname}
                    </span>
                  )}{" "}
                  !
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div
        id="mobile__menu"
        className={`overlay ${mobileMenu && "overlay--active"}`}
      >
        {mobileMenu && (
          <div className="overlay__content">
            <Container>
              <ul>
                <li>
                  <NavLink onClick={()=>setMobileMenu(false)} exact to="/">
                    Home<i className="fas fa-chevron-right"></i>
                  </NavLink>
                </li>
                {userStore.isLoggedIn && userStore.user?.isAdmin &&
                  <>
                   <li>
                  <NavLink onClick={()=>setMobileMenu(false)} exact to="/projects">
                    Projects<i className="fas fa-chevron-right"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setMobileMenu(false)} exact to="/clients">
                    Clients<i className="fas fa-chevron-right"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setMobileMenu(false)} exact to="/users">
                    Users<i className="fas fa-chevron-right"></i>
                  </NavLink>
                </li>
                  </>
                
                }
               {
                 userStore.isLoggedIn && !userStore.user?.isAdmin
                 &&
                 <li>
                 <NavLink onClick={()=>setMobileMenu(false)} exact to="/invoices">
                   Invoices<i className="fas fa-chevron-right"></i>
                 </NavLink>
               </li>
               }
                <li>
                  {userStore.isLoggedIn ?
                  <ButtonPrimary text='Logout' clickEvent={ ()=>{
                    userStore.logout();
                    setMobileMenu(false);
                  }}  type='button' />  
                  : <ButtonPrimary text='Login' clickEvent={ ()=>{setMobileMenu(false);history.push('/userLogin')}}  type='button' />
                }
                </li>
              </ul>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(Navbar);
