import React, { Component } from "react";
<<<<<<< HEAD
=======
import AlertContainer from "react-alert";
>>>>>>> master

class Alert extends Component {
  constructor(props) {
    super(props);
  }

<<<<<<< HEAD
  alertStyle = {
    color: "green"
=======
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
>>>>>>> master
  };

  render() {
    return (
<<<<<<< HEAD
      <div style={this.alertStyle}>
        <h1>{this.props.msg}</h1>
=======
      <div>
        <AlertContainer msg={this.props.msg} />
>>>>>>> master
      </div>
    );
  }
}

export default Alert;
