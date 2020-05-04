import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//react-router-dom
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// component
import App from './App';
import Admin from "./layouts/admin";
import SignIn from "./layouts/auth/SignIn";
import SignUp from "./layouts/auth/SignUp";
import Message from './components/Message';
import Navbar from "./components/Navbar";
import Guard from "./components/Guard";
import TripContainer from './containers/TripContainer';

import api from "./api";
import jwtDecode from "jwt-decode";
import { getInformationUser } from "./actions/auth";

import * as serviceWorker from './serviceWorker';

import './style/main.scss';
import Account from './components/Account';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const token = localStorage.getItem("tokenBusTicket");
if (token) {
  api.defaults.headers.common["token"] = token;
  api.defaults.headers.common["Content-Type"] = "application/json";
  const dataUser = jwtDecode(token);
  store.dispatch(getInformationUser(dataUser));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div className="bus-content">
        <Switch>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Guard path="/trips" exact>
            <TripContainer />
          </Guard>
          <Guard path="/account" exact>
            <Account />
          </Guard>
          <Guard path="/admin">
            <Admin />
          </Guard>
          <Route path="/" exact component={App} />
        </Switch>
      </div>
    </BrowserRouter>
    <Message />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
