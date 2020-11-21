import React, { useContext, useState } from "react"

import { useHistory } from "react-router-dom"

import { Grid } from "@material-ui/core"

import { Squash as Hamburger } from "hamburger-react"

import clsx from "clsx"

import isEmpty from "lodash.isempty"

import ThemeContext from "src/Contexts/Theme/ThemeContext"
import Button from "src/components/sharedComponents/Button"
import { useSelector } from "react-redux"
import HeaderProfile from "./HeaderProfile"
import { styles } from "./Header.Style"
import Logo from "../../../assets/images/logo_light.png"

const Header = function () {
  const currentUser = useSelector((state) => state.user)

  const { toggleTheme, theme } = useContext(ThemeContext)
  const mode = theme.Theme.palette.type

  const history = useHistory()

  const [isOpen, setOpen] = useState(false)

  const classes = styles(isOpen)

  const onToggleHamburger = function (toggle) {
    setOpen(toggle)
  }

  const onMenuClick = function (type) {
    const types = {
      signIn: () => {
        history.push("login")
      },
      signUp: () => {
        history.push("register")
      },
      inviteFriend: () => {
        alert("not implemented")
      },
      home: () => {
        history.push("home")
      },
    }

    if (types[type]) {
      return types[type]()
    }
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <img alt="logo" src={Logo} className={classes.logo}  onClick={() => onMenuClick("home")}/>
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
              classes.buttonGroupToggle,
              isOpen ? classes.buttonGroupCollapse : classes.buttonGroupExpand
            )}
          >
            {!isEmpty(currentUser) && (
              <Button
                label="Invite Friends"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("inviteFriends")}
              />
            )}
            {!isEmpty(currentUser) && <HeaderProfile user={currentUser} />}
            {isEmpty(currentUser) && (
              <Button
                label="Sign In"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("signIn")}
              />
            )}
            {isEmpty(currentUser) && (
              <Button
                label="Sign Up"
                type="grey"
                className={classes.button}
                onClick={() => onMenuClick("signUp")}
              />
            )}
            <Button
              type="grey"
              icon={
                mode === "dark" ? (
                  <i
                    className="material-icons"
                    style={{ paddingTop: 3, color: "gold" }}
                  >
                    wb_sunny
                  </i>
                ) : (
                  <i className="material-icons" style={{ paddingTop: 3 }}>
                    brightness_3
                  </i>
                )
              }
              className={classes.modeButton}
              onClick={toggleTheme}
            />
          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default Header
