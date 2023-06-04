import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  //  get state
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const ShippingAddress = useSelector((state) => state.ShippingAddress);
  const { addressInfo } = ShippingAddress;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log("testing:", cartItems);
  if (!addressInfo.address) {
    props.history.push("/shipping");
  }

  if (!userInfo) {
    props.history.push("/signin");
  }
  if (cartItems.length === 0) {
    props.history.push("/cart");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment method</h1>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="radio"
            id="tripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal">Stripe</label>
        </div> */}
        <div>
          <label />
          <button type="submit">continue</button>
        </div>
      </form>
    </div>
  );
}
