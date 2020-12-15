import React, { useState } from "react"

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
import { styles } from "./Login1.Style"

const Login = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onSubmit = function (data) {
    setLoading(true)
    userAction
      .login(data)
      .then(() => {
        setLoading(false)
        history.push("home")
      })
      .catch(() => {
        setLoading(false)
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
        <img alt="logo" src={SignInLogo} />
        <a
          href="https://www.freepikcompany.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Image created by freepikcompany.com
        </a>
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
              onEnter={handleSubmit(onSubmit)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              label="submit"
              type="primary"
              className={classes.submitButton}
              onClick={handleSubmit(onSubmit)}
              loading={loading}
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
