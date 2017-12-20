import React from "react";

const Section = ({ children, ...props }) => {
  const sectionStyle = {
    backgroundColor: "#deebfc"
  };

  return <div style={sectionStyle}>{children}</div>;
};

export default Section;
