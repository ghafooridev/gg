import React, { useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button"
import Constant from "src/utils/Constant"
import userRepository from "src/repositories/user"
import AlertAction from "src/redux/actions/AlertAction"
import LoginContainer from "src/components/sharedComponents/LoginContainer"
import { useHistory } from "react-router-dom"
import ForgetLogo from "../../assets/images/forget.png"
import { styles } from "./ForgetPassword.Style"

const Forget = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const [passwordValue, setPasswordValue] = useState("")

  const onSubmit = function (data) {
    userRepository.resetPassword(data).then((result) => {
      if (result) {
        AlertAction.show({
          type: "success",
          text: Constant.MESSAGES.SEND_ACTIVATION_LINK,
        })
      }
    })
  }

  const onBackToLogin = function () {
    history.push("login")
  }

  const onChangePassword = function ({ value }) {
    setPasswordValue(value)
  }
  return (
    <LoginContainer>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={ForgetLogo} />
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
          Forget Password
        </Typography>
        <Typography
          variant="body2"
          className={classes.subTitle}
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
              icon="published_with_changes"
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
          <Grid item xs={12}>
            <Button
              label="back to login page"
              type="grey"
              className={classes.submitButton}
              onClick={onBackToLogin}
            />
          </Grid>
        </Grid>
      </Grid>
    </LoginContainer>
  )
}

export default Forget
