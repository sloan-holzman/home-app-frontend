import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import axios from "axios";
import DropDown from "./DropDown";
import backend from "./BackendVariable";
import "./NewHomeForm.css";
import Section from "./Section";

// if (localStorage.token) {
//   axios.defaults.headers.common["token"] = localStorage.token;
// } else {
//   axios.defaults.headers.common["token"] = "";
// }

class NewHomeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      home: {
        street_address: "",
        unit: "",
        city: "",
        state: "",
        zipcode: "",
        num_bed: "",
        num_bath: "",
        sq_ft: "",
        img_url: "",
        price_range: "",
        type_rent_buy: "Rent"
      },
      errors: {},
      submitted: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    const home = this.state.home;
    home[event.target.name] = event.target.value;
    console.log(event.target.value);
    this.setState({ home });
  }
  validate({
    street_address,
    unit,
    city,
    state,
    zipcode,
    num_bed,
    num_bath,
    sq_ft,
    img_url,
    price_range,
    type_rent_buy
  }) {
    const errors = {};

    if (!street_address) errors.street_address = "Street address required.";
    if (!city) errors.city = "City required.";
    if (!state) errors.state = "State required.";
    if (!zipcode) errors.zipcode = "Zipcode required.";
    if (!num_bed) errors.num_bed = "Number of beds required.";
    if (!num_bath) errors.num_bath = "Number of bathrooms required.";
    if (!price_range) errors.price_range = "Price range required.";
    if (!type_rent_buy) errors.type_rent_buy = "Field required.";

    this.setState({ errors });
    const formIsValid = Object.getOwnPropertyNames(errors).length === 0;
    return formIsValid;
  }
  onSubmit(event) {
    event.preventDefault();
    const formIsValid = this.validate(this.state.home);
    if (formIsValid) {
      this.props.onSubmit(this.state.home);
      this.setState({ submitted: true });
    }
    axios({
      method: "POST",
      url: `${backend}api/homes/`,
      headers: { token: localStorage.token },
      data: {
        street_address: this.state.home.street_address,
        unit: this.state.home.unit,
        city: this.state.home.city,
        state: this.state.home.state,
        zipcode: this.state.home.zipcode,
        num_bed: this.state.home.num_bed,
        num_bath: this.state.home.num_bath,
        sq_ft: this.state.home.sq_ft,
        img_url: this.state.home.img_url,
        price_range: this.state.home.price_range,
        type_rent_buy: this.state.home.type_rent_buy
      }
    })
      .then(response => {
        console.log(response);
        console.log(response.data._id);
        let homeId = response.data._id;
        this.props.retrieveHomes();
        return homeId;
      })
      .then(homeId => {
        console.log(this.props);
        this.props.setMessage("Home created!");
        this.props.alertToggle(true);
        this.props.history.push(`/homes/${homeId}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { errors, submitted } = this.state;
    const {
      street_address,
      unit,
      city,
      state,
      zipcode,
      num_bed,
      num_bath,
      sq_ft,
      img_url,
      price_range,
      type_rent_buy
    } = this.state.home;
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

    let formDisplay = null;
    if (localStorage.token && localStorage.token.length > 10) {
      if (submitted) {
        formDisplay = <h2> {this.props.confirmationMessage} </h2>;
      } else {
        formDisplay = (
          <div className="form-container">
            <div className="form-spacer"> </div>
            <div style={formStyle}>
              <h1> Add Home </h1>
              <h4>
                <TextInput
                  labelName="Street Address:"
                  name="street_address"
                  placeholder="e.g. 111 River St."
                  required
                  error={errors.street_address}
                  onChange={this.onChange}
                />

                <TextInput
                  labelName="Unit:"
                  name="unit"
                  placeholder="e.g. 14F"
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="City:"
                  name="city"
                  placeholder="e.g. Mclean"
                  required
                  error={errors.city}
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="State:"
                  name="state"
                  placeholder="e.g. VA"
                  required
                  error={errors.state}
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="Zipcode:"
                  name="zipcode"
                  placeholder="e.g. 22222"
                  required
                  error={errors.zipcode}
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="Bedrooms:"
                  name="num_bed"
                  placeholder="e.g. 2"
                  required
                  error={errors.num_bed}
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="Bathrooms:"
                  name="num_bath"
                  placeholder="e.g. 2"
                  required
                  error={errors.num_bath}
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="Sqft:"
                  name="sq_ft"
                  placeholder="e.g. 700"
                  required
                  error={errors.sq_ft}
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="Image Url:"
                  name="img_url"
                  placeholder="https://yourhomephoto.jpg"
                  onChange={this.onChange}
                />
                <TextInput
                  labelName="Price range: $"
                  name="price_range"
                  placeholder="e.g. $ 1000 "
                  required
                  error={errors.price_range}
                  onChange={this.onChange}
                />
                <DropDown
                  labelName=" Property for rent or sell ?"
                  name="type_rent_buy"
                  required
                  error={errors.type_rent_buy}
                  onChange={this.onChange}
                />
              </h4>
              <input type="submit" value="Submit" onClick={this.onSubmit} />
            </div>
          </div>
        );
      }
    } else {
      formDisplay = <p>You must be logged in if you want to post a new home</p>;
    }
    return (
      <Section>
        <div>{formDisplay}</div>
      </Section>
    );
  }
}

NewHomeForm.propTypes = {
  confirmationMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};
NewHomeForm.defaultProps = {
  confirmationMessage: "Home has been submitted!"
};
export default NewHomeForm;
