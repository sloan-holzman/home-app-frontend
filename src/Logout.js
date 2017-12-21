import React from "react";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log("*******");
    console.log(this.props);
    localStorage.token = "";
    // this.props.setMessage("Logged out successfully");
    // this.props.alertToggle(true);
    this.props.history.push(`/`);
  }

  componentDidMount() {
    this.logout();
  }

  render() {
    return <div />;
  }
}

export default Logout;
