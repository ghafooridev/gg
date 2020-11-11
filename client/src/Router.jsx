import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "src/views/Login"
import Register from "src/views/Register"
import ForgetPassword from "src/views/ForgetPassword"
import SiteContainer from "src/components/SiteContainer"
import Home from "src/views/Home"

import PictionaryLobby from "src/views/Pictionary/PictionaryLobby"
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
            <Route path="/pictionary-lobby" exact component={PictionaryLobby} />
            <Route path="/pictionary-game" exact component={PictionaryGame} />
          </SiteContainer>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
