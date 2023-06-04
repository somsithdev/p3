import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = orderPay;
  const { order, loading, error } = orderDetails;
  useEffect(() => {
    if (!userInfo) {
      props.history.push("/signin");
    }
    const addPaypalScript = async () => {
      // console.log("sendding");
      const { data } = await axios.get("/api/config/paypal");
      console.log(data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;

      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [orderId, dispatch, order, sdkReady, successPay, successDeliver]);

  const SuccessPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
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
                <div>Name: {order.shippingAddress.fullname}</div>
                <div>
                  Address:{" "}
                  {`${order.shippingAddress.address},${order.shippingAddress.city},${order.shippingAddress.country}`}
                </div>
                {order.isDelevered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
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
                <div>{order.paymentMethod}</div>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
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
                  {order.orderItems.map((item) => (
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
                  <p>${order.itemsPrice.toFixed(2)}</p>
                </div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p>Shipping</p>
                  <p>${order.shippingPrice.toFixed(2)}</p>
                </div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p>Tax</p>
                  <p>${order.taxPrice.toFixed(2)}</p>
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    fontWeight: "bold",
                  }}
                >
                  <p>Order Total</p>
                  <p>${order.totalPrice.toFixed(2)}</p>
                </div>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      // <div></div>
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={SuccessPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelevered && (
                  <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}

                    <button
                      type="button"
                      className="primary block"
                      onClick={deliverHandler}
                    >
                      {loadingDeliver ? (
                        <LoadingBox></LoadingBox>
                      ) : (
                        "Deliver Order"
                      )}
                    </button>
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                  </li>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
