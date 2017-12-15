import React from "react";
import PropTypes from "prop-types";

const Section = ({ children, ...props }) => {
  const sectionStyle = {
    margin: "5px",
    border: "1px solid black"
  };

  return <div style={sectionStyle}>{children}</div>;
};

export default Section;
