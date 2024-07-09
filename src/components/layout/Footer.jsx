import React from "react";
import { Link } from "react-router-dom";
import BackToTop from "./BackToTop";

const Footer = () => {
  return (
    <>
      <footer className="section-t-space footer-section-2">
        <div className="container-fluid-lg">
          <div className="main-footer">
            <div className="row g-md-4 gy-sm-5 gy-2">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Link to="/" className="foot-logo">
                  <img
                    src="/assets/images/logo/logo.png"
                    className="img-fluid"
                    alt=""
                  />
                </Link>
                <p className="information-text">
                  www.zordik.com is a well renowned and fast growing ecommerce
                  website due to its unique business model. www.zordik.com
                  started in 2019 in Ecommerce business, but backed by skills
                  and customer relations since 1990 in Footwear business.
                </p>
                <h4 className="mt-3 fw-bold">Follow Us :</h4>
                <ul className="social-icon">
                  <li>
                    <a href="www.facebook.com">
                      {" "}
                      <i className="fab fa-facebook-f" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="www.goolge.com">
                      {" "}
                      <i className="fab fa-google" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="www.twitter.com">
                      {" "}
                      <i className="fab fa-twitter" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="www.instagram.com">
                      {" "}
                      <i className="fab fa-instagram" />{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xxl-2 col-xl-4 col-sm-6">
                <div className="footer-title">
                  <h4>About Zordik</h4>
                </div>
                <ul className="footer-list footer-contact mb-sm-0 mb-3">
                  <li>
                    <Link className="footer-contain-2" to="/about-us">
                      <i className="fas fa-angle-right" /> About Us{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Contact Us{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Terms &amp; Coditions{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Careers{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Latest Blog{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-xxl-2 col-xl-4 col-sm-6">
                <div className="footer-title">
                  <h4>Useful Link</h4>
                </div>
                <ul className="footer-list footer-contact mb-sm-0 mb-3">
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Your Order{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Your Account{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Track Orders{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Your Wishlist{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> FAQs{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xxl-2 col-xl-4 col-sm-6">
                <div className="footer-title">
                  <h4>Categories</h4>
                </div>
                <ul className="footer-list footer-contact mb-sm-0 mb-3">
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> Premium Perfumes{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> For Men{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> For Women{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> For Both{" "}
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="footer-contain-2">
                      {" "}
                      <i className="fas fa-angle-right" /> For kids{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <div className="footer-title">
                  <h4>Store infomation</h4>
                </div>
                <ul className="footer-address footer-contact">
                  <li>
                    <a href="!#">
                      <div className="inform-box flex-start-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-map-pin"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx={12} cy={10} r={3} />
                        </svg>
                        <p>
                          Shop No 2, Near Omex City, Near Shiv Mandir, Near Shiv
                          Mandir, Rohtak, Rohtak, Haryana, 124001
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="!#">
                      <div className="inform-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-phone"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <p>Call us: +91 7303835254</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="!#">
                      <div className="inform-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-mail"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <p>Email Us: customercare@zordik.com</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sub-footer section-small-space">
            <div className="left-footer">
              <p>Copyright © 2024 By Zordik. All Rights Reserved.</p>
            </div>
            <div className="right-footer">
              <p>
                {" "}
                Design and Mantain By{" "}
                <a href="https://www.softcron.com">Softcron Technology</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
};

export default Footer;
