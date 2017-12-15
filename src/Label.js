import React from 'react'
import PropTypes from 'prop-types'


const Label = ({ labelName, required }) => {
  let requiredStyle = { color: "rgb(255,0,0)"}
  const fieldRequired = <span style={requiredStyle}>*</span>

// required is a boolean.  if required is true (or even if it just exists), it will keep evaluating and return fieldRequired.  if it's false or not entered, it will be falsey and not continue
  return (
    <label>
      { labelName } { required && fieldRequired }
    </label>
  )
}

Label.propTypes = {
  labelName: PropTypes.string.isRequired,
  required: PropTypes.bool
}

export default Label
