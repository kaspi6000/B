/* React */
import React                                               from 'react';
import ReactDOM                                            from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

/* Babble */
import CONFIG                                              from './models/m-config.js';
import { App, Home, Login, Register, Wall }                      from 'containers';
import { ChatApp, About, Feedback, GoogleLogin }           from 'components';
import { Contents1, Contents2, Contents3 }                 from 'components/realChat';

import reducers from 'reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store = {store}>
        <Router history = { browserHistory } >
            <Route path = "/" component = {App}>
                <IndexRoute component = {Home} />
                <Route path = "chat" component = {ChatApp} />
                <Route path = "login" component = {Login} />
                <Route path = "register" component = {Register} />
                <Route path = "wall/:username" component = {Wall} />
                <Route path = "contents1" component = {Contents1} />
                <Route path = "contents2" component = {Contents2} />
                <Route path = "contents3" component = {Contents3} />
                <Route path = "google" component = {GoogleLogin} />
                <Route path = "about" component = {About} />
                <Route path = "feedback" component = {Feedback} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('babble'));
