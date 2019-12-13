import * as moment from 'moment';
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Deadlines from './Deadlines';
import Layout from './Layout';
import AdditionalEquipment from './Services/AdditionalEquipment';
import AdditionalServices from './Services/AdditionalServices';
import AutoPass from './Services/AutoPass';
import Badges from './Services/Badges';
import Catalogue from './Services/Catalogue';
import Contractor from './Services/Contractor';
import Electricity from './Services/Electricity';
import VIPParking from './Services/VIPParking';

import deadlines from './data/deadlines.json';

export const PrivateRoute = ({ render, authenticated, ...rest }: any) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated ? render(props) : <Redirect to="/login" />
        }
    />
);

export const DefaultLayout = ({
    component: Component,
    title,
    deadline,
    ...rest
}: any) => {
    if (deadline) {
        const dl = deadlines.find(({ id }: any) => deadline.id === id);
        const dlDate =
            dl.date.length === 10
                ? moment(dl.date).endOf('day')
                : moment(dl.date);
        const isDeadline = moment() > dlDate;
        rest.isDeadline = isDeadline;
        if (isDeadline && deadline.redirect) {
            return <Redirect to={deadline.redirect || '/'} />;
        }
    }

    return (
        <PrivateRoute
            {...rest}
            render={(props: any) => (
                <Layout title={title}>
                    <Component {...props} {...rest} />
                </Layout>
            )}
        />
    );
};

export const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        title: 'menu.dashboard',
    },
    {
        path: '/deadlines',
        component: Deadlines,
        title: 'menu.deadlines',
    },
    {
        path: '/catalogue',
        component: Catalogue,
        title: 'catalogue.title',
        deadline: { id: 'catalogue' },
    },
    {
        path: '/contractor',
        component: Contractor,
        title: 'contractor.title',
        deadline: { id: 'contractor', redirect: '/' },
    },
    {
        path: '/electricity',
        component: Electricity,
        title: 'electricity.title',
        deadline: { id: 'electricity', redirect: '/' },
    },
    {
        path: '/badges',
        component: Badges,
        title: 'badges.title',
        deadline: { id: 'badges' },
    },
    {
        path: '/vip-parking',
        component: VIPParking,
        title: 'vipParking.title',
    },
    {
        path: '/additional-services',
        component: AdditionalServices,
        title: 'additionalServices.title',
    },
    {
        path: '/additional-equipment',
        component: AdditionalEquipment,
        title: 'additionalEquipment.title',
        deadline: { id: 'additionalEquipment' },
    },

    {
        path: '/auto-passes',
        component: AutoPass,
        title: 'autoPass.title',
        deadline: { id: 'autoPass' },
    },
];
