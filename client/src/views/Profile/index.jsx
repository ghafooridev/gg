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
import JoyStick from "src/components/sharedComponents/JoyStick"
import clsx from "clsx"
import Card from "src/components/sharedComponents/Card"
import { styles } from "./Profile.Style"

const Register = function () {
  const classes = styles()
  const { register, handleSubmit, errors, reset } = useForm()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onSubmit = function (data, e) {
    // let newData = data
    // const university = findCollegeId(data.university)
    // if (university) {
    //   newData = { ...data, university }
    // }
    // setLoading(true)
    // userRepository
    //   .register(newData)
    //   .then((result) => {
    //     setLoading(false)
    //     if (result) {
    //       AlertAction.show({
    //         type: "success",
    //         text: Constant.MESSAGES.SEND_ACTIVATION_LINK,
    //       })
    //       e.target.reset()
    //     }
    //   })
    //   .catch(() => {
    //     setLoading(false)
    //   })
  }

  return (
    <Card className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Account
      </Typography>
      <Grid item xs={12} className={classes.container}>
        <Grid className={classes.leftPanel}>
          <Grid item xs={12} className={classes.item}>
            <TextField
              name="name"
              label="Full name"
              icon="account_circle"
              inputRef={register({
                required: validationMessage("Full Name", "required"),
              })}
              className={classes.input}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12} className={classes.item}>
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
              className={classes.input}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <TextField
              name="username"
              label="Username"
              icon="account_circle"
              inputRef={register({
                required: validationMessage("Username", "required"),
              })}
              className={classes.input}
              error={errors.username}
            />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <Password
              name="password"
              label="Password"
              icon="lock_open"
              inputRef={register({
                required: validationMessage("Password", "required"),
              })}
              className={classes.input}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <UniversitySelector
              name="university"
              inputRef={register({
                required: validationMessage("University", "required"),
              })}
              className={classes.input}
              error={errors.university}
            />
          </Grid>
          <Button
            label="save"
            type="primary"
            className={classes.submitButton}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          />
        </Grid>

        <Grid className={classes.rightPanel}>
          <Grid className={classes.uploadBox}>
            <Typography variant="h5" color="textSecondary">
              To change your profile image , drag and drop here
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Register
