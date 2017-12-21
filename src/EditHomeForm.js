import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import axios from "axios";
import DropDown from "./DropDown";
import backend from "./BackendVariable";
import Section from "./Section";
import "./EditHomeForm.css";

class EditHomeForm extends React.Component {
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
      submitted: false,
      homeId: ""
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

  componentDidMount() {
    axios
      .get(`${backend}api/homes/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            home: response.data,
            homeId: response.data._id
          },
          () => console.log(this.state.home)
        );
      });
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
      method: "PUT",
      url: `${backend}api/homes/${this.props.match.params.id}`,
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
        this.props.setMessage("Home updated!");
        this.props.alertToggle(true);
        this.props.history.push(`/homes/${this.state.homeId}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { errors, submitted } = this.state;

    let home = this.props.homes.find(
      home => home._id === this.props.match.params.id
    );

    if (!home) {
      return (
        <Section>
          <p>Loading...</p>
        </Section>
      );
    } else {
      return (
        <Section>
          <div className="form-style">
            <h2> Edit </h2>
            <h4>
              <TextInput
                labelName="Street Address:"
                name="street_address"
                defaultValue={home.street_address}
                required
                error={errors.street_address}
                onChange={this.onChange}
                ref="street_address"
              />
              <TextInput
                labelName="Unit:"
                name="unit"
                defaultValue={home.unit}
                onChange={this.onChange}
              />
              <TextInput
                labelName="City:"
                name="city"
                defaultValue={home.city}
                required
                error={errors.city}
                onChange={this.onChange}
              />
              <TextInput
                labelName="State:"
                name="state"
                defaultValue={home.state}
                required
                error={errors.state}
                onChange={this.onChange}
              />
              <TextInput
                labelName="Zipcode:"
                name="zipcode"
                defaultValue={home.zipcode}
                required
                error={errors.zipcode}
                onChange={this.onChange}
              />
              <TextInput
                labelName="Bedrooms:"
                name="num_bed"
                defaultValue={home.num_bed}
                required
                error={errors.num_bed}
                onChange={this.onChange}
              />
              <TextInput
                labelName="Bathrooms:"
                name="num_bath"
                defaultValue={home.num_bath}
                required
                error={errors.num_bath}
                onChange={this.onChange}
              />
              <TextInput
                labelName="Sqft:"
                name="sq_ft"
                defaultValue={home.sq_ft}
                required
                error={errors.sq_ft}
                onChange={this.onChange}
              />
              <TextInput
                labelName="Image Url:"
                name="img_url"
                defaultValue={home.img_url}
                onChange={this.onChange}
              />
              <TextInput
                labelName="Price range: $"
                name="price_range"
                defaultValue={home.price_range}
                required
                error={errors.price_range}
                onChange={this.onChange}
              />
              <DropDown
                labelName=" Property for rent or sell ?"
                name="type_rent_buy"
                defaultValue={home.type_rent_buy}
                required
                error={errors.type_rent_buy}
                onChange={this.onChange}
              />
            </h4>
            <input type="submit" value="Submit" onClick={this.onSubmit} />
          </div>
        </Section>
      );
    }
  }
}

EditHomeForm.propTypes = {
  confirmationMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};
EditHomeForm.defaultProps = {
  confirmationMessage: "Home has been submitted!"
};
export default EditHomeForm;
