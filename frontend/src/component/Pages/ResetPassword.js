import React, { Fragment, useEffect, useState } from "react";
import * as Types from "../store/action/type";
import "./ResetPassword.css";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { clearErrors, resetPasswordAction } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPasswordAction(token, myForm));
  };
  useEffect(() => {
    if (success) {
      alert.success("password reset successfully");
      navigate("/login");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, user, success, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="resetUpdateBox">
            <div className="resetMainBox">
              <h2>Reset Password</h2>
              <form
                className="resetUpdateForm"
                onSubmit={resetPasswordSubmit}
                // encType="multipart/form-data"
              >
                <div className="signUpEmail">
                  <LockOpenIcon />
                  <input
                    value={password}
                    type="password"
                    name="email"
                    required
                    placeholder="Enter new password.."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="signUpPassword">
                  <LockIcon />
                  <input
                    value={confirmPassword}
                    type="password"
                    name="password"
                    required
                    placeholder="Enter confirm password.."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetUpdateBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
