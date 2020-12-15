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
          <SiteContainer>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forget-password" component={ForgetPassword} />

            <Route exact path="/" component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/profile/:userId" exact component={Profile} />
            <Route path="/pictionary-room" component={PictionaryRoom} />
            <Route
              path="/pictionary-lobby/:lobby"
              component={PictionaryLobby}
            />

            <Route path="/pictionary-game/:game" component={PictionaryGame} />
          </SiteContainer>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
