import React from "react"

import { Fade, Container, Paper } from "@material-ui/core"

import Logo from "src/assets/images/logo_light.png"
import { styles } from "./LoginContainer.Style"

const LoginPage = function ({ children }) {
  const classes = styles()

  return (
    <div>
      <div className={classes.background} />
      <Fade in timeout={1000}>
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.paper} style={{ display: "flex" }}>
            <img alt="logo" src={Logo} className={classes.logo} />
            {children}
          </Paper>
        </Container>
      </Fade>
    </div>
  )
}

export default LoginPage
