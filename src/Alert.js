import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.msg}</h3>
      </div>
    );
  }
}

export default Alert;
