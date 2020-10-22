import React from 'react';

import PropTypes from 'prop-types';

import {
	Button,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
	Modal,
} from 'reactstrap';

// core components
import LandingNavbar from '../components/Navbars/LandingNavbar.js';
import LandingPageHeader from '../components/Headers/LandingPageHeader.js';
import LandingFooter from '../components/Footers/LandingFooter.js';
import GameCard from 'components/GameCard.js';
import authenticationService from 'services/authentication.service.js';
import Feedback from './Feedback';
import dialogAction from "../redux/actions/dialogAction";

const Register = function () {
	return (
		<div>
				<div className="modal-header no-border-header text-center">
					<h6 className="text-muted">Welcome</h6>
					<h3 className="modal-title text-center">GGchat</h3>
					<p>Register your account</p>
				</div>
				<div className="modal-body">
					<form onSubmit={(e) => e.preventDefault()}>
						<FormGroup>
							<Label for="Name">Full Name</Label>
							<Input
								type="text"
								name="name"
								id="Name"
								placeholder="Enter Name"
								//onChange={(e) => handleChange(e)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="username">Username</Label>
							<Input
								type="text"
								name="username"
								id="username"
								placeholder="Enter Username"
								//onChange={(e) => handleChange(e)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="emailAdd">Email</Label>
							<Input
								type="email"
								name="email"
								id="emailAdd"
								placeholder="Enter Email"
								//onChange={(e) => handleChange(e)}
							/>
							<FormText color="muted">
								Please enter your .edu email address
							</FormText>
						</FormGroup>
						<FormGroup>
							<Label for="Password">Password</Label>
							<Input
								type="password"
								name="password"
								id="Password"
								placeholder="Password"
								autoComplete="off"
								//onChange={(e) => handleChange(e)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="University">University Name</Label>
							<Input
								type="text"
								name="university"
								id="University"
								placeholder="Arizona State University"
								autoComplete="off"
								//onChange={(e) => handleChange(e)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="Description">Description</Label>
							<Input
								type="text"
								name="description"
								id="Description"
								placeholder="I love playing chess and surfing"
								autoComplete="off"
								//onChange={(e) => handleChange(e)}
							/>
						</FormGroup>
						<FormText color="muted">
							We'll never share your information with anyone else.
						</FormText>
						<FormText
							color="red"
							style={{textAlign: 'center', color: 'red', fontSize: '0.9em'}}
						>
							{signupErrors}
						</FormText>
					</form>
				</div>
				<div className="modal-footer">
					<Button
						color="primary"
						type="submit"
						onClick={(e) => handleSignupSubmit(e)}
						style={{margin: 'auto'}}
					>
						Submit
					</Button>
				</div>
		</div>
	)
}

export default Register;

