import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const Header = ({}) => {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-around"
  };
  return (
    <div>
      <nav style={headerStyle}>
        <h1>Home App</h1>
        <Link to="/">Home</Link>
        <Link to="/new-home">New Home</Link>
        {localStorage.token && localStorage.token.length > 10 ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Alert />
      </nav>
    </div>
  );
};

export default Header;
