import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  USER_CREATE_RESET,
  USER_DELETE_RESET,
} from "../constants/userConstants";

export default function UserListScreen(props) {
  const userlist = useSelector((state) => state.userlist);
  const { loading, users, error } = userlist;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const userCreate = useSelector((state) => state.userCreate);
  const { success: successUserCreate } = userCreate;

  const dispatch = useDispatch();
  if (successUserCreate) {
    dispatch({ type: USER_CREATE_RESET });
  }
  if (successDelete) {
    dispatch({ type: USER_DELETE_RESET });
    dispatch(listUsers());
    props.history.push("/userlist");
  }

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(id));
    }
  };
  const editHandler = (id) => {
    props.history.push(`/users/${id}/edit`);
  };
  const createHandler = () => {
    props.history.push("/createuser");
  };
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, props.history, successDelete]);
  return (
    <div>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <div className="row" style={{ marginBottom: "2rem" }}>
        <h1>Products</h1>{" "}
        <button type="button" onClick={createHandler}>
          Add User
        </button>
        {console.log(users)}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loadingDelete ? (
              <LoadingBox></LoadingBox>
            ) : errorDelete ? (
              <MessageBox variant="danger">{errorDelete}</MessageBox>
            ) : (
              <div></div>
            )}

            {users &&
              users.map((user) => (
                <tr
                  style={{
                    background: user.email !== userInfo.email ? null : "green",
                  }}
                >
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    {user.email !== userInfo.email && (
                      <div>
                        <button
                          type="button"
                          className="small"
                          onClick={() => editHandler(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="small"
                          onClick={() => deleteHandler(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
