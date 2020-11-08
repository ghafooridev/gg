import React from "react"

import { Grow, Container, Paper } from "@material-ui/core"

import { useHistory } from "react-router-dom"

import Logo from "../../../assets/images/logo_light.png"
import { styles } from "./LoginContainer.Style"

const LoginPage = function ({ children }) {
  const classes = styles()
  const history = useHistory()

  const onLogoClick = function () {
    history.push("home")
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <div className={classes.background} />
      <Container maxWidth="md" className={classes.container}>
        <Grow in>
          <Paper className={classes.paper} style={{ display: "flex" }}>
            <img
              alt="logo"
              src={Logo}
              className={classes.logo}
              onClick={onLogoClick}
            />
            {children}
          </Paper>
        </Grow>
      </Container>
    </div>
  )
}

export default LoginPage
