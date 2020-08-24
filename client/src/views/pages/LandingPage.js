import React, { useState } from "react";

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
} from "reactstrap";

// core components
import LandingNavbar from "../../components/Navbars/LandingNavbar.js";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import LandingFooter from "../../components/Footers/LandingFooter.js";
import GameCard from "components/GameCard.js";
import LoginModal from "./LoginModal.js";

const LandingPage = () => {
  const [isLoggedin, setLoggedin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  document.documentElement.classList.remove("nav-open");
  
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });

  function handleSignin() {
    modalOpen();
  }

  // TODO: handle sign up button press event
  function handleSignup() {

  }

  function modalOpen() {
    setShowModal(true);
  }

  function modalClose() {
    setLoggedin(true);
    setShowModal(false);
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

  return (
    <>
      <LandingNavbar />
      <LandingPageHeader handleSignin={handleSignin} handleSignup={handleSignup} 
        isLoggedin={isLoggedin} username={name} />

      <LoginModal show={showModal}>
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
              Check me out
              <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
          </FormGroup>
          <Button color="primary" type="submit" onClick={e => modalClose(e)}>
            Submit
          </Button>
        </form>
      </LoginModal>

      <div className="main">
        <div className="section section-dark text-center" id="games">
          <Container>
            <h2 name="About" className="title">Games</h2>
            <Row>
              <Col md="4">
                <GameCard description="Collect and steal properties from other players to establish your real-estate monopoly."
                  title="Covidopoly" subtitle="Card-based Game (3-6 players)" icon="nc-icon lg nc-single-copy-04" />
              </Col>
              <Col md="4">
                <GameCard description="Play as either Villager or Werewolf in a social deduction game created."
                  title="Mafia" subtitle="Deduction Game (5+ players)" icon="nc-icon lg nc-zoom-split" />
              </Col>
              <Col md="4">
                <GameCard description="Draw the word you are given as the rest of the group tries to guess the word you were assigned."
                  title="Scribble" subtitle="Party Game (2+ players)" icon="nc-icon lg nc-ruler-pencil" />
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
