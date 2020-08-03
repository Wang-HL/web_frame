import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import loadHome from './src/pages/home';
import loadLogin from './src/pages/login';


export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/sys/login' component={loadLogin} />
      <Route path='/' component={loadHome} />
      <Route path='/sys' component={loadHome} />
    </Switch>
  </BrowserRouter>
);