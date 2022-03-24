import React, { Fragment } from "react";
import "./UserDetails.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Loader/MetaData";

const Userdetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleClick = () => {
    dispatch(logoutUser());
  };
  return (
    <Fragment>
      <MetaData title={`${user.name} profile`} />
      <div className="userMainDiv">
        <div>
          <div>
            <img
              style={{ width: "15vw" }}
              src={user.avatar.url}
              alt="Remon roy"
            />
            <p>{user.role}</p>
          </div>
          <button onClick={handleClick}>Logout</button>
        </div>
        <div>
          <div>
            <h1>Profile</h1>
          </div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Join On</h4>
            <p>{String(user.createdAt).substring(0, 10)}</p>
          </div>
          <div>
            <div>
              <Link to="/me/update">Edit Profile</Link>
            </div>
            {user && user.role === "admin" ? (
              <div>
                <Link to="/allUser">All Users</Link>
              </div>
            ) : (
              ""
            )}
            <div>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Userdetails;
