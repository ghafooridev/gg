import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

// styles
import "./assets/css/bootstrap.min.css";
import "./assets/scss/paper-kit.scss?v=1.2.0";
import "./assets/demo/demo.css?v=1.2.0";

import CreateRoom from './routes/createRoom';
import Room from './routes/room';
import LandingPage from './views/pages/LandingPage';
import Lobby from './views/pages/Lobby';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/home" exact component={LandingPage} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/lobby" component={Lobby} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;