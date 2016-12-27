import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './app/app';
import Tab from './tab';

class HomeView extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="tab" component={Tab} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <HomeView />,
    document.querySelector('.app')
);