import React from "react"

import { Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import Password from "src/components/sharedComponents/Password"
import Selector from "src/components/sharedComponents/Selector"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button/index"
import Constant from "src/utils/Constant"
import userRepository from "src/repositories/user"
import AlertAction from "src/redux/actions/AlertAction"
import RegisterLogo from "src/assets/images/register.png"
import { useHistory } from "react-router-dom"
import LoginContainer from "src/components/sharedComponents/LoginContainer"
import { styles } from "./Register.Style"
import collegeList from 'src/assets/json/colleges.json'
const Register = function () {
  const classes = styles()
  const { register, control, handleSubmit, errors } = useForm()
  const history = useHistory()

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
    history.push("login")
  }

  return (
    <LoginContainer>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={RegisterLogo} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          Sign Up
        </Typography>
        <Typography
          variant="body2"
          className={classes.subTitle}
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
            {/* <TextField */}
            {/*  name="university" */}
            {/*  label="University" */}
            {/*  icon="account_circle" */}
            {/*  inputRef={register({ */}
            {/*    required: validationMessage("University", "required"), */}
            {/*  })} */}
            {/*  error={errors.university} */}
            <Selector
              name="university"
              label="University"
              icon="account_circle"
              inputRef={register({
                required: validationMessage("University", "required"),
              })}
              error={errors.university}
              options={collegeList}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              label="create new account"
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

export default Register
