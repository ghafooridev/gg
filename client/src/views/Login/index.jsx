import React, { useEffect } from "react"

import {
  Container,
  Fade,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Logo from "src/assets/images/logo_light.png"
import Button from "src/components/sharedComponents/Button/index"
import { styles } from "./Login.Style"

const Login = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = function (data) {
    console.log(data)
  }

  const onRegister = function () {}

  const onForgetPassword = function () {}

  return (
    <div>
      <div className={classes.background} />
      <Fade timeout={1000} in>
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
                  inputRef={register({
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
                  inputRef={register({
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
                  onClick={handleSubmit(onSubmit)}
                />
              </Grid>
              <Grid item xs={12} className={classes.footer}>
                <div className={classes.footerLink} onClick={onForgetPassword}>
                  <Typography variant="button">Forget Password</Typography>
                  <i className="material-icons">vpn_key</i>
                </div>
                <div className={classes.footerLink} onClick={onRegister}>
                  <Typography variant="button">create new account</Typography>
                  <i className="material-icons">person_add</i>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Fade>
    </div>
  )
}

export default Login
