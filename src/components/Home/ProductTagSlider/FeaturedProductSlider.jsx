import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import { toast } from "react-toastify";
import { PRODUCT_IMG_BASE_URL } from "../../../api/apiUrls";
import { AddToCart, AddToWishlist } from "../../../api/productActions";
import { Link } from 'react-router-dom';
import { CartContext } from '../../../utils/CartContext';

const FeaturedProductSlider = ({ showQuickView }) => {

  // to update cart quantity in header
  const { setCartQty, setWishlistQty } = useContext(CartContext);

  // Slider Setting Start
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  // Slider Setting End


  // API Code Start
  const [FeaturedProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {

      const requestBody = {
        tagName: "featured_products",
        limit: 12,
      };

      try {
        const response = await fetchData(API_URLS.getProductsByTag, requestBody);
        if (response.responseCode === 1) {
          const data = JSON.parse(response.responseData);
          setFeaturedProduct(data);
        } else {
          // Show error toast
          toast.error(`Error: ${response.responseMessage}`);
        }
      } catch (error) {
        // Handle error as needed
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchFeaturedProducts();
  }, []);
  //API Code End


  const renderProductRows = () => {
    const rows = [];
    for (let i = 0; i < FeaturedProduct.length; i += 3) {
      const productInRow = FeaturedProduct.slice(i, i + 3);
      rows.push(
        <div key={i}>
          <div className="row gy-sm-4 gy-3">
            {productInRow.map((product) => (
              <div className="col-12" key={product.id}>
                <div className="product-box-4 wow fadeInUp">
                  <Link to={`/product-detail/${product.id}`} className="product-image">
                    <img src={`${PRODUCT_IMG_BASE_URL}${product.image_name}`} className="img-fluid" alt="" />
                  </Link>
                  <div className="product-details">
                    <a href={product.slug}>
                      <h4 className="name">{product.name && product.name.substring(0, 35)}</h4>
                    </a>
                    <h5 className="price">₹{product.price}<del>₹{product.mrp}</del></h5>
                    <ul className="option">
                      <li data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Add to Cart">
                        <a href="javascript:void(0)" onClick={async () => {
                          const cartQty = await AddToCart(product.id, product.variation_id);
                          if (cartQty) {
                            setCartQty(cartQty);
                          }
                        }}>
                          <i className="iconly-Buy icli"></i>
                        </a>
                      </li>
                      <li data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Quick View">
                        <a href="javascript:void(0)" data-bs-toggle="modal"
                          data-bs-target="#view" onClick={() => showQuickView(product.id)}>
                          <i className="iconly-Show icli"></i>
                        </a>
                      </li>
                      <li data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Wishlist">
                        <a href="javascript:void(0)" onClick={async () => {
                          const wishlistQty = await AddToWishlist(product.id, product.variation_id);
                          if (wishlistQty) {
                            setWishlistQty(wishlistQty)
                          }
                        }}>
                          <i className="iconly-Heart icli"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return rows;
  }


  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="title title-border d-block">
            <h3>Featured Products</h3>
          </div>
          <div className="product-category-1 arrow-slider-2">
            <Slider {...settings}>
              {renderProductRows()}
            </Slider>
          </div>
        </div>
      </div>

    </>
  )
}

export default FeaturedProductSlider