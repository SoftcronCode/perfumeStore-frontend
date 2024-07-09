import React, { useState, useRef, useEffect, useContext } from 'react'
import Slider from "react-slick";
import { fetchData } from '../../api/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PropagateLoader } from 'react-spinners';
import { API_URLS, PRODUCT_IMG_BASE_URL } from '../../api/apiUrls';
import { AddToWishlist, AddToCart } from '../../api/productActions';
import { CartContext } from '../../utils/CartContext';

const ProductLeftSidebar = ({ productId }) => {

  const { setCartQty, setWishlistQty } = useContext(CartContext);

  //********** API code start ***********
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {

      try {
        const requestBody = {
          productId: productId,
        };

        const response = await fetchData(API_URLS.getProductById, requestBody);
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const productDetailsData = JSON.parse(responseData);
          setProductDetails(productDetailsData);
          setSelectedColor(productDetailsData[0].color);
          setSelectedSize(productDetailsData[0].size);
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
      finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);
  //************* / API code end ****************


  //***********Sidebar Image Index code Start **************
  const handleSidebarImageClick = (index) => {
    console.log("mainSliderRef.current:", mainSliderRef.current);
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
      setSelectedImageIndex(index);
    }
  };
  //***********Sidebar Image Index code End **************


  // ************ Qty Increase Decrease Code Start ****************
  const [quantities, setQuantities] = useState({});

  const increaseQuantity = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.min((prevQuantities[productId] || 1) + 1, 10)
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 0)
    }));
  };
  // ************ Qty Increase Decrease Code End ****************


  //********* Color and Size code Start ************
  const [selectedColor, setSelectedColor] = useState('');
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const [selectedSize, setSelectedSize] = useState('');
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const colorOptions = [...new Set(productDetails.map(item => item.color))];
  const sizeOptions = [...new Set(productDetails.map(item => item.size))];

  const filteredProduct = productDetails.find(
    item => item.color === selectedColor && item.size === selectedSize
  );
  //********* Color and Size code End ************


  //********* Percentage code Start ************  
  const mrp = filteredProduct?.mrp;
  const price = filteredProduct?.price;
  const percentageOff = mrp && price ? ((mrp - price) / mrp) * 100 : 0;
  //********* Percentage code End ************


  //********* Slider Image (Big) Carousel start *********
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const mainSliderRef = useRef();
  const sidebarSliderRef = useRef(null);

  const mainSlider = {
    key: filteredProduct?.id,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sidebarSliderRef.current,
  };
  const filteredImages = productDetails.filter(item => item.color === selectedColor && item.size === selectedSize);
  //********* Slider Image (Big) Carousel End ***********


  //********* Sidebar Image (Small) Carousel start ********
  const sidebarSlider = {
    key: filteredProduct?.id,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: mainSliderRef.current,
    dots: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [{
      breakpoint: 1400,
      settings: {
        vertical: false,
      }
    },
    {
      breakpoint: 992,
      settings: {
        vertical: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        vertical: true,
      }
    }, {
      breakpoint: 430,
      settings: {
        slidesToShow: 3,
        vertical: false,
      }
    },
    ]
  };
  const filteredSidebarImages = productDetails.filter(item => item.color === selectedColor && item.size === selectedSize);
  //******** Sidebar Image (Small) Carousel End ******


  //******** COD code Start ************
  const isCODAvailable = productDetails.length > 0 && productDetails[0]?.cod === 1;
  //******** COD code End ************


  //******** Loading code Start ************
  const [loading, setLoading] = useState(true);
  if (loading) return <PropagateLoader color="#36d7b7" />;
  if (!productDetails || !productDetails) {
    return <p>No product details available.</p>;
  }
  //******** Loading code End ************

  return (
    <>
      {/* <!-- Product Left Sidebar Start --> */}
      <div className="row g-4">
        <div className="col-xl-4 wow fadeInUp">
          <div className="product-left-box">
            <div className="row g-sm-4 g-2">
              <div className="col-xxl-10 col-lg-12 col-md-10 order-xxl-2 order-lg-1 order-md-2">
                <div className="product-main no-arrow">
                  <Slider {...mainSlider} ref={mainSliderRef}>
                    {filteredImages.map((product, index) => (
                      <div key={index}>
                        <div className="slider-image">
                          <img
                            src={`${PRODUCT_IMG_BASE_URL}${product.image_name}`}
                            id={`img-${product.index + 1}`}
                            data-zoom-image={`${PRODUCT_IMG_BASE_URL}${product.image_name}`}
                            className="img-fluid image_zoom_cls-0 blur-up lazyload"
                            alt="" />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-12 col-md-2 order-xxl-1 order-lg-2 order-md-1">
                <div className="left-slider-image left-slider no-arrow slick-top">
                  <Slider {...sidebarSlider} ref={sidebarSliderRef}>
                    {/* Your existing sidebar images */}
                    {filteredSidebarImages.map((product, index) => (
                      <div key={index} onClick={() => handleSidebarImageClick(index)}>
                        <div className="sidebar-image">
                          <img src={`${PRODUCT_IMG_BASE_URL}${product.image_name}`}
                            className="img-fluid blur-up lazyload"
                            alt="" />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 wow fadeInUp">
          <div className="right-box-contain">
            <h2 className="name">{productDetails.length > 0 && productDetails[0].product_name}</h2>
            <div className="price-rating">
              <h3 className="theme-color price">
                ₹{price} <del className="text-content">₹{mrp}</del>{" "}
                <span className="offer theme-color">({percentageOff.toFixed(2)}% off)</span>
              </h3>
            </div>
            <div className="procuct-contain">
              <p>{productDetails[0].short_description}</p>
            </div>
            <div className="product-packege">
              <div className="product-title">
                <h4>Color</h4>
              </div>
              <ul className="select-packege">
                {colorOptions && colorOptions.map((color, index) => (
                  <li key={index}>
                    <a href="javascript:void(0)" className={color === selectedColor ? 'selected-option' : ''} onClick={() => handleColorClick(color)}>
                      {color}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-packege">
              <div className="product-title">
                <h4>Size</h4>
              </div>
              <ul className="select-packege">
                {sizeOptions && sizeOptions.map((size, index) => (
                  <li key={index}>
                    <a href="javascript:void(0)" className={size === selectedSize ? 'selected-option' : ''} onClick={() => handleSizeClick(size)}>
                      {size}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="note-box product-packege">
              <div className="cart_qty qty-box product-qty">
                <div className="input-group">
                  <button
                    type="button"
                    className="qty-left-minus"
                    data-type="minus"
                    data-field=""
                    onClick={() => decreaseQuantity(productDetails[0].id)}
                  >
                    <i className="fa fa-minus" aria-hidden="true" />
                  </button>
                  <input
                    className="form-control input-number qty-input"
                    type="text"
                    name="quantity"
                    value={quantities[productDetails[0].id] || 1} readOnly/>
                  <button
                    type="button"
                    className="qty-right-plus"
                    data-type="plus"
                    data-field=""
                    onClick={() => increaseQuantity(productDetails[0].id)}
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <button className="btn btn-md cart-button w-30" onClick={async () => {
                const CartQty = await AddToCart(productDetails[0].id, productDetails[0].variation_id, quantities[productDetails[0].id]);
                if (CartQty) {
                  setCartQty(CartQty);
                }
              }}>Add To Cart</button>

              <button className="btn btn-md cart-button w-30" onClick={async () => {
                const wishlistQty = await AddToWishlist(productDetails[0].id, productDetails[0].variation_id);
                if (wishlistQty) {
                  setWishlistQty(wishlistQty);
                }
              }}>Add To Wishlist</button>

            </div>

            <div className="pickup-box">
              <div className="product-info">
                <ul className="product-info-list product-info-list-2">
                  <li>
                    SKU : <a href="javascript:void(0)">{productDetails.length > 0 && productDetails[0].sku_code}</a>
                  </li>
                  <li>
                    HSN : <a href="javascript:void(0)">{productDetails.length > 0 && productDetails[0].hsn_code}</a>
                  </li>
                  <li>
                    COD : <a href="javascript:void(0)">{isCODAvailable ? 'Available' : 'Not Available'}</a>
                  </li>
                  <li>
                    Product Weight : <a href="javascript:void(0)">{productDetails.length > 0 && productDetails[0].product_weight}</a>
                  </li>
                  <li>
                    Shipping Weight : <a href="javascript:void(0)">{productDetails.length > 0 && productDetails[0].shipping_weight}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="paymnet-option">
              <div className="product-title">
                <h4>Guaranteed Safe Checkout</h4>
              </div>
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/1.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/2.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/3.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/4.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img
                      src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/5.svg"
                      className="blur-up lazyload"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Product Left Sidebar End --> */}
    </>
  )
}

export default ProductLeftSidebar