import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { CREATE_ORDER_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { productAmountUpdateReducer } from "../reducers/productReducers";
import { updateAmountProduct, updateProduct } from "../actions/productActions";

export default function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const shippingAddress = useSelector((state) => state.ShippingAddress);
  const { addressInfo } = shippingAddress;
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod } = cart;
  // console.log(paymentMethod);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(4));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((p, c) => p + c.price * c.qty, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(cart.itemsPrice * 0.1);

  cart.total = Number(cart.itemsPrice + cart.taxPrice + cart.shippingPrice);

  if (!addressInfo.address) {
    props.history.push("/shipping");
  }

  if (!userInfo) {
    props.history.push("/signin");
  }
  if (cartItems.length === 0) {
    props.history.push("/cart");
  }

  const placeOrderHandler = (e) => {
    console.log(cart.cartItems);
    dispatch(updateAmountProduct({ orderItems: cart.cartItems }));
    dispatch(
      createOrder({
        ...cart,
        shippingAddress: addressInfo,
        orderItems: cart.cartItems,
        totalPrice: cart.total,
      })
    );

    // props.history.push("/success");
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [success, dispatch, props.history, order]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div
                style={{
                  border: "1px solid black",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}
              >
                <div>
                  <h3>Shipping</h3>
                </div>
                <div>Name: {userInfo.name}</div>
                <div>
                  Address:{" "}
                  {`${addressInfo.address},${addressInfo.city},${addressInfo.country}`}
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  border: "1px solid black",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}
              >
                <div>
                  <h3>Payment method</h3>
                </div>
                <div>{paymentMethod}</div>
              </div>
            </li>
            <li>
              <div
                style={{
                  border: "1px solid black",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}
              >
                <div>
                  <h3>Order items</h3>
                </div>
                <div>
                  {cartItems.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1rem",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ height: "5rem" }}
                        />
                        <p style={{ marginLeft: "2rem" }}>{item.name}</p>
                      </div>
                      <p>
                        {`${item.qty} x $${item.price} = $${
                          item.qty * item.price
                        }`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "1rem",
                  margin: "1rem",
                  padding: "1rem",
                }}
              >
                <div>
                  <h3>Order Summary</h3>
                </div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p>Items</p>
                  <p>${cart.itemsPrice.toFixed(2)}</p>
                </div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p>Shipping</p>
                  <p>${cart.shippingPrice.toFixed(2)}</p>
                </div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p>Tax</p>
                  <p>${cart.taxPrice.toFixed(2)}</p>
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    fontWeight: "bold",
                  }}
                >
                  <p>Order Total</p>
                  <p>${cart.total.toFixed(2)}</p>
                </div>
                <div>
                  <button
                    style={{ width: "100%" }}
                    onClick={placeOrderHandler}
                    disabled={cartItems.length === 0}
                  >
                    Place Order
                  </button>
                  {loading && <LoadingBox />}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
