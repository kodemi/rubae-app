import { Divider, List } from 'antd';
import { push } from 'connected-react-router';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import BookedServices from '../BookedServices';
import AdditionalServices from '../Services/AdditionalServices';
import Badges from '../Services/Badges';
import Card from './components/Card';
import ClientInfo from './components/ClientInfo';

const getName = (en: any, ru: any, locale: string) => {
    return locale === 'en' ? en.name || ru.name : ru.name || en.name;
};

const cards = [
    {
        title: 'additionalServices.title',
        path: '/additional-services',
    },
    {
        title: 'catalogue.title',
        path: '/catalogue',
        deadline: 'catalogue',
    },
    {
        title: 'contractor.title',
        path: '/contractor',
        deadline: 'contractor',
    },
    {
        title: 'electricity.title',
        path: '/electricity',
        deadline: 'electricity',
    },

    {
        title: 'additionalEquipment.title',
        path: '/additional-equipment',
        deadline: 'additionalEquipment',
    },
    {
        title: 'badges.title',
        path: '/badges',
        deadline: 'badges',
    },
    {
        title: 'vipParking.title',
        path: '/vip-parking',
        deadline: 'vip-parking',
    },
    {
        title: 'autoPass.title',
        path: '/auto-passes',
        deadline: 'autoPass',
    },
];

const Dashboard = ({ stand, catalogue: { en, ru, logo }, intl, go }: any) => (
    <div>
        <ClientInfo
            stand={stand}
            name={getName(en, ru, intl.locale)}
            logo={logo}
            style={{ marginBottom: 50 }}
        />
        <BookedServices collapsible />
        <Divider dashed />
        <h1 style={{ marginTop: '3rem' }}>
            <FormattedMessage id="additionalServices.title" />
        </h1>
        <AdditionalServices />
        <h1 style={{ marginTop: '3rem' }}>
            <FormattedMessage id="badges.title" />
        </h1>
        <Badges />
        {/* <List
            grid={{ gutter: 16, xs: 1, sm: 2, lg: 3, xl: 3 }}
            dataSource={cards}
            renderItem={(item: any) => (
                <List.Item>
                    <Card
                        title={item.title}
                        deadline={item.deadline}
                        onClick={() => go(item.path)}
                    />
                </List.Item>
            )}
        /> */}
    </div>
);

const mapStateToProps = (state: any) => ({
    locale: state.lang,
    ...state.bookedServices,
});

const mapDispatchToProps = (dispatch: any) => ({
    go: (path: string) => dispatch(push(path)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);
