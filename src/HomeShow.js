import React from "react";
import { Link } from "react-router-dom";
import MyMapComponent from "./MyMapComponent.js"
import axios from "axios";


class HomeShow extends React.Component {
  constructor(props) {
		super(props)

		this.state = {
			home: {
        _id: '',
        owner_id: '',
				street_address: '',
				unit: '',
				city: '',
				state: '',
				zipcode: '',
				num_bed: '',
				num_bath: '',
				sq_ft: '',
				img_url: '',
				price_range: '',
				type_rent_buy: 'Rent'
			},
			errors: {},
			submitted: false,
			homeId: '',
      center: {},
		}
		this.getHome = this.getHome.bind(this)
    this.getCoordinates = this.getCoordinates.bind(this)

	}


	componentDidMount() {
    this.getHome()
	}

  getHome(){
    axios
    .get(`http://localhost:3001/api/homes/${this.props.match.params.id}`)
    .then(response => {
      console.log(response.data)
      this.setState({
        home: response.data,
        homeId:response.data._id
      }, (()=> this.getCoordinates()))
    })
  }


  getCoordinates(){
    axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=1417+chapin+st+nw+washington+dc&key=AIzaSyAWaxlS3Hg-U3SLUNPq6MjB2EKQp4eusps`)
    .then(response => {
      this.setState({
        center: {lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng}
      })
      console.log(response.data.results[0].geometry.location.lng)
    })
  }



  render() {
    if (!this.state.home) {
      return (
        <p>Loading...</p>
      )
    } else {
      let unit = (this.state.home.unit ? `, ${this.state.home.unit}` : "")
      let price = (this.state.home.type_rent_buy === "Rent" ? `$${this.state.home.price_range} per month` : `Price: ${this.state.home.price_range}`)

      return (
        <div>
          <img src={this.state.home.img_url} alt={this.state.home.street_address}/>
          <MyMapComponent isMarkerShown Center={this.state.center}/>
          <h3>{this.state.home.street_address}{unit}</h3>
          <p>{this.state.home.city}, {this.state.home.state} {this.state.home.zipcode}</p>
          <p>{price}</p>
          <p>{this.state.home.num_bed} beds - {this.state.home.num_bath} baths - {this.state.home.sq_ft} sqft</p>
          {
            (this.props.userId === this.state.home.owner_id) ?
              <div>
                <Link to={`/homes/${this.state.home._id}/edit`}>
                  Edit Home
                </Link>
                <br/>
                <Link to={`/homes/${this.state.home._id}/delete`}>
                  Delete Home
                </Link>
              </div>
            :
            <p></p>

          }
        </div>
      )
    }
  }
}

export default HomeShow;
