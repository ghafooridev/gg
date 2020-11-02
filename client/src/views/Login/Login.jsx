import React, { useContext} from "react"

import { Container, Paper } from "@material-ui/core"

import Logo from "src/assets/images/logo_light.png"

import SignIn from "src/views/Login/SignIn"
import Forget from "src/views/Login/Forget"
import Register from "src/views/Login/Register"
import LoginContext from "src/views/Login/Context/LoginContext"

import Constant from "src/utils/Constant"
import { styles } from "./Login.Style"

const Login = function () {
  const classes = styles()
  const { page } = useContext(LoginContext)

  const renderTemplate = function () {
    if (page === Constant.LOGIN_PAGE.SIGN_IN) {
      return <SignIn />
    }
    if (page === Constant.LOGIN_PAGE.FORGET) {
      return <Forget />
    }
    if (page === Constant.LOGIN_PAGE.REGISTER) {
      return <Register />
    }
  }

  return (
    <div>
      <div className={classes.background} />
      <Container maxWidth="md" className={classes.container}>
        <Paper className={classes.paper} style={{ display: "flex" }}>
          <img alt="logo" src={Logo} className={classes.logo} />
          {renderTemplate()}
        </Paper>
      </Container>
    </div>
  )
}

export default Login
