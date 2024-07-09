import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";
import Breadcrumb from "../shared/Breadcrumb";
import { RemoveWishlistItem, MoveWishlistToCart } from '../../api/productActions';
import { CartContext } from "../../utils/CartContext";

const Wishlist = () => {

  // to update cart quantity in header
  const { setCartQty, setWishlistQty } = useContext(CartContext);

  // ************* Get Wishlist API Code Start *********************
  const UserId = localStorage.getItem('user_id');

  const [getWishlists, setGetWishlist] = useState([]);

  useEffect(() => {

    const fetchGetWishlist = async () => {

      const requestGetBody = {
        userId: UserId,
      };

      try {
        const response = await fetchData(API_URLS.getWishlistItem, requestGetBody);
        if (response.responseCode === 1) {
          const getWishlistData = JSON.parse(response.responseData);
          setGetWishlist(getWishlistData);
        } else {
          // Show error toast
          toast.error(`Error: ${response.responseMessage}`, {
            toastId: "unique-error-toast",
          });
        }
      } catch (error) {
        // Handle error as needed
        toast.error(`Error: ${error.message}`, {
          toastId: "unique-error-toast",
        });
      }
    };

    fetchGetWishlist();
  }, [getWishlists, UserId]);

  // ************* Get Wishlist API Code End *********************



  return (
    <>
      {/* <!-- Wishlist Section Start --> */}
      <Breadcrumb pageName="Wishlist" />
      <section className="wishlist-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-3 g-2">
            {getWishlists !== null ? (
              getWishlists.map((wishlist) => (
                <div className="col-xxl-2 col-lg-3 col-md-4 col-6 product-box-contain" key={wishlist.wishlist_id}>
                  <div className="product-box-3 h-100">
                    <div className="product-header">
                      <div className="product-image">
                        <a href="product-left.html">
                          <img src={`${PRODUCT_IMG_BASE_URL}${wishlist.product_image}`} className="img-fluid blur-up lazyload" alt="" />
                        </a>

                        <div className="product-header-top">
                          <button className="btn wishlist-button close_button" onClick={async () => {
                            const wishlistQty = await RemoveWishlistItem(wishlist.wishlist_id);
                            if (wishlistQty) {
                              setWishlistQty(wishlistQty);
                            }
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="product-footer">
                      <div className="product-detail">
                        <span className="span-name">{wishlist.product_category}</span>
                        <a href="product-left.html">
                          <h5 className="name line-clamp-1">{wishlist.product_name}</h5>
                        </a>
                        <h6 className="unit mt-1">{wishlist.product_size}</h6>
                        <h5 className="price">
                          <span className="theme-color">₹{wishlist.product_price}</span>
                          <del>₹{wishlist.product_mrp}</del>
                        </h5>
                        <div className="add-to-cart-box bg-white mt-4 m-auto">
                          <button class="btn btn-add-cart addcart-button" onClick={async () => {
                            const { cartQty, wishlistQty } = await MoveWishlistToCart(wishlist.wishlist_id);
                            if (cartQty && wishlistQty) {
                              setCartQty(cartQty);
                              setWishlistQty(wishlistQty);
                            }
                          }}>Move To Cart<i class="iconly-Buy icli m-0"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-center">
                  <img src="/assets/images/theme/empty_wishlist.png" className="img-fluid" alt="empty-cart" />
                  <div class="contain-404">
                    <Link to="/" class="btn btn-md text-white theme-bg-color mt-4 mx-auto width-fit-content">Back To Home Screen</Link>
                  </div>
                </div>
              </>
            )
            }
          </div>
        </div>
      </section>
      {/* <!-- Wishlist Section End --> */}
    </>
  )
}

export default Wishlist