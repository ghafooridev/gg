import React, { useEffect } from "react"

import { Container, Grid, Paper, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Logo from "src/assets/img/antoine-barres.jpg"
import Button from "src/components/sharedComponents/Button/index"
import { styles } from "./Login.Style"

const Login = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  return (
    <Container maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <img alt="logo" src={Logo} className={classes.logo} />
        <Typography variant="h4" className={classes.welcome}>
          Welcome
        </Typography>
        <Typography
          variant="body2"
          className={classes.loginText}
          color="textSecondary"
        >
          log in to your account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Username"
              icon="account_circle"
              innerRef={register({
                required: validationMessage("Username", "required"),
              })}
              error={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <Password
              name="password"
              label="Password"
              icon="lock_open"
              innerRef={register({
                required: validationMessage("Password", "required"),
              })}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              label="submit"
              type="primary"
              className={classes.submitButton}
            />
          </Grid>
        </Grid>
      </Paper>
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
