import React, { useContext } from "react"

import { Fade, Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button/index"
import SignInLogo from "src/assets/images/login.png"
import Constant from "src/utils/Constant"
import userRepository from "src/repositories/user"
import { useHistory } from "react-router-dom"
import Storage from "src/services/Storage"
import LoginContext from "./Context/LoginContext"
import { styles } from "./Login.Style"

const SignIn = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const { changePage } = useContext(LoginContext)
  const history = useHistory()

  const onSubmit = function (data) {
    userRepository.login(data).then((user) => {
      if (user) {
        Storage.push(Constant.STORAGE.CURRENT_USER, JSON.stringify(user.data))
        history.push("home")
      }
    })
  }

  const onRegister = function () {
    changePage(Constant.LOGIN_PAGE.REGISTER)
  }

  const onForgetPassword = function () {
    changePage(Constant.LOGIN_PAGE.FORGET)
  }

  return (
    <>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={SignInLogo} />
      </Grid>
      <Fade in timeout={1000}>
        <Grid item xs={12}>
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
        </Grid>
      </Fade>
    </>
  )
}

export default SignIn
