import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from "react-router-dom"

const Header = ({}) => {

  return (
    <div>
      <nav>
        <h1>Home App</h1>
        <Link to="/">Home</Link>
        <Link to="/new-home">New Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  )
}


export default Header
