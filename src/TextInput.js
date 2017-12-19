import React from 'react'
import PropTypes from 'prop-types'
import Label from './Label'

const TextInput = ({
	labelName,
	required,
	type,
	placeholder,
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
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange}
				style={error && errorBorderStyle}
				{...props}
			/>
			{children}
			{error && errorMessageDiv}
		</div>
	)
}

TextInput.propTypes = {
	labelName: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'number', 'password']),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.any,
	error: PropTypes.string,
	children: PropTypes.node,
	onChange: PropTypes.func.isRequired
}

TextInput.defaultProps = {
	type: 'text',
	required: false
}

export default TextInput
