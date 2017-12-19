import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({}) => {
	const headerStyle = {
		display: 'flex',
		justifyContent: 'space-around'
	}
	const logButton = {
		fontSize: '22px'
	}
	return (
		<div>
			<div style={logButton}>
				{localStorage.token && localStorage.token.length > 10 ? (
					<Link to="/logout">Logout</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
			</div>
			<div>
				<img src="../home-app-logo.png" height="200px" />
			</div>
			<nav style={headerStyle}>
				<Link to="/">Home</Link>
				<Link to="/new-home">New Home</Link>
			</nav>
		</div>
	)
}

export default Header
