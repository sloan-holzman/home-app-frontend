import React from 'react'

const Section = ({ children, ...props }) => {
	const sectionStyle = {}

	return <div style={sectionStyle}>{children}</div>
}

export default Section
