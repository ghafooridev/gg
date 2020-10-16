import React from 'react';

import PropTypes from 'prop-types';

import ReactstrapButton from 'reactstrap/lib/Button';

const Button = function (props) {
	const {
		className,
		color,
		size,
		outline,
		disabled,
		onClick,
		label
	} = props;

	return (
		<ReactstrapButton
			className={className}
			color={color}
			size={size}
			outline={outline}
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</ReactstrapButton>
	)
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	outline: PropTypes.bool,
	color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
	size: PropTypes.oneOf(['sm', 'lg']),
}

Button.defaultProps = {
	size: 'lg'
}

export default Button;