import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class HomeSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Link to={`/homes/${this.props.home._id}`}>
          Address: {this.props.home.street_address}, {this.props.home.city}{" "}
          {this.props.home.state}
        </Link>
        <p>
          For {this.props.home.type_rent_buy} in range:{" "}
          {this.props.home.price_range}
        </p>
      </div>
    );
  }
}

export default HomeSummary;
