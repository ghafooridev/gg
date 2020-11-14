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
import { useHistory } from "react-router-dom"
import LoginContainer from "src/components/sharedComponents/LoginContainer"
import UniversitySelector from "src/components/sharedComponents/UnivercitySelector"
import { findCollegeId } from "src/helpers/utils"
import RegisterLogo from "../../assets/images/register.png"
import { styles } from "./Register.Style"

const Register = function () {
  const classes = styles()
  const { register, handleSubmit, errors, reset } = useForm()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onSubmit = function (data, e) {
    let newData = data
    const university = findCollegeId(data.university)
    if (university) {
      newData = { ...data, university }
    }
    setLoading(true)
    userRepository
      .register(newData)
      .then((result) => {
        setLoading(false)
        if (result) {
          AlertAction.show({
            type: "success",
            text: Constant.MESSAGES.SEND_ACTIVATION_LINK,
          })
          e.target.reset()
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onBackToLogin = function () {
    history.push("login")
  }

  return (
    <LoginContainer>
      <Grid item xs={12} className={classes.leftPanel}>
        <img alt="logo" src={RegisterLogo} />
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue="xxx"
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
              {/* <Selector */}
              {/*  name="university" */}
              {/*  label="University" */}
              {/*  icon="account_circle" */}
              {/*  inputRef={register({ */}
              {/*    required: validationMessage("University", "required"), */}
              {/*  })} */}
              {/*  error={errors.university} */}
              {/*  options={collegeList} */}
              {/* /> */}
              <UniversitySelector
                name="university"
                inputRef={register({
                  required: validationMessage("University", "required"),
                })}
                error={errors.university}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                label="create new account"
                type="primary"
                htmlType="submit"
                className={classes.submitButton}
                loading={loading}
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
        </form>
      </Grid>
    </LoginContainer>
  )
}

export default Register
