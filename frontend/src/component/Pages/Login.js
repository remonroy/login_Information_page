import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../store/action/userAction";
import { useAlert } from "react-alert";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [error, dispatch, alert, isAuthenticated, navigate]);
  return (
    <Fragment>
      <div className="loginContainerBox">
        <div className="loginBox">
          <h2>Login</h2>
          <form className="loginFrom" onSubmit={loginSubmit}>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                value={loginEmail}
                type="email"
                required
                placeholder="Enter Email.."
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                value={loginPassword}
                type="password"
                required
                placeholder="Enter Password.."
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot password ..?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
