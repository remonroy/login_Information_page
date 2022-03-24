import React, { Fragment, useEffect, useState } from "react";
import * as Types from "../store/action/type";
import "./EditProfile.css";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { clearErrors, editUser, loadUser } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const EditProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      setAvatar(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const updateSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.append("avatar", avatar);
    dispatch(editUser(myForm));
    
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      alert.success("update successfully");
      navigate("/account");
      dispatch(loadUser());
      dispatch({ type: Types.UPDATE_USER_RESET });
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
          <div className="containerEditBox">
            <div className="registerBox">
              <h2>Update profile</h2>
              <form
                className="registerFrom"
                onSubmit={updateSubmit}
                // encType="multipart/form-data"
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    value={name}
                    type="text"
                    name="name"
                    required
                    placeholder="Enter Name.."
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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

                <div id="registerImage">
                  <img src={avatarPreview} alt="avatar/preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    // onChange={registerDataChange}
                    onChange={handleImage}
                  />
                </div>
                <input type="submit" value="Update" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditProfile;
