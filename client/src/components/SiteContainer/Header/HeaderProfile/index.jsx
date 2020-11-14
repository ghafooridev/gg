import React from "react"

import Popover from "@material-ui/core/Popover"
import Typography from "@material-ui/core/Typography"
import { Grid } from "@material-ui/core"

import Button from "src/components/sharedComponents/Button"
import userAction from "src/redux/actions/UserAction"
import { useHistory } from "react-router-dom"
import { styles } from "./HeaderProfile.Style"
import Profile from "../../../../assets/images/profile.jpg"

export default function SimplePopover({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const history = useHistory()
  const classes = styles()

  const onProfileClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const onLogOutClick = function () {
    history.push("home")
    userAction.logout()
  }

  const onSettingClick = function () {}

  return (
    <>
      <Button
        label={user.username}
        type="grey"
        className={classes.rootButton}
        onClick={onProfileClick}
        icon={<i className="material-icons">expand_more</i>}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid className={classes.root}>
          <Grid item xs={12}>
            <img src={Profile} alt="Profile" className={classes.avatar} />
          </Grid>
          <Grid item xs={12} className={classes.infoGroup}>
            <Typography color="textSecondary">{user.email}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.buttonGroup}>
            <Button
              label="sign out"
              type="primary"
              onClick={onLogOutClick}
              className={classes.logOutButton}
            />
            <Button
              label="profile"
              type="primary"
              onClick={onSettingClick}
              className={classes.settingButton}
            />
          </Grid>
        </Grid>
      </Popover>
    </>
  )
}
