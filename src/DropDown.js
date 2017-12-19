import React from 'react'
import PropTypes from 'prop-types'
import Label from './Label'

const DropDown = ({
	labelName,
	required,
	type,
	value,
	name,
	onChange,
	// children is a special prop type.  if you want to include any special components/jsx inside the component below
	children,
	error,
	...props
}) => {
	let errorStyle = { color: 'rgb(255,0,0)' }
	let errorBorderStyle = { border: 'solid 1px rgb(255,0,0)' }
	let errorMessageDiv = <div style={errorStyle}> {error} </div>

	return (
		<div>
			<Label labelName={labelName} required={required} />
			<select
				onChange={onChange}
				type={type}
				value={value}
				name={name}
				style={error && errorBorderStyle}
				{...props}
   >
				<option value="Rent">Rent </option>
				<option value="Buy">Buy </option>
			</select>
			{children}
			{error && errorMessageDiv}
		</div>
	)
}

DropDown.propTypes = {
	labelName: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'number', 'password']),
	required: PropTypes.bool,
	value: PropTypes.any,
	error: PropTypes.string,
	children: PropTypes.node,
	onChange: PropTypes.func.isRequired
}

DropDown.defaultProps = {
	type: 'text',
	required: false
}

export default DropDown
