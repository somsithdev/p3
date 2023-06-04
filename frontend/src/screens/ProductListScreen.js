import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
    success: successCreate,
  } = productCreate;

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (successCreate) {
    dispatch({ type: PRODUCT_CREATE_RESET });
    props.history.push(`/products/${createdProduct._id}/edit`);
  }
  // if (successDelete) {
  //   dispatch({ type: PRODUCT_DELETE_RESET });
  //   dispatch(listProducts());
  // }

  useEffect(() => {
    dispatch({ type: PRODUCT_DELETE_RESET });
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : "" }));
  }, [
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(id));
    }
  };
  const editHandler = (id) => {
    props.history.push(`/products/${id}/edit`);
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <div className="row" style={{ marginBottom: "2rem" }}>
        <h1>Products</h1>{" "}
        <button type="button" onClick={createProductHandler}>
          {loadingCreate ? <LoadingBox></LoadingBox> : "Create Product"}
        </button>
      </div>
      <center></center>
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>AMOUNT</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => editHandler(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product._id)}
                  >
                    {loadingDelete ? <LoadingBox></LoadingBox> : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
