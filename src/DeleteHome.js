import React from "react";
import axios from "axios";
import backend from "./BackendVariable";

if (localStorage.token) {
  axios.defaults.headers.common["token"] = localStorage.token;
} else {
  axios.defaults.headers.common["token"] = "";
}

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
      .delete(`{backend}api/homes/${this.props.match.params.id}`)
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
