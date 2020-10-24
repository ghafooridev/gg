import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

// reactstrap components
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
import Register from "./Register";
import userRepository from "../repositories/user"

const LandingPage = (props) => {
	const loggedInStartState = authenticationService.currentUserValue
		? true
		: false;
	const showLoginModalStartState =
		!loggedInStartState && props.match.path === '/login' ? true : false;
	const showSignupModalStartState =
		!loggedInStartState && props.match.path === '/signup' ? true : false;

	const history = useHistory();

	const [isLoggedin, setLoggedin] = useState(loggedInStartState);
	const [showLoginModal, setShowLoginModal] = useState(
		showLoginModalStartState
	);
	const [showSignupModal, setShowSignupModal] = useState(
		showSignupModalStartState
	);

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [university, setUniversity] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [description, setDescription] = useState('');

	const [signupErrors, setSignupErrors] = useState('');
	const [loginErrors, setLoginErrors] = useState('');

	document.documentElement.classList.remove('nav-open');

	React.useEffect(() => {
		if (loggedInStartState) {
			const user = authenticationService.currentUserValue;
			setName(user.name);
			setUsername(user.username);
			setUniversity(user.university);
			setEmail(user.email);
			setDescription(user.description);
		}

		document.body.classList.add('profile-page');
		return function cleanup() {
			document.body.classList.remove('profile-page');
		};
	}, [loggedInStartState]);

	function handleSignin() {
		modalLoginOpen();
	}

	function handleSignup() {
		modalSignupOpen();
	}

	function handleLogout() {
		authenticationService.logout();
		setLoggedin(false);
		setName('');
		setUniversity('');
		setEmail('');
		setDescription('');
		setPassword('');
		setUsername('');
	}

	function modalSignupOpen() {
		dialogAction.show({
			component: <Register/>, title: 'Register your account', onAction: (type, data) => {
				if (type === 'submit') {
					userRepository.register(data).then(result => {
						console.log('result',result)
					})
				}
			}
		})
		history.push('/signup');
	}

	function modalSignupClose() {
		setShowSignupModal(false);
		history.push('/');
	}

	function modalLoginOpen() {
		setShowLoginModal(true);
		history.push('/login');
	}

	function modalLoginClose() {
		setShowLoginModal(false);
		history.push('/');
	}

	function handleChange(e) {
		e.preventDefault();
		const target = e.target;
		const name = target.name;
		const value = target.value;

		if (name === 'name') {
			setName(value);
		} else if (name === 'email') {
			setEmail(value);
		} else if (name === 'university') {
			setUniversity(value);
		} else if (name === 'description') {
			setDescription(value);
		} else if (name === 'password') {
			setPassword(value);
		} else if (name === 'username') {
			setUsername(value);
		}
	}

	function handleLoginSubmit(e) {
		authenticationService.login(email, password).then((val) => {
			console.log(val);
			if (val.errors) {
				setLoginErrors(val.errors);
			} else {
				modalLoginClose();
				setLoggedin(true);
				setLoginErrors('');
			}
		});
	}

	function handleSignupSubmit(e) {
		authenticationService
			.signup(email, password, name, username, university, description)
			.then((val) => {
				console.log(val);
				if (val.errors) {
					setSignupErrors(val.errors);
				} else {
					modalSignupClose();
					setLoggedin(true);
					setSignupErrors('');
					const user = authenticationService.currentUserValue;
					setName(user.name);
				}
			});
	}

	return (
		<>
			<LandingNavbar/>
			<LandingPageHeader
				handleSignin={handleSignin}
				handleSignup={handleSignup}
				handleLogout={handleLogout}
				isLoggedin={isLoggedin}
				username={name}
			/>

			<Modal
				isOpen={showLoginModal}
				toggle={() => setShowLoginModal(false)}
				modalClassName="modal-register"
			>
				<div className="modal-header no-border-header text-center">
					<button
						aria-label="Close"
						className="close"
						data-dismiss="modal"
						type="button"
						onClick={() => modalLoginClose()}
					>
						<span aria-hidden={true}>×</span>
					</button>
					<h6 className="text-muted">Welcome</h6>
					<h3 className="modal-title text-center">GGchat</h3>
					<p>Log in to your account</p>
				</div>
				<div className="modal-body">
					<form onSubmit={(e) => e.preventDefault()}>
						<FormGroup>
							<Label for="emailAdd">Email</Label>
							<Input
								type="email"
								name="email"
								id="emailAdd"
								placeholder="Enter Email"
								onChange={(e) => handleChange(e)}
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
								onChange={(e) => handleChange(e)}
							/>
						</FormGroup>
						<FormText
							color="red"
							style={{textAlign: 'center', color: 'red', fontSize: '0.9em'}}
						>
							{loginErrors}
						</FormText>
					</form>
				</div>
				<div className="modal-footer">
					<Button
						color="primary"
						type="submit"
						onClick={(e) => handleLoginSubmit(e)}
						style={{margin: 'auto'}}
					>
						Submit
					</Button>
				</div>
			</Modal>

			<div className="main">
				<div className="section section-dark text-center" id="games">
					<Container>
						<h2 name="Games" className="title">
							Games
						</h2>
						<Row>
							<Col md="4">
								<GameCard
									description="Draw the word you get as the rest of the group tries to guess the word you got."
									title="Drawasaurus"
									subtitle="Party Game (4 players)"
									icon="nc-icon lg nc-ruler-pencil"
									isLoggedin={isLoggedin}
									comingSoon={false}
								/>
							</Col>
							<Col md="4">
								<GameCard
									description="Collect and steal properties from other players to establish your real-estate monopoly."
									title="Covidopoly"
									subtitle="Card-based Game (5 players)"
									icon="nc-icon lg nc-single-copy-04"
									isLoggedin={isLoggedin}
									comingSoon={true}
								/>
							</Col>
							<Col md="4">
								<GameCard
									description="Play as either Townsfolk or Criminal in a social deduction game."
									title="Mafia"
									subtitle="Deduction Game (5+ players)"
									icon="nc-icon lg nc-zoom-split"
									isLoggedin={isLoggedin}
									comingSoon={true}
								/>
							</Col>
						</Row>
					</Container>
					{isLoggedin ? (
						<></>
					) : (
						<div
							className="section section-dark section-footer"
							style={{fontSize: '1.4em'}}
						>
							<a href="/login">Login</a>
							to play games
						</div>
					)}
				</div>
				<Feedback/>
			</div>

			<LandingFooter/>
		</>
	);
};

export default LandingPage;
