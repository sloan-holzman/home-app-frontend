import React from "react";

const Section = ({ children, ...props }) => {
  const sectionStyle = {
    backgroundColor: "#deebfc",
    padding: "30px",
    flex: "1 1 auto",
    position: "relative",
    overflowY: "scroll"
  };

  return <div style={sectionStyle}>{children}</div>;
};

export default Section;
