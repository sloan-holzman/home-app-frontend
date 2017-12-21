import React from "react";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.token = "";
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
