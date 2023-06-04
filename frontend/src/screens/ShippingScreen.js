import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/shippingActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const ShippingAddress = useSelector((state) => state.ShippingAddress);
  const { addressInfo } = ShippingAddress;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log("testing:", cartItems);

  if (!userInfo) {
    props.history.push("/signin");
  }
  if (cartItems.length === 0) {
    props.history.push("/cart");
  }
  const [fullname, setFullname] = useState(addressInfo.fullname);
  const [address, setAddress] = useState(addressInfo.address);
  const [city, setCity] = useState(addressInfo.city);
  const [phone, setPhone] = useState(addressInfo.phone);
  const [postal, setPostal] = useState(addressInfo.postal);
  const [country, setCountry] = useState(addressInfo.country);

  const dispatch = useDispatch();

  console.log(fullname);
  const submitHandler = (e) => {
    // e.preventDefault();
    dispatch(
      saveShippingAddress(fullname, address, city, phone, postal, country)
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter fullname"
            value={addressInfo.fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Adress</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={addressInfo.address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={addressInfo.city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={addressInfo.country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter phone"
            value={addressInfo.phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            placeholder="Enter postal"
            value={addressInfo.postal}
            onChange={(e) => setPostal(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button>Payment</button>
        </div>
      </form>
    </div>
  );
}
