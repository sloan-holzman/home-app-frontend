import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from './TextInput'

class PasswordInput extends Component {

  constructor (props) {
    super(props)
    this.state = { showPassword: false }
    this.toggleShowPassword = this.toggleShowPassword.bind(this)
  }

  toggleShowPassword () {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render () {
    const {
      labelName,
      value,
      name,
      placeholder,
      maxLength,
      strengthPercentage,
      error,
      onChange,
      ...props
    } = this.props

    const inputType = this.state.showPassword ? 'text' : 'password'

    const toggleShowStyle = {
      marginLeft: 5,
      textDecoration: 'none',
      display: 'inline'
    }

    return (
      <TextInput
        type={inputType}
        labelName={labelName}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        error={error}
        required
        onChange={onChange}
        {...props}
      >
        <p onClick={this.toggleShowPassword} style={toggleShowStyle}>
          Show Password
        </p>


      </TextInput>
    )
  }
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  strengthPercentage: PropTypes.number,
  error: PropTypes.string
}

PasswordInput.defaultProps = {
  maxLength: 24,
  showVisibilityToggle: false,
  labelName: 'Password'
}

export default PasswordInput
