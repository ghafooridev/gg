import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "src/views/Login"
import Register from "src/views/Register"
import ForgetPassword from "src/views/ForgetPassword"
import SiteContainer from "src/components/SiteContainer"
import Home from "src/views/Home"

import Room from "./views/Room"
import Lobby from "./views/Lobby"

const Router = function () {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <SiteContainer>
            <Route exact path="/" component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/room/:roomID" component={Room} />
            <Route path="/lobby/:lobbyId" component={Lobby} />
          </SiteContainer>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
