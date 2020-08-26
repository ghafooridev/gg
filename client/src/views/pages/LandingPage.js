import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

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
  Modal
} from "reactstrap";

// core components
import LandingNavbar from "../../components/Navbars/LandingNavbar.js";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import LandingFooter from "../../components/Footers/LandingFooter.js";
import GameCard from "components/GameCard.js";
import { authenticationService } from "services/authentication.service.js";

const LandingPage = (props) => {
  const loggedInStartState = authenticationService.currentUserValue ? true : false;
  const showModalStartState = !loggedInStartState && props.match.path === "/login" ? true : false;
  const history = useHistory();

  const [isLoggedin, setLoggedin] = useState(loggedInStartState);
  const [showModal, setShowModal] = useState(showModalStartState);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  document.documentElement.classList.remove("nav-open");
  
  React.useEffect(() => {
    if (loggedInStartState) {
      const user = authenticationService.currentUserValue;
      setName(user.name);
      setUniversity(user.university);
      setEmail(user.email);
      setDescription(user.description);
    }

    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, [loggedInStartState]);

  function handleSignin() {
    modalOpen();
  }

  // TODO: handle sign up button press event
  function handleSignup() {

  }

  function handleLogout() {
    authenticationService.logout();
    setLoggedin(false);
    setName("");
    setUniversity("");
    setEmail("");
    setDescription("");
  }

  function modalOpen() {
    setShowModal(true);
    history.push("/login")
  }

  function modalClose() {
    setShowModal(false);
    history.push("/");
  }

  function handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === "name") {
      setName(value);
    } else if(name === "email") {
      setEmail(value);
    } else if(name === "university") {
      setUniversity(value);
    } else if(name === "description") {
      setDescription(value);
    }
  }

  function handleLoginSubmit(e) {
    modalClose();
    setLoggedin(true);
    authenticationService.login(name, "", description, university, email);
  }

  return (
    <>
      <LandingNavbar />
      <LandingPageHeader handleSignin={handleSignin} handleSignup={handleSignup} 
        handleLogout={handleLogout} isLoggedin={isLoggedin} username={name} />

      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => modalClose()}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h6 className="text-muted">Welcome</h6>
          <h3 className="modal-title text-center">Spiel</h3>
          <p>Log in to your account</p>
        </div>
        <div className="modal-body">
          <form onSubmit={e => e.preventDefault()}>
            <FormGroup>
              <Label for="Name">First Name</Label>
              <Input
                type="text"
                name="name"
                id="Name"
                placeholder="Enter First Name"
                onChange={e => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailAdd">Email</Label>
              <Input
                type="email"
                name="email"
                id="emailAdd"
                placeholder="Enter Email"
                onChange={e => handleChange(e)}
              />
              <FormText color="muted">
                We'll never share your information with anyone else.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="University">University Name</Label>
              <Input
                type="text"
                name="university"
                id="University"
                placeholder="Arizona State University"
                autoComplete="off"
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                Remember Me
                <span className="form-check-sign">
                  <span className="check"></span>
              </span>
              </Label>
            </FormGroup>
          </form>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="submit" onClick={e => handleLoginSubmit(e)} style={{"margin": "auto"}}>
            Submit
          </Button>
        </div>
      </Modal>

      <div className="main">
        <div className="section section-dark text-center" id="games">
          <Container>
            <h2 name="About" className="title">Games</h2>
            <Row>
              <Col md="4">
                <GameCard description="Collect and steal properties from other players to establish your real-estate monopoly."
                  title="Covidopoly" subtitle="Card-based Game (3-6 players)" icon="nc-icon lg nc-single-copy-04" isLoggedin={isLoggedin} />
              </Col>
              <Col md="4">
                <GameCard description="Play as either Villager or Werewolf in a social deduction game created."
                  title="Mafia" subtitle="Deduction Game (5+ players)" icon="nc-icon lg nc-zoom-split" isLoggedin={isLoggedin} />
              </Col>
              <Col md="4">
                <GameCard description="Draw the word you get as the rest of the group tries to guess the word you got."
                  title="Scribble" subtitle="Party Game (2+ players)" icon="nc-icon lg nc-ruler-pencil" isLoggedin={isLoggedin} />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Feedback?</h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      
      <LandingFooter />
    </>
  );
}

export default LandingPage;
