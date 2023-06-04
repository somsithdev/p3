import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, detailsOrder, listOrder } from "../actions/orderActions";
import { deleteProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(id));
      dispatch(listOrder());
    }
  };

  const detailsHandler = (id) => {
    props.history.push(`/order/${id}`);
  };
  if (successDelete) {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrder());
  }
  useEffect(() => {
    dispatch(listOrder({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Shipping Address</th>
            <th>Payment Method</th>
            <th>Shipping Price</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delevered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            orders &&
            orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : "None"}</td>
                <td
                  style={{ textAlign: "center" }}
                >{`${order.shippingAddress.fullname},${order.shippingAddress.address},${order.shippingAddress.city},${order.shippingAddress.postal},${order.shippingAddress.address}${order.shippingAddress.country}`}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.shippingPrice}</td>
                <td>{order.taxPrice}</td>
                <td>{order.totalPrice}</td>
                <td
                  style={{
                    background: order.isPaid ? "#77e87a" : "#ffe4e4",
                  }}
                >
                  {order.isPaid ? "Yes" : "No"}
                </td>
                <td
                  style={{
                    background: order.isDelevered ? "#77e87a" : "#ffe4e4",
                  }}
                >
                  {order.isDelevered ? "Yes" : "No"}
                </td>
                <td>
                  <button onClick={() => detailsHandler(order._id)}>
                    Details
                  </button>
                  <button onClick={() => deleteHandler(order._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
