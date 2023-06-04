import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);
  return (
    <div
      className="loginbox"
      style={{
        alignItems: "center",
        // background: "gray",
        height: "500px",
        // width: "50%",
        color: "black",
        margin: "auto",
        border: "1px solid black",
        borderRadius: "1rem",
      }}
    >
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && (
          <MessageBox variant="danger">Invalid email or password</MessageBox>
        )}
        <div>
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            {/* {state.LoadingBox ? <LoadingBox /> : "Sign In"} */}
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer ?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create new account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
