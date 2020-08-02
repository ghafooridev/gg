import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

import CreateRoom from './routes/createRoom';
import Room from './routes/room';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;