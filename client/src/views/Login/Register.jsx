import React, { useContext } from "react"

import { Fade, Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button/index"
import RegisterLogo from "src/assets/images/register.png"
import Constant from "src/utils/Constant"
import LoginContext from "src/views/Login/Context/LoginContext"
import userRepository from "src/repositories/user"
import AlertAction from "src/redux/actions/AlertAction"
import { styles } from "./Login.Style"

const Register = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const { changePage } = useContext(LoginContext)

  const onSubmit = function (data) {
    userRepository.register(data).then((result) => {
      if (result) {
        AlertAction.show({
          type: "success",
          text: Constant.MESSAGES.SEND_ACTIVATION_LINK,
        })
      }
    })
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
      <Fade in timeout={1000}>
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
                name="name"
                label="Full name"
                icon="account_circle"
                inputRef={register({
                  required: validationMessage("Full Name", "required"),
                })}
                error={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                icon="mail"
                inputRef={register({
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.edu$/i,
                  //   message: validationMessage("Email address", "pattern"),
                  // },
                  required: validationMessage("Email address", "required"),
                })}
                error={errors.email}
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
      </Fade>
    </>
  )
}

export default Register
