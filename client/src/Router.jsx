import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "src/views/Login"
import Register from "src/views/Register"
import ForgetPassword from "src/views/ForgetPassword"
import Room from "./views/Room"
import LandingPage from "./views/LandingPage"
import Lobby from "./views/Lobby"

const Router = function () {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          {/* <Drawer> */}
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" exact component={LandingPage} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/lobby/:lobbyId" component={Lobby} />
          {/* </Drawer> */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
