import React from "react";
import axios from "axios";
import backend from "./BackendVariable";

class DeleteHome extends React.Component {
  constructor(props) {
    super(props);
    this.deleteHome = this.deleteHome.bind(this);
  }

  logout() {
    this.props.history.push(`/`);
  }

  componentDidMount() {
    this.deleteHome();
  }

  deleteHome() {
    axios
      .delete(`http://localhost:3001/api/homes/${this.props.match.params.id}`, {
        headers: { token: localStorage.token }
      })
      .then(response => {
        console.log("deleted");
        this.props.retrieveHomes();
      })
      .then(() => {
        this.props.history.push(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <p>Deleting...</p>
      </div>
    );
  }
}

export default DeleteHome;
