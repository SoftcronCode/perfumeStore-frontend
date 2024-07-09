import React from 'react';
import { Link } from 'react-router-dom';

const CartSummeryBox = ({cartItems }) => {

  const totalAmount = cartItems ? cartItems.reduce((total, cart) => total + (cart.cart_qty * cart.product_price), 0) : 0;

  return (
    <>
      <div className="summery-box p-sticky">
        <div className="summery-header">
          <h3>Cart Total</h3>
        </div>
        <div className="summery-contain">
          <ul>
            <li>
              <h4>Subtotal</h4>
              <h4 className="price">₹ {totalAmount.toFixed(2)}</h4>
            </li>
          </ul>
        </div>
        <ul className="summery-total">
          <li className="list-total border-top-0">
            <h4>Total (INR)</h4>
            <h4 className="price theme-color">₹ {totalAmount.toFixed(2)}</h4>
          </li>
        </ul>
        <div className="button-group cart-button">
          <ul>
            <li>
              <Link to="/checkout" className="btn btn-animation proceed-btn fw-bold checkout-button"> Process To Checkout </Link>
            </li>
            <li>
              <Link to="/" className="btn shopping-button text-dark return-shopping-btn"> <i className="fa-solid fa-arrow-left-long me-3" />
                Return To Shopping
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}

export default CartSummeryBox