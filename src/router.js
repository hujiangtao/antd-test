import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './app';
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import NoMatch from './pages/no-match/index';

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/order/detail" component={Login} />
                </App>
            </HashRouter>
        );
    }
}