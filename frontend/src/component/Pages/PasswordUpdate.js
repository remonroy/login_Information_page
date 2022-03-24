import React, { Fragment, useEffect, useState } from "react";
import * as Types from "../store/action/type";
import "./PasswordUpdate.css";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (isUpdated) {
      alert.success("password update successfully");
      navigate("/account");
      dispatch(loadUser());
      dispatch({ type: Types.UPDATE_PASSWORD_RESET });
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, user, isUpdated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="passwordUpdateBox">
            <div className="passwordMainBox">
              <h2>Change Password</h2>
              <form
                className="passwordUpdateForm"
                onSubmit={updatePasswordSubmit}
                // encType="multipart/form-data"
              >
                <div className="signUpName">
                  <VpnKeyIcon />
                  <input
                    value={oldPassword}
                    type="password"
                    name="name"
                    required
                    placeholder="Enter old password.."
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="signUpEmail">
                  <LockOpenIcon />
                  <input
                    value={newPassword}
                    type="password"
                    name="email"
                    required
                    placeholder="Enter new password.."
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  className="passwordUpdateBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PasswordUpdate;
