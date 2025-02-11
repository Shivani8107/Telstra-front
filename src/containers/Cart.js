import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../redux/reducers/cartSlice";

import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(typeof cart.cartItems.price);
  const dispatch = useDispatch();
  //const priceString = cart.cartItems.price;
  //const priceInteger = parseInt(priceString.replace(/\$|,/g, ""), 10);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
    <h3 className="product-title">Product</h3>
    <h3 className="price">Price</h3>
    <h3 className="quantity">Quantity</h3>
    <h3 className="total">Total</h3>
  </div>
  <style>
    {`
      .titles {
        display: flex;
        justify-content: space-between;
        background-color: #f2f2f2;
        padding: 10px;
        font-weight: bold;
      }

      .product-title {
        flex: 1;
      }

      .price, .quantity, .total {
        flex: 0.25;
      }
    `}
  </style>
  <div className="cart-items">
  {cart.cartItems &&
    cart.cartItems.map((cartItem) => (
      <div className="cart-item" key={cartItem.p_id}>
        <div className="cart-product">
          <img src={cartItem.image} alt={cartItem.name} />
          <div className="product-details">
            <h3>{cartItem.name}</h3>
            <p>{cartItem.brand}</p>
            <button onClick={() => handleRemoveFromCart(cartItem)}>
              Remove
            </button>
          </div>
        </div>
        <div className="cart-product-price">{cartItem.price}</div>
        <div className="cart-product-quantity">
          <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
          <div className="count">{cartItem.cartQuantity}</div>
          <button onClick={() => handleAddToCart(cartItem)}>+</button>
        </div>
        <div className="cart-product-total-price">
          ${parseInt(cartItem.price.replace(/\$|,/g, ""), 10) *
          cartItem.cartQuantity}
        </div>
      </div>
    ))}
</div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <h4>Subtotal:</h4>
                <h4 className="amount">${cart.cartTotalAmount}</h4>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;