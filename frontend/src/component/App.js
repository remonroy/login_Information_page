import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Pages/Registration";
import Home from "./Home/Home";
import AllUser from "./Pages/AllUser";
import Login from "./Pages/Login";
import Navbar from "./Navbar/Navbar";
import { useEffect } from "react";
import webFont from "webfontloader";
import store from "../component/store/index";
import { loadUser } from "./store/action/userAction";
import UserDetails from "./Pages/UserDetails";
import PrivetRoute from "./Route/PrivetRoute";
import EditProfile from "./Pages/EditProfile";
import PasswordUpdate from "./Pages/PasswordUpdate";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/allUser"
          element={
            <PrivetRoute>
              <AllUser />
            </PrivetRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivetRoute>
              <UserDetails />
            </PrivetRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <PrivetRoute>
              <EditProfile />
            </PrivetRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <PrivetRoute>
              <PasswordUpdate />
            </PrivetRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
