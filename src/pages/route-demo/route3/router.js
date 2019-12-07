import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from '../route1/main';
import About from '../route1/about';
import Topic from './topic';
import Home from './home'
import Info from './info';
import NoMatch from './nomatch'

export default class IRouter extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route exact={true} path="/" component={Main}></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topic" render={() =>
                            <Topic>
                                <Route path="/topic/about/:value" component={Info}></Route>
                            </Topic>}>
                        </Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}