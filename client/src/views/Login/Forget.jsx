import React, { useContext, useState } from "react"

import { Fade, Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button/index"
import ForgetLogo from "src/assets/images/forget.png"
import Constant from "src/utils/Constant"
import LoginContext from "src/views/Login/Context/LoginContext"
import { styles } from "./Login.Style"

const Forget = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const { changePage } = useContext(LoginContext)
  const [passwordValue, setPasswordValue] = useState("")

  const onSubmit = function (data) {
    console.log(data)
  }

  const onRegister = function () {
    changePage(Constant.LOGIN_PAGE.REGISTER)
  }

  const onBackToLogin = function () {
    changePage(Constant.LOGIN_PAGE.SIGN_IN)
  }

  const onChangePassword = function ({ value }) {
    setPasswordValue(value)
  }

  return (
    <>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={ForgetLogo} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.welcome}>
          Forget Password
        </Typography>
        <Typography
          variant="body2"
          className={classes.loginText}
          color="textSecondary"
        >
          Enter your email and new password
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              icon="mail"
              inputRef={register({
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.edu$/i,
                  message: validationMessage("Email address", "pattern"),
                },
                required: validationMessage("Email address", "required"),
              })}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Password
              name="password"
              label="Password"
              icon="lock_open"
              onChange={onChangePassword}
              inputRef={register({
                required: validationMessage("Password", "required"),
              })}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="rePassword"
              label="Retype Password"
              icon="account_circle"
              inputRef={register({
                validate: (value) => passwordValue === value,
              })}
              error={
                errors.rePassword && {
                  message: "Retype password does not match",
                }
              }
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
            <div className={classes.footerLink} onClick={onRegister}>
              <Typography variant="button">create new account</Typography>
              <i className="material-icons">person_add</i>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Forget
