/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"

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
} from "reactstrap"

// core components
import LandingNavbar from '../components/Navbars/LandingNavbar';
import LandingPageHeader from '../components/Headers/LandingPageHeader';
import LandingFooter from '../components/Footers/LandingFooter';
import GameCard from '../components/GameCard';
import authenticationService from '../services/authentication.service.js';
import Feedback from './Feedback';

const LandingPage = ({ match }) => {
  const loggedInStartState = !!authenticationService.currentUserValue
  const showLoginModalStartState = !!(
    !loggedInStartState && match.path === "/login"
  )
  const showSignupModalStartState = !!(
    !loggedInStartState && match.path === "/signup"
  )

  const history = useHistory()

  const [isLoggedin, setLoggedin] = useState(loggedInStartState)
  const [showLoginModal, setShowLoginModal] = useState(showLoginModalStartState)
  const [showSignupModal, setShowSignupModal] = useState(
    showSignupModalStartState
  )

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [university, setUniversity] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [description, setDescription] = useState("")

  const [signupErrors, setSignupErrors] = useState("")
  const [loginErrors, setLoginErrors] = useState("")

  document.documentElement.classList.remove("nav-open")

  React.useEffect(() => {
    if (loggedInStartState) {
      const user = authenticationService.currentUserValue
      setName(user.name)
      setUsername(user.username)
      setUniversity(user.university)
      setEmail(user.email)
      setDescription(user.description)
    }

    document.body.classList.add("profile-page")
    return function cleanup() {
      document.body.classList.remove("profile-page")
    }
  }, [loggedInStartState])

  function modalSignupOpen() {
    setShowSignupModal(true)
    history.push("/signup")
  }

  function modalSignupClose() {
    setShowSignupModal(false)
    history.push("/")
  }

  function modalLoginOpen() {
    setShowLoginModal(true)
    history.push("/login")
  }

  function modalLoginClose() {
    setShowLoginModal(false)
    history.push("/")
  }

  function handleSignin() {
    modalLoginOpen()
  }

  function handleSignup() {
    modalSignupOpen()
  }

  function handleLogout() {
    authenticationService.logout()
    setLoggedin(false)
    setName("")
    setUniversity("")
    setEmail("")
    setDescription("")
    setPassword("")
    setUsername("")
  }

  function handleChange(e) {
    e.preventDefault()
    const target = e.target
    const fieldName = target.name
    const value = target.value

    if (fieldName === "name") {
      setName(value)
    } else if (fieldName === "email") {
      setEmail(value)
    } else if (fieldName === "university") {
      setUniversity(value)
    } else if (fieldName === "description") {
      setDescription(value)
    } else if (fieldName === "password") {
      setPassword(value)
    } else if (fieldName === "username") {
      setUsername(value)
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault()

    authenticationService.login(email, password).then((val) => {
      console.log(val)
      if (val.errors) {
        setLoginErrors(val.errors)
      } else {
        modalLoginClose()
        setLoggedin(true)
        setLoginErrors("")
      }
    })
  }

  function handleSignupSubmit(e) {
    e.preventDefault()

    authenticationService
      .signup(email, password, name, username, university, description)
      .then((val) => {
        console.log(val)
        if (val.errors) {
          setSignupErrors(val.errors)
        } else {
          modalSignupClose()
          setLoggedin(true)
          setSignupErrors("")
          const user = authenticationService.currentUserValue
          setName(user.name)
        }
      })
  }

  return (
    <>
      <LandingNavbar />
      <LandingPageHeader
        handleSignin={handleSignin}
        handleSignup={handleSignup}
        handleLogout={handleLogout}
        isLoggedin={isLoggedin}
        username={name}
      />

      <Modal
        isOpen={showSignupModal}
        toggle={() => setShowSignupModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => modalSignupClose()}
          >
            <span aria-hidden>×</span>
          </button>
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
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
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
            <FormGroup>
              <Label for="University">University Name</Label>
              <Input
                type="text"
                name="university"
                id="University"
                placeholder="Arizona State University"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormText color="muted">
              We will never share your information with anyone else.
            </FormText>
            <FormText
              color="red"
              style={{ textAlign: "center", color: "red", fontSize: "0.9em" }}
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
            style={{ margin: "auto" }}
          >
            Submit
          </Button>
        </div>
      </Modal>

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
            <span aria-hidden>×</span>
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
              style={{ textAlign: "center", color: "red", fontSize: "0.9em" }}
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
            style={{ margin: "auto" }}
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
                  comingSoon
                />
              </Col>
              <Col md="4">
                <GameCard
                  description="Play as either Townsfolk or Criminal in a social deduction game."
                  title="Mafia"
                  subtitle="Deduction Game (5+ players)"
                  icon="nc-icon lg nc-zoom-split"
                  isLoggedin={isLoggedin}
                  comingSoon
                />
              </Col>
            </Row>
          </Container>
          {isLoggedin ? (
            <></>
          ) : (
            <div
              className="section section-dark section-footer"
              style={{ fontSize: "1.4em" }}
            >
              <a href="/login">Login</a> to play games
            </div>
          )}
        </div>
       <Feedback/>
      </div>

      <LandingFooter />
    </>
  )
}

LandingPage.propTypes = {
  match: PropTypes.shape(PropTypes.any),
}

LandingPage.defaultProps = {
  match: {},
}

export default LandingPage
