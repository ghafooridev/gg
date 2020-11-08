import React from "react"

import { Grid, Typography } from "@material-ui/core"

import { useHistory } from "react-router-dom"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button"
import LoginContainer from "src/components/sharedComponents/LoginContainer"
import userAction from "src/redux/actions/UserAction"
import SignInLogo from "../../assets/images/login.png"
import { styles } from "./Login.Style"

const Login = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()

  const onSubmit = function (data) {
    userAction.login(data).then(() => {
      history.push("home")
    })
  }

  const onRegister = function () {
    history.push("register")
  }

  const onForgetPassword = function () {
    history.push("forget-password")
  }

  return (
    <LoginContainer>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={SignInLogo}/>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          Welcome
        </Typography>
        <Typography
          variant="body2"
          className={classes.subTitle}
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
      </Grid>
    </LoginContainer>
  )
}

export default Login
