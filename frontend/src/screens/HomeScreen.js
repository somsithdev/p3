import React, { useEffect, useState } from "react";

import data from "../data";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function ProductScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      TEST
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {data.products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
