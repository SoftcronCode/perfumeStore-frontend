import React from "react";
import Slider from "react-slick";

const Blogs = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          fade: true,
        },
      },
    ],
  };

  return (
    <>
      {/* Blog Section Start */}
      <section className="blog-section">
        <div className="container-fluid-lg">
          <div className="title">
            <h2>Blogs</h2>
          </div>
          <div className="slider-3 arrow-slider">
            <Slider {...settings}>
              <div>
                <div className="blog-box ratio_50">
                  <div className="blog-box-image">
                    <a href="blog-detail.html">
                      <img
                        src="../assets/images/veg-3/blog/1.jpg"
                        className="img-fluid bg-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="blog-detail">
                    <label>Conversion rate optimization</label>
                    <a href="blog-detail.html">
                      <h2>A Fresh Perfume Online Marketplace...</h2>
                    </a>
                    <div className="blog-list">
                      <span>March 9, 2021</span>
                      <span>By Emil Kristensen</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="blog-box ratio_50">
                  <div className="blog-box-image">
                    <a href="blog-detail.html">
                      <img
                        src="../assets/images/veg-3/blog/2.jpg"
                        className="img-fluid bg-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="blog-detail">
                    <label>Email Marketing</label>
                    <a href="blog-detail.html">
                      <h2>A Fresh Perfume Online Marketplace...</h2>
                    </a>
                    <div className="blog-list">
                      <span>March 9, 2021</span>
                      <span>By Emil Kristensen</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="blog-box ratio_50">
                  <div className="blog-box-image">
                    <a href="blog-detail.html">
                      <img
                        src="../assets/images/veg-3/blog/3.jpg"
                        className="img-fluid bg-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="blog-detail">
                    <label>Conversion rate optimization</label>
                    <a href="blog-detail.html">
                      <h2>A Fresh Perfume Online Marketplace...</h2>
                    </a>
                    <div className="blog-list">
                      <span>March 9, 2021</span>
                      <span>By Emil Kristensen</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="blog-box ratio_50">
                  <div className="blog-box-image">
                    <a href="blog-detail.html">
                      <img
                        src="../assets/images/veg-3/blog/1.jpg"
                        className="img-fluid bg-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="blog-detail">
                    <label>Conversion rate optimization</label>
                    <a href="blog-detail.html">
                      <h2>A Fresh Perfume Online Marketplace...</h2>
                    </a>
                    <div className="blog-list">
                      <span>March 9, 2021</span>
                      <span>By Emil Kristensen</span>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      {/* Blog Section End */}
    </>
  );
};

export default Blogs;
