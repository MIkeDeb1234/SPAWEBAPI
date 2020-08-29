import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'

import { Home } from './components/home/Home';
import { Panel } from './components/panel/Panel';
import { Navigation } from './components/nav/Navigation'
import {ViewClock} from './components/user/ViewClock'
import { UserProfile } from './components/user/UserProfile';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation></Navigation>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/panel" component={Panel} exact />
          <Route path="/user/userprofile" component={UserProfile} exact/>
          <Route path="/user/viewclock" component={ViewClock} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
