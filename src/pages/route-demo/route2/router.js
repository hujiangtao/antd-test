import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Main from '../route1/main';
import About from '../route1/about';
import Topic from './topic';
import Home from './home'

export default class IRouter extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topic" render={() =>
                        <Topic>
                            <Route path="/topic/about" component={About}></Route>
                        </Topic>}>
                    </Route>
                </Home>
            </Router>
        );
    }
}