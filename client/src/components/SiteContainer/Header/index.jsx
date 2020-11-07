import React, { useEffect, useState } from "react"

import Button from "src/components/sharedComponents/Button"
import { Grid } from "@material-ui/core"
import { Squash as Hamburger } from "hamburger-react"
import clsx from "clsx"
import { styles } from "./Header.Style"
import Logo from "../../../assets/images/logo_light.png"

const Header = function () {
  const [isOpen, setOpen] = useState(false)
  const classes = styles(isOpen)

  const onToggleHamburger = function (toggle) {
    setOpen(toggle)
  }

  const onMenuClick = function (page) {
    console.log(page)
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <img alt="logo" src={Logo} className={classes.logo} />
        <div className={classes.menu}>
          <Grid item className={classes.hamburger}>
            <Hamburger
              size={20}
              color="#000"
              toggled={isOpen}
              toggle={setOpen}
              onToggle={(toggled) => onToggleHamburger(toggled)}
            />
          </Grid>
          <Grid
            item
            className={clsx(
              "buttonGroupToggle",
              isOpen ? classes.buttonGroupCollapse : classes.buttonGroupExpand
            )}
          >
            <Button
              label="Invite Friends"
              type="grey"
              className={classes.button}
              onClick={() => onMenuClick("inviteFriends")}
            />
            <Button
              label="Sign In"
              type="grey"
              className={classes.button}
              onClick={() => onMenuClick("signIn")}
            />
            <Button
              label="Sign Up"
              type="grey"
              className={classes.button}
              onClick={() => onMenuClick("signUp")}
            />
          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default Header
