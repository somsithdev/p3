import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileSceen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import UserCreateScreen from "./screens/UserCreateScreen";

function App() {
  const dispatch = useDispatch();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const signoutHanler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header style={{ position: "fixed", top: "0", width: "100%" }}>
          <div className="container">
            <div className="row">
              <div>
                <button
                  type="button"
                  className="open-sidebar"
                  onClick={() => setSidebarIsOpen(true)}
                >
                  <i className="fa fa-bars"></i>
                </button>
                <Link className="brand" to="/">
                  Shopping
                </Link>
              </div>
              <div>
                <Route
                  render={({ history }) => (
                    <SearchBox history={history}></SearchBox>
                  )}
                ></Route>
              </div>
              <div>
                <Link to="/cart">
                  <i
                    style={{ fontSize: "2.5rem" }}
                    className="fa fa-shopping-cart"
                  ></i>
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Admin <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        {/* <Link to="/dashboard">Dashboard</Link> */}
                        <Link to="/productlist">Products</Link>
                        <Link to="/orderlist">Orders</Link>
                        <Link to="/userlist">Users</Link>
                      </li>
                    </ul>
                  </div>
                )}
                {userInfo ? (
                  <div style={{ textAlign: "left" }} className="dropdown">
                    <Link to="#">
                      {userInfo.name} <i className="fa fa-caret-down"></i>
                    </Link>

                    <ul
                      className="dropdown-content"
                      style={{ height: "10rem" }}
                    >
                      <div style={{ paddingTop: "1rem" }}>
                        {" "}
                        <Link to="/profile">Profile</Link>
                      </div>
                      <div
                        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                      >
                        <Link style={{ padding: "1rem" }} to="/orderhistory">
                          order history
                        </Link>
                      </div>

                      <div style={{ paddingBottom: "1rem" }}>
                        <Link to="/" onClick={signoutHanler}>
                          Logout
                        </Link>
                      </div>
                    </ul>
                  </div>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}
                {/* {userInfo && userInfo.isSeller && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Seller <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/productlist/seller">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist/seller">Orders</Link>
                      </li>
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main style={{ backgroundColor: "#FBFBFB", padding: "0px" }}>
          <div
            style={{
              width: "79%",
              display: "flex",
              margin: "auto",
              marginTop: "1%",
              padding: "1rem",
              backgroundColor: "white",
            }}
          >
            <div className="container">
              <Route
                path="/product/:id"
                component={ProductScreen}
                exact
              ></Route>
              <Route path="/" component={HomeScreen} exact></Route>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/shipping" component={ShippingScreen}></Route>
              <Route path="/payment" component={PaymentScreen}></Route>
              <Route path="/placeorder" component={PlaceOrderScreen}></Route>
              <Route path="/order/:id" component={OrderScreen}></Route>
              <Route
                path="/orderhistory"
                component={OrderHistoryScreen}
              ></Route>
              <PrivateRoute
                path="/profile"
                component={ProfileScreen}
              ></PrivateRoute>
              <AdminRoute
                path="/productlist"
                component={ProductListScreen}
                exact
              ></AdminRoute>
              <AdminRoute
                path="/orderlist"
                component={OrderListScreen}
                exact
              ></AdminRoute>
              <AdminRoute
                path="/users/:id/edit"
                component={UserEditScreen}
              ></AdminRoute>
              <AdminRoute
                path="/userlist"
                component={UserListScreen}
              ></AdminRoute>
              <Route
                path="/products/:id/edit"
                component={ProductEditScreen}
                exact
              ></Route>
              <SellerRoute
                path="/productlist/seller"
                component={ProductListScreen}
              ></SellerRoute>
              <SellerRoute
                path="/orderlist/seller"
                component={OrderListScreen}
              ></SellerRoute>
              <Route path="/seller/:id" component={SellerScreen}></Route>
              {/* <Route path="/cart/:id" component={}></Route> */}
              <Route
                path="/search/name/:name?"
                component={SearchScreen}
                exact
              ></Route>
              <Route
                path="/search/category/:category"
                component={SearchScreen}
                exact
              ></Route>
              <Route
                path="/search/category/:category/name/:name"
                component={SearchScreen}
                exact
              ></Route>
              <AdminRoute
                path="/createuser"
                component={UserCreateScreen}
                exact
              ></AdminRoute>
            </div>
          </div>
        </main>
        <footer
          className="row center"
          style={{ backgroundColor: "#f5f5f5", color: "#9c7373" }}
        >
          Project - Somsith PHONPHAKDY 2023
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
