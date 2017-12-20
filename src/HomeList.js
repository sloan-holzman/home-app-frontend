import React from 'react'
import PropTypes from 'prop-types'
import HomeSummary from './HomeSummary'
import './HomeList.css'

class HomeList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let homes = this.props.homes.map((home, i) => {
			return (
				<div class="home-display">
					<p className="home" key={i}>
						{<HomeSummary home={home} />}
					</p>
				</div>
			)
		})
		return (
			<div>
				<p>{homes}</p>
			</div>
		)
	}
}

export default HomeList
