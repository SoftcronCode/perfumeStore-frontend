import React, { useEffect, useState, useContext } from "react";
import { fetchData } from "../../api/apiService";
import { API_URLS, PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import { AddToCart, AddToWishlist } from "../../api/productActions";
import { Link } from "react-router-dom";
import { CartContext } from "../../utils/CartContext";

const RelatedProduct = ({ showQuickView }) => {
  // to update cart quantity in header
  const { setCartQty, setWishlistQty } = useContext(CartContext);

  // Slider Image Carousel start---------------
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 5,
          autoplay: true,
          autoplaySpeed: 3500,
        },
      },
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1010,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  // Slider Image Carousel End---------------

  //*********  API code start *********
  const [topProducts, setTopProducts] = useState([]);

  const requestBody = {
    tagName: "best_seller",
    limit: 20,
  };
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetchData(
          API_URLS.getProductsByTag,
          requestBody
        );
        if (response.responseCode === 1) {
          const data = JSON.parse(response.responseData);
          setTopProducts(data);
        } else {
          // Show error toast
          toast.error(`Error: ${response.responseMessage}`);
        }
      } catch (error) {
        // Handle error as needed
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchTopProducts();
  }, []);
  //******** / API code end ***************

  return (
    <>
      {/* Releted Product Section Start */}
      <section className="product-list-section section-b-space">
        <div className="container-fluid-lg">
          <div className="title">
            <h2>Related Products</h2>
            <span className="title-leaf">
              <svg className="icon-width">
                <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf" />
              </svg>
            </span>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="slider-6_1 product-wrapper">
                <Slider {...settings}>
                  {topProducts.map((product) => (
                    <Link
                      to={`/product-detail/${product.id}`}
                      // className="col-xxl-2 col-lg-3 col-md-4 col-6 wow fadeInUp"
                      key={product.id}
                    >
                      {/* <div key={product.id}> */}
                      <div className="product-box-3 wow fadeInUp">
                        <div className="product-header">
                          <div className="product-image">
                            <a href={product.slug}>
                              <img
                                src={`${PRODUCT_IMG_BASE_URL}${product.image_name}`}
                                className="img-fluid blur-up lazyload"
                                alt=""
                              />
                            </a>
                            <ul className="product-option">
                              <li
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-tooltip-content="Quick View"
                              >
                                <a
                                  href="javascript:void(0)"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view"
                                  onClick={() => showQuickView(product.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-eye"
                                  >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                </a>
                              </li>
                              <li
                                onClick={async () => {
                                  const wishlistQty = await AddToWishlist(
                                    product.id,
                                    product.variation_id
                                  );
                                  if (wishlistQty) {
                                    setWishlistQty(wishlistQty);
                                  }
                                }}
                              >
                                <a href="" className="notifi-wishlist">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-heart"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product-footer">
                          <div className="product-detail">
                            <Link to={`/product-detail/${product.id}`}>
                              <h5 className="name">{product.name}</h5>
                            </Link>
                            <h5 className="price">
                              <span className="theme-color">
                                ₹{product.mrp}
                              </span>{" "}
                              <del>₹{product.price}</del>
                            </h5>
                            <div className="add-to-cart-box bg-white">
                              <button
                                className="btn btn-add-cart addcart-button"
                                onClick={async () => {
                                  const CartQty = await AddToCart(
                                    product.id,
                                    product.variation_id
                                  );
                                  if (CartQty) {
                                    setCartQty(CartQty);
                                  }
                                }}
                              >
                                Add To Cart
                                <i className="iconly-Buy icli m-0" />
                              </button>
                              <div className="cart_qty qty-box">
                                <div className="input-group bg-white">
                                  <input
                                    className="form-control input-number qty-input"
                                    type="text"
                                    name="quantity"
                                    defaultValue={0}
                                  />
                                  <button
                                    type="button "
                                    className="bg-gray buy-button buy-button-2 btn btn-cart"
                                    data-type="plus"
                                    data-field=""
                                  >
                                    <i className="iconly-Buy icli text-white m-0" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Releted Product Section End */}
    </>
  );
};

export default RelatedProduct;
