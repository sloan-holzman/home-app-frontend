import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  alertStyle = {
    color: "green"
  };

  render() {
    return (
      <div style={this.alertStyle}>
        <h3>{this.props.msg}</h3>
      </div>
    );
  }
}

export default Alert;
