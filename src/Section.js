import React from "react";
import Alert from "./Alert";

const Section = ({ children, ...props }) => {
  const sectionStyle = {
    margin: "5px",
    border: "1px solid black"
  };

  return (
    <div style={sectionStyle}>
      <Alert />
      {children}
    </div>
  );
};

export default Section;
