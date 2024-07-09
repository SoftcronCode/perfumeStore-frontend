import React from "react";

const NewsLetter = () => {
  return (
    <>
      {/* Newsletter Section Start */}
      <section className="newsletter-section-2 section-b-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div
                className="newsletter-box hover-effect bg-size d-block bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("../assets/images/veg-3/banner/5.jpeg")',
                  backgroundPosition: "top",
                }}
              >
                <img
                  src="../assets/images/veg-3/shape/background.png"
                  className="img-fluid bg-img d-none"
                  alt=""
                />
                <div className="row">
                  <div className="col-xxl-8 col-xl-7">
                    <div className="newsletter-detail p-center-left text-white">
                      <div>
                        <h2>Subscribe to the newsletter</h2>
                        <h4>
                          Join our subscribers list to get the latest news,
                          updates and special offers delivered directly in your
                          inbox.
                        </h4>
                        <form className="row g-2 mt-4 newsletter-form">
                          <div className="col-8">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="col-sm-2 col-4">
                            <button
                              type="submit"
                              className="btn bg-white theme-color btn-md fw-500 submit-button w-100 h-100"
                            >
                              Subscribe
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xxl-4 col-xl-5 d-xl-block d-none">
                    <div className="shape-box">
                      <img
                        src="../assets/images/veg-3/shape/basket.png"
                        alt=""
                        className="img-fluid image-1"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section End */}
    </>
  );
};

export default NewsLetter;
