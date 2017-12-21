import React, { Component } from "react";
import Header from "../Header/Header.js";
import NewHomeForm from "../NewHomeForm/NewHomeForm.js";
import EditHomeForm from "../EditHome/EditHomeForm.js";
import HomeList from "../HomeList/HomeList.js";
import HomeShow from "../HomeShow/HomeShow.js";
import LoginForm from "../LoginForm/LoginForm.js";
import Logout from "../Logout.js";
import DeleteHome from "../DeleteHome.js";
import SignUpForm from "../SignUpForm/SignUpForm.js";
import Section from "../Section.js";
import axios from "axios";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import backend from "../BackendVariable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      userId: "",
      alertOn: true,
      msg: ""
    };
    this.retrieveHomes = this.retrieveHomes.bind(this);
    this.alertToggle = this.alertToggle.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
  }

  retrieveHomes() {
    if (localStorage.token) {
      axios
        .get(`${backend}api/homes`, {
          headers: { token: localStorage.token }
        })
        .then(response => {
          this.setState({
            homes: response.data.homes,
            userId: response.data.userid
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .get(`${backend}api/homes`)
        .then(response => {
          console.log("dogs");
          this.setState({
            homes: response.data.homes,
            userId: response.data.userid
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  alertToggle(status) {
    this.setState({
      alertOn: status
    });
  }

  onViewChange() {
    this.alertToggle(false);
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
            <Header
              msg={this.state.msg}
              alertOn={this.state.alertOn}
              alertToggle={this.alertToggle}
              onViewChange={this.onViewChange}
            />
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
                      onViewChange={this.onViewChange}
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
                      retrieveHomes={this.retrieveHomes}
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
                      msg={this.state.msg}
                      alertOn={this.state.alertOn}
                      alertToggle={this.alertToggle}
                      setMessage={this.setMessage}
                      retrieveHomes={this.retrieveHomes}
                    />
                  );
                }}
              />
              <Route
                path="/logout"
                render={props => {
                  return <Section children={<Logout {...props} />} />;
                }}
                msg={this.state.msg}
                alertOn={this.state.alertOn}
                alertToggle={this.alertToggle}
                setMessage={this.setMessage}
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
