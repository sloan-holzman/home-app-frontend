import React from 'react'
import { Link } from 'react-router-dom'
import './HomeShow.css'

class HomeShow extends React.Component {
	render() {
		// let home = this.props.homes.filter((home) => home._id === this.props.match.params.id)
		// console.log(home[0])
		// let unit = (home.unit ? `, ${home.unit}` : "")
		// let price = (home.type_rent_buy === "Rent" ? `${home.price_range} per month` : `Price: ${home.price_range}`)
		let homes = this.props.homes.map((home, i) => {
			if (home._id === this.props.match.params.id) {
				console.log(home)
				let unit = home.unit ? `, ${home.unit}` : ''
				let price =
					home.type_rent_buy === 'Rent'
						? `$${home.price_range} per month`
						: `Price: ${home.price_range}`
				return (
					<div key={i}>
						<img src={home.img_url} alt=" Home Image" />
						<h3>
							{home.street_address} {unit}
						</h3>
						<p>
							{home.city}, {home.state} {home.zipcode}
						</p>
						<p>{price}</p>
						<p>
							{home.num_bed} beds - {home.num_bath} baths - {home.sq_ft} sqft
						</p>
						{this.props.userId === home.owner_id ? (
							<div>
								<Link to={`/homes/${home._id}/edit`}>Edit Home</Link>
								<br />
								<Link to={`/homes/${home._id}/delete`}>Delete Home</Link>
							</div>
						) : (
							<p />
						)}
					</div>
				)
			}
		})

		return <div>{homes}</div>
	}
}

export default HomeShow
