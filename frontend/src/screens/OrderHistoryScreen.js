import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, orders, error } = orderMineList;
  if (!userInfo) {
    props.history.push("/signin");
  }
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <center>
        <h1 style={{ fontSize: "3rem" }}>Order History</h1>
      </center>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varian="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders &&
              orders.orders.map((order) => (
                <tr
                  key={order._id}
                  style={{
                    background: order.isDelevered ? "#77e87a" : "#ffe4e4",
                  }}
                >
                  <td>{order._id}</td>
                  {console.log(order.createdAt.substring(0, 10))}
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelevered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
