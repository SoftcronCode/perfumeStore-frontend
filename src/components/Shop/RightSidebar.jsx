import React, { useEffect, useState, useMemo, useContext } from "react";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";
import { initializeFilterMenu } from "./FilterMenu";
import { AddToCart, AddToWishlist } from "../../api/productActions";
import { Link } from "react-router-dom";
import { CartContext } from "../../utils/CartContext";

const RightSidebar = ({ showQuickView }) => {
  // ************** Qty Increase Decrease Code Start ******************
  const [quantities, setQuantities] = useState({});
  const { setCartQty, setWishlistQty } = useContext(CartContext);

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.min((prevQuantities[productId] || 1) + 1, 10),
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 0),
    }));
  };
  // ************** Qty Increase Decrease Code End ******************

  // ************** Api Code Start ******************
  const [products, setProducts] = useState([]);

  const requestBody = {
    limit: 12,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData(API_URLS.getAllProducts, requestBody);
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const productsData = JSON.parse(responseData);
          setProducts(productsData);
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

    fetchProducts();
  }, []);
  // ************** Api Code End ******************

  // ************** Filter Menu Code Start ******************
  useEffect(() => {
    initializeFilterMenu();
  }, []);
  // ************** Filter Menu Code End ******************

  // ************** Pagination Code Start ******************
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(products.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(newPage) {
    setCurrentPage(newPage);
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  // ************** Pagination Code End ******************

  return (
    <>
      <div className="col-xxl-9 col-lg-8 wow fadeInUp">
        <div className="show-button">
          <div className="filter-button-group mt-0">
            <div className="filter-button d-inline-block d-lg-none">
              <a>
                <i className="fa-solid fa-filter" /> Filter Menu
              </a>
            </div>
          </div>
          <div className="top-filter-menu">
            <div className="grid-option">
              <ul>
                <li className="three-grid d-xxl-inline-block d-none">
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/svg/grid-3.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
                <li className="grid-btn active">
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/svg/grid-4.svg"
                      className="blur-up lazyload d-lg-inline-block d-none"
                      alt=""
                    />
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/svg/grid.svg"
                      className="blur-up lazyload img-fluid d-lg-none d-inline-block"
                      alt=""
                    />
                  </a>
                </li>
                <li className="list-btn">
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/svg/list.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
          {products.map((product) => (
            <Link key={product.id} to={`/product-detail/${product.id}`}>
              <div className="product-box-3 h-100 wow fadeInUp">
                <div className="product-header">
                  <div className="product-image">
                    <a href={product.slug}>
                      <img
                        src={`${PRODUCT_IMG_BASE_URL}${product.product_image}`}
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
                        <a
                          href="javascript:void(0)"
                          className="notifi-wishlist"
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
                    <span className="span-name">
                      {product.product_category}
                    </span>
                    <Link to={`/product-detail/${product.id}`}>
                      <h5 className="name">{product.name}</h5>
                    </Link>
                    <h6 className="unit">250 ml</h6>
                    <h5 className="price">
                      <span className="theme-color">₹{product.mrp}</span>{" "}
                      <del>₹{product.price}</del>
                    </h5>
                    <div className="add-to-cart-box">
                      <div className="price-qty">
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="counter-number">
                              <div className="counter">
                                <div
                                  className="qty-left-minus"
                                  onClick={() => decreaseQuantity(product.id)}
                                >
                                  <i className="fa-solid fa-minus" />
                                </div>
                                <input
                                  className="form-control input-number qty-input"
                                  type="text"
                                  id="qty"
                                  name="quantity"
                                  value={quantities[product.id] || 1}
                                  readOnly
                                />
                                <div
                                  className="qty-right-plus"
                                  onClick={() => increaseQuantity(product.id)}
                                >
                                  <i className="fa-solid fa-plus" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <button className="buy-button buy-button-2 btn btn-cart shop-cart">
                              <i
                                className="iconly-Buy icli text-white"
                                onClick={() =>
                                  AddToCart(
                                    product.id,
                                    product.variation_id,
                                    quantities[product.id]
                                  )
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <nav className="custome-pagination">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={prePage}
              >
                <i className="fa-solid fa-angles-left" />
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  className="page-link"
                  href="javascript:void(0)"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={nextPage}
              >
                <i className="fa-solid fa-angles-right" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default RightSidebar;
