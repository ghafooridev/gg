import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import "./App.css"

// styles
import "./assets/css/bootstrap.min.css"
import "./assets/scss/paper-kit.scss"
import "./assets/demo/demo.css"
import "./assets/scss/custom/main.scss"

// import CreateRoom from './routes/createRoom';
import Room from "./views/Room"
import LandingPage from "./views/LandingPage"
import Lobby from "./views/Lobby"
import Storage from "./services/Storage"
import userRepository from "./repositories/user"
import Constant from "./utils/Constant";

function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={LandingPage} />
        <Route path="/signup" exact component={LandingPage} />
        <Route path="/room/:roomID" component={Room} />
        <Route path="/lobby/:lobbyId" component={Lobby} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
