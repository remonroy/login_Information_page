import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navBar">
      {/* <div>
        <h1>Remon roy</h1>
      </div> */}
      <div className="navItem">
        <ul className="navLink">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/allUser">AllUser</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
