import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "src/views/Login"
import Register from "src/views/Register"
import ForgetPassword from "src/views/ForgetPassword"
import SiteContainer from "src/components/SiteContainer"
import Home from "src/views/Home"
import Profile from "src/views/Profile"
import PictionaryLobby from "src/views/Pictionary/PictionaryLobby"
import PictionaryRoom from "src/views/Pictionary/PictionaryRoom"
import PictionaryGame from "src/views/Pictionary/PictionaryGame"

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
            <Route path="/profile" exact component={Profile} />
            <Route path="/pictionary-Room" exact component={PictionaryRoom} />
            <Route path="/pictionary-lobby" exact component={PictionaryLobby} />
            <Route path="/pictionary-game" exact component={PictionaryGame} />
          </SiteContainer>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
