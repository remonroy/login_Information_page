import React, { Fragment } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import MouseIcon from "@material-ui/icons/Mouse";

const Home = () => {
  return (
    <Fragment>
      <div className="homePage">
        <h1>Welcome Login Information page</h1>
        <Link to="/registration">
          Click Here
          <MouseIcon />
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
