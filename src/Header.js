import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Header.css";
import Alert from "./Alert";

const Header = ({ ...props }) => {
  return (
    <div className="navs">
      <Link to="/">
        <img src="../home-app-logo.png" />{" "}
      </Link>
      <div className="navs__links">
        <Link to="/" onClick={props.onViewChange}>
          Homes
        </Link>
        <Link to="/new-home" onClick={props.onViewChange}>
          Add Listing
        </Link>
        {localStorage.token && localStorage.token.length > 10 ? (
          <Link to="/logout" onClick={props.onViewChange}>
            Log Out
          </Link>
        ) : (
          <Link to="/login" onClick={props.onViewChange}>
            Log In
          </Link>
        )}
      </div>
      {props.alertOn ? <Alert msg={props.msg} /> : <p />}
    </div>
  );
};

export default Header;
