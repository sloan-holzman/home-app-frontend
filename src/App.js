import React, { Component } from "react"
import Header from "./Header.js"
import NewHomeForm from "./NewHomeForm.js"
import HomeList from "./HomeList.js"
import HomeShow from "./HomeShow.js"
import LoginForm from "./LoginForm.js"
import SignUpForm from "./SignUpForm.js"

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props)
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
                render={(props) => {
                  return <NewHomeForm {...props} />
                }}
              />
              <Route
                path="/homes"
                render={(props) => {
                  return <HomeList {...props} />
                }}
              />
              <Route
                path="/homes/:id"
                render={(props) => {
                  return <HomeShow {...props} />
                }}
              />
              <Route
                path="/login"
                render={(props) => {
                  return <LoginForm {...props} />
                }}
              />
              <Route
                path="/signup"
                render={(props) => {
                  return <SignUpForm {...props} />
                }}
              />
              <Route
                path="/*"
                render={(props) => {
                  return <Redirect to="/homes" />
                }}
              />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

export default App
