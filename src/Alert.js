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
        <h1>{this.props.msg}</h1>
      </div>
    );
  }
}

export default Alert;
