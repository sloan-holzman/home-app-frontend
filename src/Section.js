import React from 'react'

const Section = ({ children, ...props }) => {
	const sectionStyle = {
		backgroundColor: '#ebeef4'
	}

	return <div style={sectionStyle}>{children}</div>
}

export default Section
