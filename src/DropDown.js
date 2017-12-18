import React from 'react'
import PropTypes from 'prop-types'
import Label from './Label'

const DropDown = ({
	labelName,
	required,
	value,
	name,
	onChange,
	children,
	error,
	...props
}) => {
	return (
		<div>
			<Label labelName={labelName} required={required} />
			<select onChange={this.handleChange}>
				<option value="Rent">Rent </option>
				<option value="Buy">Buy </option>
			</select>
		</div>
	)
}
DropDown.proTypes = {
	labelName: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.any,
	error: PropTypes.string,
	children: PropTypes.node,
	onChange: PropTypes.func.isRequired
}

DropDown.defaultProps = {
	required: false
}

export default DropDown
