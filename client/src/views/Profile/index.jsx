import React, { useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import { useForm } from "react-hook-form"

import TextField from "src/components/sharedComponents/TextField"
import { validationMessage } from "src/utils/ValidationMessage"
import Button from "src/components/sharedComponents/Button"
import Constant from "src/utils/Constant"
import userRepository from "src/repositories/user"
import AlertAction from "src/redux/actions/AlertAction"
import UniversitySelector from "src/components/sharedComponents/UnivercitySelector"
import { SketchPicker } from "react-color"
import Card from "src/components/sharedComponents/Card"
import InfoBox from "src/components/sharedComponents/InfoBox"
import Storage from "src/services/Storage"
import { styles } from "./Profile.Style"

const Register = function () {
  const classes = styles()
  const { register, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [showColor, setShowColor] = useState(false)

  const onSubmit = function (data, e) {
    let newData = data
    newData = { ...newData, background: user.background }
    setLoading(true)
    userRepository
      .edit(user.id, newData)
      .then((result) => {
        setLoading(false)
        if (result) {
          AlertAction.show({
            type: "success",
            text: Constant.MESSAGES.EDIT_DATA,
          })
          e.target.reset()
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onEditClick = function () {
    setShowColor(!showColor)
  }

  const onselectColor = function (color) {
    setUser({ ...user, background: color.hex })
  }

  const onChangeText = function ({ value, name }) {
    setUser({ ...user, [name]: value })
  }

  const onSelectUniversity = function (value) {
    setUser({ ...user, university: value })
  }

  useEffect(() => {
    const userId = Storage.pull(Constant.STORAGE.CURRENT_USER).id
    userRepository
      .getCurrentUser(userId)
      .then((result) => {
        setUser(result)
      })
      .catch(() => {})
  }, [])

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
              defaultValue={user && user.name}
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
              defaultValue={user && user.email}
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
              defaultValue={user && user.username}
              onChange={onChangeText}
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
              defaultValue={user && user.university}
              onSelect={onSelectUniversity}
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
          <InfoBox
            title={user && user.username}
            subTitle={user && user.university}
            background={user && user.background}
            onEditClick={onEditClick}
          />
          <Grid className={classes.colorBox}>
            {showColor && (
              <SketchPicker
                color={user && user.background}
                onChange={onselectColor}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Register
