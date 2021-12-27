import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div className="container">
            <div className="row">
              <div>
                <Link className="brand" to="/">
                  Shopping
                </Link>
              </div>
              <div>
                <Link to="/cart">
                  Cart
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
                <Link to="/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            {/* <Route path="/cart/:id" component={}></Route> */}
          </div>
        </main>
        <footer className="row center">All Right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
