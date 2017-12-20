import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { Link } from "react-router-dom";
import backend from "./BackendVariable";
import Section from "./Section";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      errors: {},
      submitted: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  validate({ email, password }) {
    const errors = {};
    const { minPasswordLength } = this.props;
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email) errors.email = "Email required.";
    if (!emailRegex.test(email)) errors.email = "Email must be valid.";
    if (password.length < minPasswordLength)
      errors.password = `Password must be at least ${minPasswordLength} characters.`;

    this.setState({ errors });
    const formIsValid = Object.getOwnPropertyNames(errors).length === 0;
    return formIsValid;
  }

  onSubmit(event) {
    event.preventDefault();
    const formIsValid = this.validate(this.state.user);
    if (formIsValid) {
      this.props.onSubmit(this.state.user);
      this.setState({ submitted: true });
    }
    axios
      .post(`${backend}login`, {
        email: this.state.user.email,
        password: this.state.user.password
      })
      .then(response => {
        console.log(response);
        console.log(response.data.token);
        localStorage.token = response.data.token;
        console.log(localStorage.token);
        this.props.setMessage("Logged in successfully!");
        this.props.alertToggle(true);
        this.props.retrieveHomes();
        this.props.history.push("/");
      })
      .catch(err => {
        this.props.setMessage("Sorry, something went wrong.");
        this.props.alertToggle(true);
        console.log(err);
      });
  }

  render() {
    const { errors, submitted } = this.state;
    const { email, password } = this.state.user;
    const formStyle = {
      border: "1px solid #000000",
      padding: "5px 50px",
      width: "500px",
      margin: "2px auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "white"
    };
    return submitted ? (
      <Section>
        <h2>{this.props.confirmationMessage}</h2>
      </Section>
    ) : (
      <Section>
        <div>
          <div className="form-spacer"> </div>
          <div style={formStyle}>
            <TextInput
              htmlId="login-form-email"
              labelName="Email"
              name="email"
              required
              error={errors.email}
              onChange={this.onChange}
            />
            <PasswordInput
              htmlId="login-form-password"
              name="password"
              showVisibilityToggle
              maxLength={24}
              error={errors.password}
              onChange={this.onChange}
            />
            <input type="submit" value="Login" onClick={this.onSubmit} />
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Section>
    );
  }
}

LoginForm.propTypes = {
  confirmationMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  minPasswordLength: PropTypes.number
};

LoginForm.defaultProps = {
  confirmationMessage:
    "Thanks for signing up! You should receive an email confirmation shortly.",
  minPasswordLength: 8
};

export default LoginForm;
