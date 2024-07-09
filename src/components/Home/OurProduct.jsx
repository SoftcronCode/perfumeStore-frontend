import React, { useEffect, useState, useContext } from "react";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";
import { Link } from "react-router-dom";
import { AddToWishlist, AddToCart } from "../../api/productActions";
import { CartContext } from "../../utils/CartContext";

const OurProduct = ({ showQuickView }) => {
  // to update cart quantity in header
  const { setCartQty, setWishlistQty } = useContext(CartContext);

  // ************* Qty Increase Decrease Code Start *****************
  const [quantities, setQuantities] = useState({});

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
  // ************* Qty Increase Decrease Code End *****************

  // ************* Api Code Start *****************
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
          // Show error toast
          toast.error(`Error: ${response.responseMessage}`);
        }
      } catch (error) {
        // Handle error as needed
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);
  // ************* Api Code End *****************

  return (
    <>
      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="title title-flex">
            <h2 className="mb-lg-0 mb-2">Our Products</h2>
            <ul className="nav nav-tabs tab-style-color" id="myTab">
              <li className="nav-item">
                <button
                  className="nav-link btn active"
                  id="all-tab"
                  type="button"
                >
                  View All
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content" id="myTabContent">
            <div className="row g-8">
              {products &&
                products.map((product) => (
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="col-xxl-2 col-lg-3 col-md-4 col-6 wow fadeInUp"
                    key={product.id}
                  >
                    {/* <div
                      className="col-xxl-2 col-lg-3 col-md-4 col-6 wow fadeInUp"
                      key={product.id}
                    > */}
                    <div className="product-box-4">
                      <div className="product-image">
                        <div className="label-flex">
                          <button
                            className="btn p-0 wishlist btn-wishlist notifi-wishlist"
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
                            <i className="iconly-Heart icli" />
                          </button>
                        </div>
                        <a href={product.slug}>
                          <img
                            src={`${PRODUCT_IMG_BASE_URL}${product.product_image}`}
                            className="img-fluid"
                            alt="Product_Image"
                          />
                        </a>
                        <ul className="option">
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
                              <i className="iconly-Show icli" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="product-detail">
                        <Link to={`/product-detail/${product.id}`}>
                          <h5 className="name">{product.name}</h5>
                        </Link>
                        <h5 className="price theme-color">
                          ₹{product.price}
                          <del>₹{product.mrp}</del>
                        </h5>
                        <div className="price-qty">
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
                          <button
                            className="buy-button buy-button-2 btn btn-cart"
                            onClick={async () => {
                              const CartQty = await AddToCart(
                                product.id,
                                product.variation_id,
                                quantities[product.id]
                              );
                              if (CartQty) {
                                setCartQty(CartQty);
                              }
                            }}
                          >
                            <i className="iconly-Buy icli text-white m-0" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurProduct;
