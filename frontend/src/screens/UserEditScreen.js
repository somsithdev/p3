import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfileByAdmin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_EDIT_RESET, USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props) {
  const id = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingUser, error: errorUser, user } = userDetails;
  const updateProfile = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateProfile;
  if (successUpdate) {
    dispatch({ type: USER_UPDATE_RESET });
    props.history.push("/userlist");
  }
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password are not match");
    } else {
      dispatch(
        updateUserProfileByAdmin({
          userId: user._id,
          name,
          email,
          password,
          isAdmin,
        })
      );
    }
    console.log(user._id, name, email, password, isAdmin);
  };
  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch({ type: USER_EDIT_RESET });
      dispatch(detailsUser(props.match.params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setConfirmPassword(user.confirmPassword);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, id, props.match.params.id, user]);
  return (
    <div>
      {loadingUser && <LoadingBox></LoadingBox>}
      {errorUser && <MessageBox variant="danger">{errorUser}</MessageBox>}
      <form className="form" onSubmit={submitHandler}>
        <div>{/* <h1>Edit Product {id}</h1> */}</div>
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="image">Email</label>
            <input
              type="email"
              value={email}
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              // value={password}
              placeholder="Enter Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              // value={category}
              placeholder="Enter Confirm Password"
              id="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="admin">Admin</label>

            {isAdmin ? (
              <select
                name="plan"
                id="plan"
                onChange={(e) => setIsAdmin(e.target.value)}
              >
                <option value={true} selected>
                  Yes
                </option>
                <option value={false}>No</option>
              </select>
            ) : (
              <select
                name="plan"
                id="plan"
                onChange={(e) => setIsAdmin(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false} selected>
                  No
                </option>
              </select>
            )}
          </div>

          <div>
            <label></label>
            <button className="primary" type="submit">
              Update
            </button>
          </div>
        </>
      </form>
    </div>
  );
}
