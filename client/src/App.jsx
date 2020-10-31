import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"


// styles
import "./assets/css/bootstrap.min.css"
import "./assets/scss/paper-kit.scss"
import "./assets/demo/demo.css"
import "./assets/scss/custom/main.scss"

// import CreateRoom from './routes/createRoom';
import Room from "./views/Room"
import LandingPage from "./views/LandingPage"
import Lobby from "./views/Lobby"

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
