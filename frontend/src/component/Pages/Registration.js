import React, { Fragment, useEffect, useState } from "react";
import "./Register.css";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { clearErrors, registerUser } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerDataChange = (e) => {
    // if (e.target.name === "avatar") {
    //   setAvatar(e.target.files[0]);
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setAvatarPreview(reader.result);
    //       // setAvatar(reader.result);
    //     }
    //   };
    //   reader.readAsDataURL(e.target.files[0]);
    // } else {
    //   setUser({ ...user, [e.target.name]: e.target.value });
    // }
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      // console.log("This is", e.target.files[0]);
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
  const registerSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", avatar);
    dispatch(registerUser(myForm));
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
      <div className="containerBox">
        <div className="registerBox">
          <h2>Register</h2>
          <form
            className="registerFrom"
            onSubmit={registerSubmit}
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
                onChange={registerDataChange}
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
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                value={password}
                type="password"
                name="password"
                required
                placeholder="Enter password.."
                onChange={registerDataChange}
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
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Registration;
