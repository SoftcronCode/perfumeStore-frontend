import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumb from "../shared/Breadcrumb";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";
import {
  validateFullname,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateMobileNumber,
} from "./Validation";

const Signup = () => {

  const navigate = useNavigate(); 

  useEffect(() => {
    document.title = "SignUp | Zordik";
  }, []);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validation logic
    switch (name) {
      case "fullname":
        setErrors({
          ...errors,
          fullname: validateFullname(value),
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value),
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value),
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          confirmPassword: validateConfirmPassword(value, formData.password),
        });
        break;
      case "referralCode":
        // Add referral code validation logic if needed
        break;
      case "mobileNumber":
        setErrors({
          ...errors,
          mobileNumber: validateMobileNumber(value),
        });
        break;
      default:
        break;
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name : formData.fullname,
      email : formData.email,
      phone : formData.mobileNumber,
      password : formData.password,
      referralCode : formData.referralCode || 0,
      sponsoredBy : 0,
    };  

    try {
      const response = await fetchData(API_URLS.signup, requestBody);
      if (response.responseCode === 1) {

        toast.success(`${response.responseMessage}`, {
          toastId: "unique-success-toast",
        });

        navigate("/login");

      } else {
        toast.error(`Error: ${response.responseMessage}`, {
          toastId: "unique-error-toast",
        });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        toastId: "unique-error-toast",
      });
    }
  };

  return (
    <>
    <Breadcrumb pageName="SignUp" />
      <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="/assets/images/inner-page/sign-up.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 me-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Welcome To Zordik</h3>
                  <h4>Create New Account</h4>
                </div>

                <div className="input-box">
                  <form className="row g-4" onSubmit={handleFormSubmit}>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input type="text"
                          className="form-control"
                          id="fullname"
                          placeholder="Full Name"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="fullname">Full Name</label>
                        <span className="position-absolute" style={{ color: "red" }}>{errors.fullname}</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">Email Address</label>
                        <span className="position-absolute" style={{ color: "red" }}>{errors.email}</span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="password">Password</label>
                        <span className="position-absolute" style={{ color: "red" }}>{errors.password}</span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <span className="position-absolute" style={{ color: "red" }}>
                          {errors.confirmPassword}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="referralCode"
                          placeholder="Referal Code"
                          name="referralCode"
                          value={formData.referralCode}
                          onChange={handleChange}
                        />
                        <label htmlFor="referralCode">Referal Code</label>
                        <span className="position-absolute" style={{ color: "red" }}>
                          {errors.referralCode}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="mobileNumber"
                          placeholder="Mobile Number"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          required
                          onKeyDown={(e) => {
                            if (e.target.value.length >= 10 && e.key !== 'Backspace') {
                              e.preventDefault();
                            }
                          }}
                        />
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <span className="position-absolute" style={{ color: "red" }}>
                          {errors.mobileNumber}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="htmlForgot-box">
                        <div className="form-check ps-0 m-0 remember-box">
                          <input
                            className="checkbox_animated check-box"
                            type="checkbox"
                            id="flexCheckDefault"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            I agree with
                            <span>Terms</span> and <span>Privacy</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-animation w-100" type="submit">
                        Sign Up
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
                        href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                        className="btn google-button w-100"
                      >
                        <img
                          src="../assets/images/inner-page/google.png"
                          className="blur-up lazyload"
                          alt=""
                        />
                        Sign up with Google
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sign-up-box">
                  <h4>Already have an account?</h4>
                  <Link to="/login">Log In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
