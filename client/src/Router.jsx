import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Room from "./views/Room"
import LandingPage from "./views/LandingPage"
import Lobby from "./views/Lobby"
import Login from "./views/Login"
import Register from "./views/Register"

const Router = function () {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* <Drawer> */}
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
