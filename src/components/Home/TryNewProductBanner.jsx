import React from "react";

const TryNewProductBanner = () => {
  return (
    <>
      {/* Try Our New Section Start  */}
      <section className="banner-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div
                className="banner-contain-3 section-b-space section-t-space hover-effect bg-size bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("../assets/images/veg-3/banner/5.jpeg")',
                }}
              >
                <img
                  src="../assets/images/veg-3/banner/3.png"
                  className="img-fluid bg-img"
                  alt=""
                  style={{ display: "none" }}
                />
                <div className="banner-detail p-center text-dark position-relative text-center p-0">
                  <div>
                    <h4 className="ls-expanded text-uppercase  text-white">
                      Try Our New
                    </h4>
                    <h2 className="my-3 text-white">
                      100% Organic, Best Quality Perfumes
                    </h2>
                    <h4 className="text-content fw-300">Unbeatable Prices</h4>
                    <button className="btn theme-bg-color mt-sm-4 btn-md mx-auto text-white fw-bold">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Try Our New Section end */}
    </>
  );
};

export default TryNewProductBanner;
