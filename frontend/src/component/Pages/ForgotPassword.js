import React, { Fragment, useEffect, useState } from "react";
import * as Types from "../store/action/type";
import "./ForgotPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { clearErrors, forgotPasswordAction } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");
  const updateSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPasswordAction(myForm));
  };
  useEffect(() => {
    if (message) {
      alert.success(message);
      //   dispatch({ type: Types.FORGOT_PASSWORD_RESET });
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, message, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="forgotEditBox">
            <div className="forgotBox">
              <h2>Forgot Password</h2>
              <form className="forgotFrom" onSubmit={updateSubmit}>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    value={email}
                    type="text"
                    name="email"
                    required
                    placeholder="Enter email.."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input type="submit" value="send" className="forgotBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
