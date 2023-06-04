import axios from "axios";
import Axios from "axios";
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREAT_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_TOPSELLERS_LIST_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_UDPATE_FAIL,
  USER_UDPATE_REQUEST,
  USER_UDPATE_SUCCESS,
} from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/sign", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.reponse && error.reponse.data.message
          ? error.reponse.data.message
          : error.message,
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
};
export const createUser =
  (name, email, password, isAdmin) => async (dispatch) => {
    dispatch({
      type: USER_CREATE_REQUEST,
      payload: { name, email, password, isAdmin },
    });
    try {
      const { data } = await Axios.post("/api/users/register", {
        name,
        email,
        password,
        isAdmin,
      });
      dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_CREATE_FAIL,
        payload:
          error.reponse && error.reponse.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.reponse && error.reponse.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // console.log("test");
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.reponse && error.reponse.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  console.log(user);
  dispatch({ type: USER_UDPATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_UDPATE_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UDPATE_FAIL,
      payload:
        error.reponse && error.reponse.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.reponse && error.reponse.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfileByAdmin =
  (user) => async (dispatch, getState) => {
    console.log(user);
    dispatch({ type: USER_UDPATE_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(`/api/users/profileadmin`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({ type: USER_UDPATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UDPATE_FAIL,
        payload:
          error.reponse && error.reponse.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `/api/users/${id}`,

      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.reponse && error.reponse.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/users/top-sellers");
    console.log(data);
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};
