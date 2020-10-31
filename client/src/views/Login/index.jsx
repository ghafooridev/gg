import React, { useEffect } from "react"

import { Container } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import { validationMessage } from "src/utils/ValidationMessage"
import { styles } from "./Login.Style"

const Login = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  return (
    <Container maxWidth="xs" className={classes.container}>
      <TextField
        name="username"
        label="Username"
        icon="account_circle"
        innerRef={register({
          required: validationMessage("Username", "required"),
        })}
        error={errors.username}
      />
    </Container>
  )
}
//
// Login.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   inputRef: PropTypes.string,
//   rows: PropTypes.string,
//   type: PropTypes.string,
//   name: PropTypes.string,
//   style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
//   className: PropTypes.string,
//   onChange: PropTypes.func,
//   caption: PropTypes.string,
//   error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   icon: PropTypes.string,
//   defaultValue: PropTypes.string,
// }
//
// Login.defaultProps = {
//   rows: 1,
//   type: "text",
// }

export default Login
