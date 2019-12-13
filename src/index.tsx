import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware,
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import 'intl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { unregister } from './registerServiceWorker';
require('moment/locale/en-gb'); // tslint:disable-line
require('moment/locale/ru'); // tslint:disable-line

import './polyfills/find';

import App from './App';
import reducer from './ducks';
import './index.css';

import { getDocId, isAuthenticated } from './api';
import { loginSuccess } from './ducks/auth';
import { changeLocale } from './ducks/lang';
import { flattenMessages } from './utils';

import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import { connect } from 'react-redux';
import enMessages from './i18n/en';
import ruMessages from './i18n/ru';

addLocaleData([...ru, ...en]);
const i18nMessages = {
    en: flattenMessages(enMessages),
    ru: flattenMessages(ruMessages),
};

const initState = {};
// const persistedState = false;
// const persistedState = localStorage.getItem('reduxState');
// if (isAuthenticated()) {
//     if (persistedState) {
//         initState = JSON.parse(persistedState);
//     }
// } else {
//     if (persistedState) {
//         localStorage.removeItem('reduxState');
//     }
// }

const history = createBrowserHistory();

const devTools =
    process.env.NODE_ENV === 'development' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        : (a: any) => a;

const store = createStore(
    connectRouter(history)(reducer),
    initState,
    compose(
        applyMiddleware(routerMiddleware(history), thunk),
        devTools
    )
);

const langKey =
    localStorage.getItem('lang') ||
    navigator.language ||
    (navigator as any).browserLanguage ||
    'en';
store.dispatch(changeLocale(langKey));

if (isAuthenticated()) {
    store.dispatch(loginSuccess(getDocId() as string));
}
// store.dispatch(resetBookedServices());

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

const ConnectedIntlProvider = connect(({ lang }: any) => ({
    locale: lang,
    key: lang,
    messages: i18nMessages[lang],
}))(IntlProvider);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <ConnectedRouter history={history}>
                <Route path="/" component={App} />
            </ConnectedRouter>
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
unregister();
