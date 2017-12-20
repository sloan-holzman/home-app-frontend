import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Header.css'
const Header = ({}) => {
	return (
		<div className="navs">
			<Link to="/">
				<img src="../home-app-logo.png" />{' '}
			</Link>
			<div className="navs__links">
				<Link to="/">Homes</Link>
				<Link to="/new-home">Add Listing</Link>
				{localStorage.token && localStorage.token.length > 10 ? (
					<Link to="/logout">Log Out</Link>
				) : (
					<Link to="/login">Log In</Link>
				)}
			</div>
		</div>
	)
}

export default Header
