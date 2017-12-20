import React from 'react'
import PropTypes from 'prop-types'
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import axios from 'axios'
import './SignUpForm.css'

class SignUpForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				email: '',
				password: '',
				confirmPassword: ''
			},
			errors: {},
			submitted: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(event) {
		const user = this.state.user
		user[event.target.name] = event.target.value
		this.setState({ user })
	}

	passwordStrength(password) {
		if (!password) return null
		if (password.length >= this.props.minPasswordLength) return 100
		const percentOfMinLength = parseInt(
			password.length / this.props.minPasswordLength * 100,
			10
		)
		return percentOfMinLength
	}

	validate({ email, password, confirmPassword }) {
		const errors = {}
		const { minPasswordLength } = this.props
		const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

		if (!email) errors.email = 'Email required.'
		if (!emailRegex.test(email)) errors.email = 'Email must be valid.'
		if (password.length < minPasswordLength)
			errors.password = `Password must be at least ${minPasswordLength} characters.`
		if (password !== confirmPassword) errors.password = `Passwords must match`

		this.setState({ errors })
		const formIsValid = Object.getOwnPropertyNames(errors).length === 0
		return formIsValid
	}

	onSubmit(event) {
		event.preventDefault()
		const formIsValid = this.validate(this.state.user)
		if (formIsValid) {
			this.props.onSubmit(this.state.user)
			this.setState({ submitted: true })
		}
		axios
			.post('http://localhost:3001/signup', {
				email: this.state.user.email,
				password: this.state.user.password
			})
			.then(response => {
				console.log(response)
				localStorage.token = response.data.token
				console.log(localStorage.token)
				this.props.history.push('/')
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { errors, submitted } = this.state
		const { email, password, confirmPassword } = this.state.user
		const formStyle = {
			border: '1px solid #000000',
			padding: '5px 50px',
			width: '500px',
			margin: '2px auto',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			backgroundColor: 'white'
		}
		return submitted ? (
			<h2>{this.props.confirmationMessage}</h2>
		) : (
			<div>
				<div className="form-spacer" />
				<div style={formStyle}>
					<TextInput
						htmlId="signup-form-email"
						labelName="Email"
						name="email"
						required
						error={errors.email}
						onChange={this.onChange}
					/>
					<PasswordInput
						htmlId="signup-form-password"
						name="password"
						strengthPercentage={this.passwordStrength(password)}
						showVisibilityToggle
						maxLength={24}
						error={errors.password}
						onChange={this.onChange}
					/>
					<PasswordInput
						htmlId="signup-form-password"
						name="confirmPassword"
						showVisibilityToggle
						maxLength={24}
						error={errors.password}
						onChange={this.onChange}
						labelName="Confirm Password"
					/>
					<input type="submit" value="Sign Up" onClick={this.onSubmit} />
				</div>
			</div>
		)
	}
}

SignUpForm.propTypes = {
	confirmationMessage: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	minPasswordLength: PropTypes.number
}

SignUpForm.defaultProps = {
	confirmationMessage:
		'Thanks for signing up! You should receive an email confirmation shortly.',
	minPasswordLength: 8
}

export default SignUpForm
