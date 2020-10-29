import React from "react"

import PropTypes from "prop-types"

import { useForm } from "react-hook-form"

import TextInput from "../components/sharedComponents/TextInput"
import Button from "../components/sharedComponents/Button"
import { validationMessage } from "../utils/ValidationMessage"

const Register = function (props) {
  const { register, handleSubmit, errors } = useForm()
  const { onAction } = props

  const onSubmit = (data) => {
    onAction("submit", data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Full Name"
          name="name"
          placeholder="Enter Name"
          icon={<i className="nc-icon nc-single-02" />}
          innerRef={register({
            required: validationMessage("Full name", "required"),
          })}
          error={errors.name}
        />
        <TextInput
          label="Username"
          name="username"
          placeholder="Enter Username"
          icon={<i className="nc-icon nc-circle-10" />}
          innerRef={register({
            required: validationMessage("Username", "required"),
          })}
          error={errors.username}
        />
        <TextInput
          label="Email"
          name="email"
          placeholder="username@yourdomain.edu"
          icon={<i className="nc-icon nc-email-85" />}
          innerRef={register({
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.edu$/i,
              message: validationMessage("Email address", "pattern"),
            },
            required: validationMessage("Email address", "required"),
          })}
          error={errors.email}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          icon={<i className="nc-icon nc-lock-circle-open" />}
          innerRef={register({
            required: validationMessage("Password", "required"),
            minLength: {
              value: 5,
              message: validationMessage("Password", "minLength", 5),
            },
          })}
        />
        <TextInput
          label="University Name"
          name="university"
          placeholder="Arizona State University"
          icon={<i className="nc-icon nc-hat-3" />}
          innerRef={register({
            required: validationMessage("University name", "required"),
          })}
        />
        <TextInput
          label="Description"
          name="description"
          placeholder="I love playing chess and surfing..."
          type="textarea"
          rows="2"
          innerRef={register}
        />
        <Button label="Submit" color="primary" type="submit" size="xs" />
      </form>
    </div>
  )
}

Register.propTypes = {
  onAction: PropTypes.func,
}

export default Register
