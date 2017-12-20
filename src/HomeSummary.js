import React from 'react'
import { Link } from 'react-router-dom'
import './HomeSummary.css'
class HomeSummary extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<Link to={`/homes/${this.props.home._id}`}>
					<h3>Address </h3>
					<p>
						{this.props.home.street_address}, {this.props.home.unit}
						{this.props.home.city} {this.props.home.state} ,{this.props.home.zipcode}
					</p>
					<h3>Price</h3>
					<p>${this.props.home.price_range}</p>
					<h3>BR</h3>
					<p>{this.props.home.num_bed}</p>
					<h3>BA</h3>
					<p>{this.props.home.num_bath}</p>
					<h3>For {this.props.home.type_rent_buy}</h3>
					<h3>Sqft</h3>
					<p>{this.props.home.sq_ft}</p>
				</Link>
			</div>
		)
	}
}

export default HomeSummary
