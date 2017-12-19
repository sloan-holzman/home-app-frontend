import React, { Component } from "react";
import AlertContainer from "react-alert";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  alertOptions = {
    offset: 14,
    position: "top right",
    theme: "dark",
    time: 4000,
    transition: "scale"
  };

  showAlert = () => {
    this.msg.show(this.props, {
      time: 2000,
      type: "success"
    });
  };

  render() {
    return (
      <div>
        <AlertContainer msg={this.props.msg} />
      </div>
    );
  }
}

export default Alert;
