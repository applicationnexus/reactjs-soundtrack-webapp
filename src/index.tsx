import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import Login from './components/Login/login';
import SignUp from './components/SignUp/sign-up';
import Home from './components/Home/home';
import LikeList from './components/LikeList/like-list';

// const isUserLogin = window.localStorage.getItem('isUserLogin');
// console.log('inside router', isUserLogin);

// const PrivateRoute = () => {
//   const isUserLogin = window.localStorage.getItem('isUserLogin');
//   isUserLogin ? <Route path="/liked-list" component={LikeList} /> : ;
// }

const routing = (
  <Router>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/home" component={Home} />
    <Route path="/liked-list" component={LikeList} />
    <Route exact path="/">
      <Redirect to="/home" />
    </Route>
  </Router>
);
export default class Routing extends React.Component {}
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
