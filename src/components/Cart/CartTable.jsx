import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";
import { RemoveCartItem } from '../../api/productActions';
import { UpdateProductCartQty } from '../../api/productActions';
import { CartContext } from "../../utils/CartContext";


const CartTable = ({ cartItems }) => {

    // to update cart quantity in header
    const { setCartQty } = useContext(CartContext);

    return (
        <>
            <div className="cart-table">
                <div className="table-responsive-xl">
                    <table className="table">
                        <tbody>
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((cart) => (
                                    <tr className="product-box-contain" key={cart.cart_id}>
                                        <td className="product-detail w-50">
                                            <div className="product border-0">
                                                <a href="!#" className="product-image w--30">
                                                    <img src={`${PRODUCT_IMG_BASE_URL}${cart.product_image}`}
                                                        className="img-fluid blur-up lazyload" alt="" />
                                                </a>
                                                <div className="product-detail w--70">
                                                    <ul>
                                                        <li className="name">
                                                            <a href="!#">{cart.product_name}</a>
                                                        </li>

                                                        <li className="text-content"><span className="text-title">Sold
                                                            By:</span> Zordik</li>

                                                        <li>
                                                            <h5 className="text-content d-inline-block">Price :</h5>
                                                            <span>₹{cart.product_price}</span>
                                                            <del className="ms-2">₹{cart.product_mrp}</del>
                                                        </li>

                                                        <li className="d-block d-lg-none">
                                                            <h5 className="saving theme-color">Saving : ₹{cart.product_mrp - cart.product_price}</h5>
                                                        </li>

                                                        <li className="d-block d-lg-none">
                                                            <h5 className="mt-1">Total: ₹{cart.cart_qty * cart.product_price}</h5>
                                                        </li>

                                                        <li className="quantity-price-box d-block d-lg-none mt-2">
                                                            <div className="cart_qty">
                                                                <div className="input-group">
                                                                    <button type="button" className="btn qty-left-minus"
                                                                        data-type="minus" data-field="" onClick={() => UpdateProductCartQty(cart.cart_qty, cart.cart_id, 'decrease')}>
                                                                        <i className="fa fa-minus ms-0"
                                                                            aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input"
                                                                        type="text" name="quantity" value="0" />
                                                                    <button type="button" className="btn qty-right-plus"
                                                                        data-type="plus" data-field="" onClick={() => UpdateProductCartQty(cart.cart_qty, cart.cart_id, 'increase')}>
                                                                        <i className="fa fa-plus ms-0"
                                                                            aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li className="d-block d-lg-none mt-2">
                                                            <a className="text-danger close_button" href="javascript:void(0)" onClick={ async () => {
                                                                const cartQty = await RemoveCartItem(cart.cart_id);
                                                                if (cartQty) {
                                                                    setCartQty(cartQty);
                                                                }
                                                            }}>Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="price text-center w--10 d-none d-lg-table-cell">
                                            <h4 className="table-title text-content">Price</h4>
                                            <h5 className="justify-content-center">₹{cart.product_price} <del className="text-content">₹{cart.product_mrp}</del></h5>
                                            <h6 className="text-success">You Save : ₹{cart.product_mrp - cart.product_price}</h6>
                                        </td>

                                        <td className="quantity text-center w--20 d-none d-lg-table-cell">
                                            <h4 className="table-title text-content">Qty</h4>
                                            <div className="quantity-price m-auto">
                                                <div className="cart_qty">
                                                    <div className="input-group">
                                                        <button type="button" className="btn qty-left-minus"
                                                            data-type="minus" data-field="" onClick={() => UpdateProductCartQty(cart.cart_qty, cart.cart_id, 'decrease')}>
                                                            <i className="fa fa-minus ms-0" aria-hidden="true"></i>
                                                        </button>
                                                        <input className="form-control input-number qty-input" type="text"
                                                            name="quantity" value={cart.cart_qty} />
                                                        <button type="button" className="btn qty-right-plus"
                                                            data-type="plus" data-field="" onClick={() => UpdateProductCartQty(cart.cart_qty, cart.cart_id, 'increase')}>
                                                            <i className="fa fa-plus ms-0" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="subtotal text-center w--10 d-none d-lg-table-cell">
                                            <h4 className="table-title text-content">Total</h4>
                                            <h5>₹{cart.cart_qty * cart.product_price}</h5>
                                        </td>

                                        <td className="save-remove text-center w--10 d-none d-lg-table-cell">
                                            <h4 className="table-title text-content">Action</h4>
                                            <a className="remove close_button" href="javascript:void(0)" onClick={async () => {
                                                const cartQty = await RemoveCartItem(cart.cart_id);
                                                if (cartQty) {
                                                    setCartQty(cartQty);
                                                }
                                            }}><i className="fa-regular fa-trash-can"></i></a>
                                        </td>
                                    </tr>
                                ))
                            ) : (

                                <div className="text-center">
                                    <img src="/assets/images/theme/empty-cart.png" height={300} width={300} className="img-fluid" alt="empty-cart" />
                                    <div className="contain-404">
                                        <h3 className="text-content">Looks like you have not added anything to your cart. Go <br /> ahead & explore top categories.</h3>
                                        <Link to="/" className="btn btn-md text-white theme-bg-color mt-4 mx-auto width-fit-content">Back To Home Screen</Link>
                                    </div>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

export default CartTable