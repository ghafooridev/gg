import React, { useContext, useEffect } from "react"

import { Fade, Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button/index"
import RegisterLogo from "src/assets/images/register.png"
import Constant from "src/utils/Constant"
import LoginContext from "src/views/Login/Context/LoginContext"
import { styles } from "./Login.Style"

const Register = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const { changePage } = useContext(LoginContext)

  const onSubmit = function (data) {
    console.log(data)
  }

  const onBackToLogin = function () {
    changePage(Constant.LOGIN_PAGE.SIGN_IN)
  }

  const onForgetPassword = function () {
    changePage(Constant.LOGIN_PAGE.SIGN_IN)
  }

  return (
    <>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={RegisterLogo} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.welcome}>
          Sign Up
        </Typography>
        <Typography
          variant="body2"
          className={classes.loginText}
          color="textSecondary"
        >
          Create a New account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="fullName"
              label="Full name"
              icon="account_circle"
              inputRef={register({
                required: validationMessage("Full Name", "required"),
              })}
              error={errors.fullName}
            />
          </Grid>
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
            <TextField
              name="university"
              label="University"
              icon="account_circle"
              inputRef={register({
                required: validationMessage("University", "required"),
              })}
              error={errors.university}
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
            <div className={classes.footerLink} onClick={onBackToLogin}>
              <Typography variant="button">Back To login</Typography>
              <i className="material-icons">login</i>
            </div>
            <div className={classes.footerLink} onClick={onForgetPassword}>
              <Typography variant="button">Forget Password</Typography>
              <i className="material-icons">vpn_key</i>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Register
