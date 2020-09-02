import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

// styles
import "./assets/css/bootstrap.min.css";
import "./assets/scss/paper-kit.scss";
import "./assets/demo/demo.css";

// import CreateRoom from './routes/createRoom';
import Room from './views/room';
import LandingPage from './views/LandingPage';
import Lobby from './views/Lobby';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LandingPage} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/lobby" component={Lobby} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;