import React, { Component } from "react";
import Header from "./Header.js";
import NewHomeForm from "./NewHomeForm.js";
import HomeList from "./HomeList.js";
import HomeShow from "./HomeShow.js";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";
import Section from "./Section.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

if (localStorage.token) {
  axios.defaults.headers.common["token"] = localStorage.token;
} else {
  axios.defaults.headers.common["token"] = "";
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      userId: ""
    };
    this.retrieveHomes = this.retrieveHomes.bind(this);
  }

  retrieveHomes() {
    axios
      .get("http://localhost:3001/api/homes")
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
                    <Section
                      children={
                        <NewHomeForm
                          retrieveHomes={this.retrieveHomes}
                          onSubmit={() => console.log("Submitted!")}
                          {...props}
                        />
                      }
                    />
                  );
                }}
              />
              <Route
                exact
                path="/homes"
                render={props => {
                  return (
                    <Section
                      children={
                        <HomeList
                          userId={this.state.userId}
                          homes={this.state.homes}
                          {...props}
                        />
                      }
                    />
                  );
                }}
              />
              <Route
                path="/homes/:id"
                render={props => {
                  return (
                    <Section
                      children={
                        <HomeShow
                          userId={this.state.userId}
                          homes={this.state.homes}
                          {...props}
                        />
                      }
                    />
                  );
                }}
              />
              <Route
                path="/login"
                render={props => {
                  return (
                    <Section
                      children={
                        <LoginForm
                          {...props}
                          onSubmit={() => console.log("submitted!")}
                        />
                      }
                    />
                  );
                }}
              />
              <Route
                path="/signup"
                render={props => {
                  return (
                    <Section
                      children={
                        <SignUpForm
                          {...props}
                          onSubmit={() => console.log("submitted!")}
                        />
                      }
                    />
                  );
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
