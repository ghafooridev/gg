import React from "react";

import PropTypes from 'prop-types';

import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

const DropDown = function (props) {

	const {label, placeholder, addonType} = props;

	return (
		<>
			<label>{label}</label>
			<InputGroup>
				<InputGroupAddon addonType={addonType}>
					<InputGroupText>
						<i className="nc-icon nc-minimal-down"/>
					</InputGroupText>
				</InputGroupAddon>}
				<Input
					placeholder={placeholder}
					type='text'
					{...props}
				/>
			</InputGroup>
		</>
	)
}

DropDown.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	icon: PropTypes.element,
	addonType: PropTypes.string,
	rows:PropTypes.string,
	type:PropTypes.string
};

DropDown.defaultProps = {
	addonType: 'prepend',
	rows:false,
	type:'text'
};

export default DropDown