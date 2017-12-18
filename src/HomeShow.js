import React from "react";
import PropTypes from "prop-types";

class HomeShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: false
    };
  }

  checkOwner() {
    axios
      .get(`http://localhost:3001/api/homes/${this.props.match.params.id}`, {
        token: localStorage.token,
      })
      .then(response => {
        this.setOwner(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  setOwner(response) {
    this.setState({
      owner: response,
    })
  }

  componentDidMount() {
    this.checkOwner()
  }


  render() {
    let home = this.props.homes.filter(home => home.id === this.props.match.params.id)[0]
    let unit = (home.unit ? `, ${home.unit}` : "")
    let price = (home.type_rent_buy == "Rent" ? `${home.price_range} per month` : `Price: ${home.price_range}`)
    return (
      <div>
        <img src={home.img_url} alt="Picture of home"/>
        <h3>{home.street_address} {unit}</h3>
        <h3>{home.city}, {home.state} {home.zipcode}</h3>
        <h4>{home.num_bed} bed -  {home.num_bath} bath -  {home.sq_ft} sqft</h4>
        <h4>{price}</h4>
        {
          {this.state.owner} ?
            <p><a href="/api/homes/"+{this.props.match.params.id}>Edit Home</a></p> :
            <p></p>
        }
      </div>
    )
  }
}

export default HomeShow;
