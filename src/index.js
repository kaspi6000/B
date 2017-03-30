/* React */
import React                                               from 'react';
import ReactDOM                                            from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

/* Babble */
import CONFIG                                              from './models/m-config.js';
import { App, Home, Login, Register }                      from 'containers';
import { ChatApp, RealChat, About, Feedback }              from 'components';

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
                <Route path = "realchat" component = {RealChat} />
                <Route path = "about" component = {About} />
                <Route path = "feedback" component = {Feedback} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('babble'));
