import React, { Component } from "react";
import Header from "./Header.js";
import NewHomeForm from "./NewHomeForm.js";
import HomeList from "./HomeList.js";
import HomeShow from "./HomeShow.js";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";
import Section from "./Section.js";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
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
                  return <Section children={<NewHomeForm />} {...props} />;
                }}
              />
              <Route
                path="/homes"
                render={props => {
                  return <Section children={<HomeList />} {...props} />;
                }}
              />
              <Route
                path="/homes/:id"
                render={props => {
                  return <Section children={<HomeShow />} {...props} />;
                }}
              />
              <Route
                path="/login"
                render={props => {
                  return <Section children={<LoginForm />} {...props} />;
                }}
              />
              <Route
                path="/signup"
                render={props => {
                  return <Section children={<SignUpForm />} {...props} />;
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
