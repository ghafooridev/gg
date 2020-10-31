import React from "react"

import { useImmer } from "use-immer"

import { Col, Container, Row } from "reactstrap"

import TextInput from "../components/sharedComponents/TextInput"
import Button from "../components/sharedComponents/Button"

import feedbackRepository from "../repositories/feedback"
import DropDown from "../components/sharedComponents/DropDown"
import Constant from "../utils/Constant"

import AlertAction from "../redux/actions/AlertAction"

const Feedback = function () {
  const [state, setState] = useImmer({
    name: "",
    email: "",
    description: "",
  })

  const onInputChange = function ({ name, value }) {
    setState((draft) => {
      draft[name] = value
    })
  }

  const onFeedbackSend = function () {
    feedbackRepository.add(state).then((data) => {
      if (data) {
        AlertAction.show({type:"success", text: Constant.MESSAGES.SEND_FEEDBACK })
      }
    })
  }

  return (
    <div className="section landing-section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="text-center">Feedback?</h2>
            <div className="contact-form">
              <Row>
                <Col md="6">
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Name"
                    icon={<i className="nc-icon nc-single-02" />}
                    onChange={onInputChange}
                  />
                </Col>
                <Col md="6">
                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="Email"
                    icon={<i className="nc-icon nc-email-85" />}
                    onChange={onInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <DropDown
                    label="Category"
                    name="category"
                    placeholder="Select feedback category"
                    option={Constant.ENUMS.FEEDBACK_CATEGORY}
                    onSelect={onInputChange}
                  />
                </Col>
              </Row>
              <TextInput
                label="Message"
                name="description"
                placeholder="Tell us your thoughts and feelings..."
                type="textarea"
                rows="4"
                onChange={onInputChange}
              />

              <Row>
                <Col className="ml-auto mr-auto" md="4">
                  <Button
                    label="Send Message"
                    color="danger"
                    onClick={onFeedbackSend}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Feedback
