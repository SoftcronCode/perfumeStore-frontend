import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumb from "../shared/Breadcrumb";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";


const Login = () => {


  useEffect(() => {
    document.title = "Login Page | Zordik";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      passWord: password,
      sessionId: "string",
    };

    try {
      const response = await fetchData(API_URLS.login, requestBody);
      if (response.responseCode === 1) {
        const Data = JSON.parse(response.responseData)[0];

        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user_id", Data.id);
        localStorage.setItem("username",Data.name);
        localStorage.setItem("user_email",Data.email)
        localStorage.setItem("loginmessage",response.responseMessage);
        navigate("/");

      } else {
        toast.error(`Error: ${response.responseMessage}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Log In" />
      <section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="/assets/images/inner-page/log-in.png"
                  className="img-fluid"
                  alt="login-img"
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Welcome To Zordik</h3>
                  <h4>Log In Your Account</h4>
                </div>
                <div className="input-box">
                  <form className="row g-4" onSubmit={handleFormSubmit}>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="forgot-box">
                        <a href="!#" className="forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-animation w-100 justify-content-center"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
                <div className="other-log-in">
                  <h6>or</h6>
                </div>
                <div className="log-in-button">
                  <ul>
                    <li>
                      <a
                        href="https://www.google.com/"
                        className="btn google-button w-100"
                      >
                        <img
                          src="../assets/images/inner-page/google.png"
                          className="blur-up lazyloaded"
                          alt=""
                        />{" "}
                        Log In with Google
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sign-up-box">
                  <h4>Don't have an account?</h4>
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
