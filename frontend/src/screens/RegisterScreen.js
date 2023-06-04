import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
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

        color: "black",
        margin: "auto",
        border: "1px solid black",
        borderRadius: "1rem",
      }}
    >
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && (
          <MessageBox variant="danger">Invalid email or password</MessageBox>
        )}
        <div>
          <label htmlFor="email">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="confirmPassword">Verify your Password : </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            {/* {state.LoadingBox ? <LoadingBox /> : "Sign In"} */}
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account ?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
