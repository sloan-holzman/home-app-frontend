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
				<Link className="content-link" to={`/homes/${this.props.home._id}`}>
					<img src={this.props.home.img_url} />
					<div className="content">
						<h3>Address </h3>
						<p>
							{this.props.home.street_address}, <br />
							{this.props.home.unit}
							{this.props.home.city}, {this.props.home.state} <br />
							{this.props.home.zipcode}
						</p>
						<h3>Price</h3>
						<p>${this.props.home.price_range}</p>
						<h3>BR</h3>
						<p>{this.props.home.num_bed}</p>
						<h3>BA</h3>
						<p>{this.props.home.num_bath}</p>
						{this.props.home.type_rent_buy === 'Buy' ? (
							<h3>For Sale</h3>
						) : (
							<h3> For Rent</h3>
						)}
						<h3>Sqft</h3>
						<p>{this.props.home.sq_ft}</p>
					</div>
				</Link>
			</div>
		)
	}
}

export default HomeSummary
