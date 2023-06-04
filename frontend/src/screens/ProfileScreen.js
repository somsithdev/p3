import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions.js";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants.js";
export default function ProfileScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const updateProfile = useSelector((state) => state.updateProfile);
  const { success, error: errorUpdate, loading: LoadingUpdate } = updateProfile;
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password are not match");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
      dispatch(detailsUser(user._id));
    }
  };

  useEffect(() => {
    if (!user || user._id !== userInfo._id) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);

      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user, password]);

  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {LoadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant="danger"></MessageBox>}
            {success && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                // value={user.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                // value={user.password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {console.log(userInfo.isAdmin)}
            {userInfo.isAdmin && (
              <div>
                <label htmlFor="admin">Admin</label>
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
              </div>
            )}

            <div>
              <button style={{ margin: "2rem 0" }} type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
