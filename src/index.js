import React from 'react';
import ReactDOM from 'react-dom';

import './utils/global/styles.css'
import './utils/global/styles.scss'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './views/Home';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
