import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div className="container">
            <div className="row">
              <div>
                <a className="brand" href="/">
                  Shopping
                </a>
              </div>
              <div>
                <a href="/cart">Cart</a>
                <a href="/signin">Sign In</a>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </div>
        </main>
        <footer className="row center">All Right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
