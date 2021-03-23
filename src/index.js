import React from 'react';
import ReactDOM from 'react-dom';

import './utils/global/styles.css'
import './utils/global/styles.scss'

import Router from "./router";

ReactDOM.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
  document.getElementById('root')
);
