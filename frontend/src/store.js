import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducers } from "./reducers/cartReducers";
import {
  orderCreateRerducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  productAmountUpdateReducer,
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { ShippingAddressReducer } from "./reducers/shippingReducers";
import {
  deleteUserReducer,
  updateProfileReducer,
  userCreateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userlistReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
} from "./reducers/userReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    paymentMethod: "PayPal",
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  ShippingAddress: {
    addressInfo: localStorage.getItem("addressInfo")
      ? JSON.parse(localStorage.getItem("addressInfo"))
      : {},
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  ShippingAddress: ShippingAddressReducer,
  orderCreate: orderCreateRerducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  updateProfile: updateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userlist: userlistReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  userCreate: userCreateReducer,
  productAmountUpdate: productAmountUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
