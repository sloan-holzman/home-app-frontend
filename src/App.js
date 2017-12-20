import React, { Component } from "react";
import Header from "./Header.js";
import NewHomeForm from "./NewHomeForm.js";
import EditHomeForm from "./EditHomeForm.js";
import HomeList from "./HomeList.js";
import HomeShow from "./HomeShow.js";
import LoginForm from "./LoginForm.js";
import Logout from "./Logout.js";
import DeleteHome from "./DeleteHome.js";
import SignUpForm from "./SignUpForm.js";
import Section from "./Section.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import backend from "./BackendVariable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      userId: "",
      alertOn: true,
      msg: "hello"
    };
    this.retrieveHomes = this.retrieveHomes.bind(this);
    this.alertToggle = this.alertToggle.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  retrieveHomes() {
    axios
      .get(`${backend}api/homes`, {
        headers: { token: localStorage.token }
      })
      .then(response => {
        console.log("dogs");
        this.setState({
          homes: response.data.homes,
          userId: response.data.userid
        });
        console.log(typeof this.state.homes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  alertToggle() {
    this.setState({
      alertOn: !this.state.alertOn
    });
  }

  setMessage(message) {
    this.setState({
      msg: message
    });
  }

  componentDidMount() {
    this.retrieveHomes();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Header />
          </nav>
          <main>
            <Switch>
              <Route
                path="/new-home"
                render={props => {
                  return (
                    <NewHomeForm
                      retrieveHomes={this.retrieveHomes}
                      onSubmit={() => console.log("Submitted!")}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/homes"
                render={props => {
                  return (
                    <HomeList
                      userId={this.state.userId}
                      homes={this.state.homes}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/homes/:id/delete"
                render={props => {
                  return (
                    <DeleteHome
                      userId={this.state.userId}
                      homes={this.state.homes}
                      retrieveHomes={this.retrieveHomes}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/homes/:id/edit"
                render={props => {
                  return (
                    <EditHomeForm
                      retrieveHomes={this.retrieveHomes}
                      userId={this.state.userId}
                      homes={this.state.homes}
                      onSubmit={() => console.log("Submitted!")}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/homes/:id"
                render={props => {
                  return (
                    <HomeShow
                      userId={this.state.userId}
                      homes={this.state.homes}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/login"
                render={props => {
                  return (
                    <LoginForm
                      {...props}
                      onSubmit={() => console.log("submitted!")}
                    />
                  );
                }}
              />
              <Route
                path="/signup"
                render={props => {
                  return (
                    <SignUpForm
                      {...props}
                      onSubmit={() => console.log("submitted!")}
                    />
                  );
                }}
              />
              <Route
                path="/logout"
                render={props => {
                  return <Section children={<Logout {...props} />} />;
                }}
              />
              <Route
                path="/*"
                render={props => {
                  return <Redirect to="/homes" />;
                }}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
