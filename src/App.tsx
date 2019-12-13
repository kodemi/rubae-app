import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';

import { getBookedServices } from './ducks/bookedServices';
import Login from './Login';
import { DefaultLayout, routes } from './routes';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        if (props.auth.authenticated) {
            props.getBookedServices();
        }
    }

    public render() {
        const { auth, intl } = this.props;

        return (
            <div className="App">
                <Switch>
                    <Route
                        path="/login"
                        render={() =>
                            auth.authenticated ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    {routes.map((route: any) => (
                        <DefaultLayout
                            key={route.path}
                            authenticated={auth.authenticated}
                            path={route.path}
                            component={route.component}
                            title={intl.formatMessage({ id: route.title })}
                            deadline={route.deadline}
                        />
                    ))}
                    <Redirect to="/dashboard" />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({
    getBookedServices: () => dispatch(getBookedServices()),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
