import React, { useState, useEffect } from "react";
import Slider from "react-slick";

const DealOfTheDay = () => {
  //----------- Slider Code Start---------------
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          fade: true,
        },
      },
    ],
  };
  //--------- Slider Code End ---------------

  //----------Timer Code Start -----------------
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2024-01-31T00:00:00Z"); // Replace with your target date
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      const daysValue = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursValue = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesValue = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsValue = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setDays(daysValue);
      setHours(hoursValue);
      setMinutes(minutesValue);
      setSeconds(secondsValue);

      if (timeDifference < 0) {
        clearInterval(interval);
        // You may want to handle something when the timer reaches zero
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array to run the effect only once
  //---------- Timer Code Ends--------------

  return (
    <>
      <section className="deal-section">
        <div className="container-fluid-lg">
          <div className="title">
            <h2>Best Seller</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="three-slider-1 arrow-slider">
                <Slider {...settings}>
                  <div>
                    <div className="deal-box wow fadeInUp">
                      <a
                        href="shop-left-sidebar.html"
                        className="category-image order-sm-2"
                      >
                        <img
                          src="../assets/images/veg-3/cate1/1.jpg"
                          className="img-fluid blur-up lazyload"
                          style={{ width: "50px" }}
                          alt=""
                        />
                      </a>
                      <div className="deal-detail order-sm-1">
                        <button className="buy-box btn theme-bg-color text-white btn-cart">
                          <i className="iconly-Buy icli m-0" />
                        </button>
                        <div className="hot-deal">
                          <span>Hot Deals</span>
                        </div>
                        <ul className="rating">
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                        </ul>
                        <a href="shop-left-sidebar.html" className="text-title">
                          <h5>Bell pepper</h5>
                        </a>
                        <h5 className="price">
                          $70.21 <span>$65.00</span>
                        </h5>
                        <div className="progress custom-progressbar">
                          <div
                            className="progress-bar"
                            style={{ width: "50%" }}
                            role="progressbar"
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <h4 className="item">
                          Sold: <span>30 Items</span>
                        </h4>
                        <h4 className="offer">Hurry up offer end in</h4>
                        <div className="timer">
                          <ul>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="days1">{days}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="hours1">{hours}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="minutes1">{minutes}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="seconds1">{seconds}</h4>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="deal-box wow fadeInUp"
                      data-wow-delay="0.05s"
                    >
                      <a
                        href="shop-left-sidebar.html"
                        className="category-image order-sm-2"
                      >
                        <img
                          src="../assets/images/veg-3/cate1/2.png"
                          className="img-fluid blur-up lazyload"
                          alt=""
                        />
                      </a>
                      <div className="deal-detail order-sm-1">
                        <button className="buy-box btn theme-bg-color text-white btn-cart">
                          <i className="iconly-Buy icli m-0" />
                        </button>
                        <div className="hot-deal">
                          <span>Hot Deals</span>
                        </div>
                        <ul className="rating">
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                        </ul>
                        <a href="shop-left-sidebar.html" className="text-title">
                          <h5>Eggplant</h5>
                        </a>
                        <h5 className="price">
                          $70.21 <span>$65.00</span>
                        </h5>
                        <div className="progress custom-progressbar">
                          <div
                            className="progress-bar"
                            style={{ width: "50%" }}
                            role="progressbar"
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <h4 className="item">
                          Sold: <span>30 Items</span>
                        </h4>
                        <h4 className="offer">Hurry up offer end in</h4>
                        <div className="timer">
                          <ul>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="days2">{days}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="hours2">{hours}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="minutes2">{minutes}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="seconds2">{seconds}</h4>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="deal-box wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <a
                        href="shop-left-sidebar.html"
                        className="category-image order-sm-2"
                      >
                        <img
                          src="../assets/images/veg-3/cate1/3.png"
                          className="img-fluid blur-up lazyload"
                          alt=""
                        />
                      </a>
                      <div className="deal-detail order-sm-1">
                        <button className="buy-box btn theme-bg-color text-white btn-cart">
                          <i className="iconly-Buy icli m-0" />
                        </button>
                        <div className="hot-deal">
                          <span>Hot Deals</span>
                        </div>
                        <ul className="rating">
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                        </ul>
                        <a href="shop-left-sidebar.html" className="text-title">
                          <h5>Onion</h5>
                        </a>
                        <h5 className="price">
                          $70.21 <span>$65.00</span>
                        </h5>
                        <div className="progress custom-progressbar">
                          <div
                            className="progress-bar"
                            style={{ width: "50%" }}
                            role="progressbar"
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <h4 className="item">
                          Sold: <span>30 Items</span>
                        </h4>
                        <h4 className="offer">Hurry up offer end in</h4>
                        <div className="timer">
                          <ul>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="days3">{days}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="hours3">{hours}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="minutes3">{minutes}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="seconds3">{seconds}</h4>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="deal-box wow fadeInUp"
                      data-wow-delay="0.15s"
                    >
                      <div className="category-image order-sm-2">
                        <img
                          src="../assets/images/veg-3/cate1/1.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="deal-detail order-sm-1">
                        <button className="buy-box btn theme-bg-color text-white btn-cart">
                          <i className="iconly-Buy icli m-0" />
                        </button>
                        <div className="hot-deal">
                          <span>Hot Deals</span>
                        </div>
                        <ul className="rating">
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                          <li>
                            <i data-feather="star" />
                          </li>
                        </ul>
                        <a href="shop-left-sidebar.html" className="text-title">
                          <h5>Bell pepper</h5>
                        </a>
                        <h5 className="price">
                          $70.21 <span>$65.00</span>
                        </h5>
                        <div className="progress custom-progressbar">
                          <div
                            className="progress-bar"
                            style={{ width: "50%" }}
                            role="progressbar"
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <h4 className="item">
                          Sold: <span>30 Items</span>
                        </h4>
                        <h4 className="offer">Hurry up offer end in</h4>
                        <div className="timer">
                          <ul>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="days4">{days}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="hours4">{hours}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="minutes4">{minutes}</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="counter">
                                <div>
                                  <h4 id="seconds4">{seconds}</h4>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealOfTheDay;
