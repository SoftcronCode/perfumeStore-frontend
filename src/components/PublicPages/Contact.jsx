import React, { useState, useEffect } from "react";
import Breadcrumb from "../shared/Breadcrumb";
import { toast } from "react-toastify";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateMobileNumber,
} from "../Auth/Validation";

const Contact = () => {

  useEffect(() => {
    document.title = "Home Page | Zordik";
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    reason : "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
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
      case "firstname":
        setErrors({
          ...errors,
          firstname: validateFirstName(value),
        });
        break;
      case "lastname":
        setErrors({
          ...errors,
          lastname: validateLastName(value),
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value),
        });
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
      firstName : formData.firstname,
      lastName : formData.lastname,
      mobile : formData.mobileNumber,
      email : formData.email,
      message : formData.reason,
    };  

    try {

      const response = await fetchData(API_URLS.contactForm, requestBody);
      if (response.responseCode === 1) {

        toast.success(`${response.responseMessage}`, {
          toastId: "unique-success-toast",
        });  
        
        // To clear all input fields 
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          mobileNumber: "",
          reason: "",
        });

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
    <Breadcrumb pageName="Contact" />
      <section className="contact-box-section">
        <div className="container-fluid-lg">
          <div className="row g-lg-5 g-3">
            <div className="col-lg-6">
              <div className="title d-xxl-none d-block">
                <h2>Contact Us</h2>
              </div>
              <form onSubmit={handleFormSubmit}>  
                <div className="right-sidebar-box">
                <div className="row" >
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="custom-form">
                      <label
                        htmlFor="exampleFormControlInput"
                        className="form-label"
                      >
                        First Name
                      </label>
                      <div className="custom-input">
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Enter First Name"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          required
                        />
                        <i className="fa-solid fa-user" aria-required />
                      </div>
                      <span style={{ color: "red" }}>{errors.firstname}</span>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className=" custom-form">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Last Name
                      </label>
                      <div className="custom-input">
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          placeholder="Enter Last Name"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                        />
                        <i className="fa-solid fa-user" />
                      </div>
                      <span style={{ color: "red" }}>{errors.lastname}</span>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className=" custom-form">
                      <label
                        htmlFor="exampleFormControlInput2"
                        className="form-label"
                      >
                        Email Address
                      </label>
                      <div className="custom-input">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <i className="fa-solid fa-envelope" />
                      </div>
                      <span style={{ color: "red" }}>{errors.email}</span>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="custom-form">
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="form-label"
                      >
                        Phone Number
                      </label>
                      <div className="custom-input">
                        <input
                          type="tel"
                          className="form-control"
                          id="mobileNumber"
                          placeholder="Enter Your Phone Number"
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
                        <i className="fa-solid fa-mobile-screen-button" />
                      </div>
                      <span style={{ color: "red" }}>
                        {errors.mobileNumber}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label
                        htmlFor="exampleFormControlTextarea"
                        className="form-label"
                      >
                        Reason
                      </label>
                      <div className="custom-textarea">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea"
                          placeholder="Enter Your Message"
                          rows={6}
                          value={formData.reason}
                          onChange={handleChange}
                        />
                        <i className="fa-solid fa-message" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-animation btn-md fw-bold ms-auto" type="submit">
                  Send Message
                </button>
              </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="left-sidebar-box">
                <div className="row justify-content-center">
                  <div className="col-xl-12 d-none">
                    <div className="contact-image">
                      <img
                        src="/assets/images/inner-page/contact-us.png"
                        className="img-fluid blur-up lazyloaded"
                        alt="contact-img  "
                      />
                    </div>
                  </div>
                  <div className="col-xl-8">
                    <div className="contact-title">
                      <h3>Get In Touch</h3>
                    </div>
                    <div className="mb-5">
                    <h3 className="text-content-info">Please fill out all the details, and our executive will contact you shortly. Our working hours are from <b>9:00 AM to 7:00 PM</b>.
                    </h3>
                    </div>
                    <div className="contact-detail">
                      <div className="row g-4">
                        <div className="col-xxl-12 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-phone" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Phone</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>(+91) 7303835254</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-12 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-envelope" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Email</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>customercare@zordik.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-12 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-location-dot" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Address</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>
                                Shop No 2, Near Omex City, Near Shiv Mandir,
                                Near Shiv Mandir, Rohtak, Rohtak, Haryana,
                                124001
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container-fluid p-0">
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.121208731261!2d76.6194957873186!3d28.86501261042708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d84c7319a39fb%3A0x2a125088ca9b88af!2sZordik!5e0!3m2!1sen!2sin!4v1706172567912!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              title="map"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact;