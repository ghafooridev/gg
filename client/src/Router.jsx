import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./views/Login";
import Register from "./views/Register";
import ForgetPassword from "./views/ForgetPassword";
import SiteContainer from "./components/SiteContainer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import PictionaryLobby from "./views/Pictionary/PictionaryLobby";
import PictionaryRoom from "./views/Pictionary/PictionaryRoom";
import PictionaryGame from "./views/Pictionary/PictionaryGame";

const Router = function () {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <SiteContainer>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forget-password" component={ForgetPassword} />
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
  );
};

export default Router;
