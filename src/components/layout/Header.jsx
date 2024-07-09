import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../utils/CartContext";

const Header = () => {

  const { cartQty, wishlistQty } = useContext(CartContext);

  const navigate = useNavigate();

  // Reterive Value from localstorage
  const SessionUsername = localStorage.getItem('username');
  const LoginMessage = localStorage.getItem("loginmessage");

  if (LoginMessage !== null && LoginMessage !== "") {
    toast.success(LoginMessage, {
      toastId: "unique-login-toast",
    });
    localStorage.removeItem("loginmessage");
  }


  const handleLoginRedirect = () => {
    if (!SessionUsername) {
      navigate("/login");
    } else {
      navigate("/user-dashboard");
    }
  };


  return (
    <>
      <header className="pb-md-4 pb-0">
        <div className="top-nav top-header sticky-header">
          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-12">
                <div className="navbar-top">
                  <button className="navbar-toggler d-xl-none d-inline navbar-menu-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#primaryMenu">
                    <span className="navbar-toggler-icon">
                      <i className="fa-solid fa-bars" />
                    </span>
                  </button>
                  <Link to="/" className="web-logo nav-logo">
                    <img src="/assets/images/logo/logo.png" className="img-fluid blur-up lazyloaded" alt="logo" />
                  </Link>
                  <div className="middle-box">
                    <div className="search-box">
                      <div className="input-group">
                        <input type="search" className="form-control" placeholder="I'm searching for..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn" type="button" id="button-addon2" >
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                            <circle cx={11} cy={11} r={8} />
                            <line x1={21} y1={21} x2="16.65" y2="16.65" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rightside-box">
                    <div className="search-full">
                      <div className="input-group">
                        <span className="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search font-light">
                            <circle cx={11} cy={11} r={8} />
                            <line x1={21} y1={21} x2="16.65" y2="16.65" />
                          </svg>
                        </span>
                        <input type="text" className="form-control search-type" placeholder="Search here.." />
                        <span className="input-group-text close-search">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x font-light">
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <ul className="right-side-menu">
                      <li className="right-side">
                        <div className="delivery-login-box">
                          <div className="delivery-icon">
                            <div className="search-box">
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" >
                                <circle cx={11} cy={11} r={8} />
                                <line x1={21} y1={21} x2="16.65" y2="16.65" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="right-side">
                        <a href="!#" className="delivery-login-box">
                          <div className="delivery-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call">
                              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </div>
                          <div className="delivery-detail">
                            <h6>24/7 Delivery</h6>
                            <h5>+91 730 383 5254</h5>
                          </div>
                        </a>
                      </li>
                      <li className="right-side">
                        <Link to="/wishlist" className="btn p-0 position-relative header-wishlist">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          <span className="position-absolute top-0 start-100 translate-middle badge">{wishlistQty}</span>
                        </Link>
                      </li>
                      <li className="right-side">
                        <div className="header-badge">
                          <Link to="/cart" className="btn p-0 position-relative header-wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
                              <circle cx={9} cy={21} r={1} />
                              <circle cx={20} cy={21} r={1} />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span className="position-absolute top-0 start-100 translate-middle badge">{cartQty}</span>
                          </Link>
                        </div>
                      </li>
                      <li className="right-side">
                        <a href="javascript:void(0)" onClick={handleLoginRedirect}>
                          <div className="delivery-login-box">
                            <div className="delivery-icon onhover">
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx={12} cy={7} r={4} />
                              </svg>
                            </div>
                            <div className="delivery-detail onhover">
                              <h6>Welcome,</h6>
                              <h5>{SessionUsername || 'My Account'}</h5>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </header>
    </>
  );
};

export default Header;
