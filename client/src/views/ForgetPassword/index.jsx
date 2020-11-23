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
import { styles } from "./ForgetPassword.Style"

const Forget = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const [passwordValue, setPasswordValue] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = function (data) {
    setLoading(true)
    userRepository
      .resetPassword(data)
      .then((result) => {
        setLoading(false)
        if (result) {
          AlertAction.show({
            type: "success",
            text: Constant.MESSAGES.SEND_ACTIVATION_LINK,
          })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onChangePassword = function ({ value }) {
    setPasswordValue(value)
  }

  return (
    <Grid item xs={6} className={classes.root}>
      <JoyStick curveClass={classes.curves}>
        <Grid item xs={12} className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            Reset Password
          </Typography>
          <Grid container spacing={3} className={classes.inputs}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                icon="mail"
                className={classes.input}
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
                className={classes.input}
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
                className={classes.input}
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

            <Grid item xs={12} className={classes.input}>
              <Button
                label="submit"
                type="primary"
                className={classes.submitButton}
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </JoyStick>
    </Grid>
  )
}

export default Forget
