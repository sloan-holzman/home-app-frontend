import React from "react";
import { Link } from "react-router-dom";
import "./HomeSummary.css";

class HomeSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const imageStyle = {
      border: "1px solid #000000",
      margin: "auto 20px"
    };
    return (
      <div className="home-summary">
        <Link className="content-link" to={`/homes/${this.props.home._id}`}>
          <div style={imageStyle} className="home-summary__image">
            <img src={this.props.home.img_url} alt="Home Image" />
          </div>
          <div className="home-summary__description">
            <div className="home-summary__address">
              <div>
                <h3>Address</h3>
              </div>
              <div>
                <p>
                  {this.props.home.street_address}, <br />
                  {this.props.home.unit}
                  {this.props.home.city}, {this.props.home.state} <br />
                  {this.props.home.zipcode}
                </p>
              </div>
            </div>
            <div className="home-summary__details">
              <div>
                <h3>Price </h3>
              </div>
              <div>
                <p>${this.props.home.price_range}</p>
              </div>
              <div>
                <h3>BR </h3>
              </div>
              <div>
                <p>{this.props.home.num_bed}</p>
              </div>
              <div>
                <h3>BA </h3>
              </div>
              <div>
                <p>{this.props.home.num_bath}</p>
              </div>
            </div>
            <div className="home-summary__details">
              <div>
                {this.props.home.type_rent_buy === "Buy" ? (
                  <h3>For Sale</h3>
                ) : (
                  <h3> For Rent</h3>
                )}
              </div>
              <div>
                <h3>Sqft</h3>
              </div>
              <div>
                <p>{this.props.home.sq_ft}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default HomeSummary;
