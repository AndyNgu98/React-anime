import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './Context/auth-context'
import FavouriteContextProvider from './Context/fav-context'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <AuthContextProvider>
    <FavouriteContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavouriteContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
