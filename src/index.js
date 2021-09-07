import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './application/App';
import { StateProvider } from './context/store';

ReactDOM.render(
  <BrowserRouter>
    <StateProvider>
      <Route path='/' component={App} />
    </StateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
