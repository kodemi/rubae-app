import { Timeline } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import data from '../data/deadlines.json';

const Deadlines = ({ intl, services }: any) => {
    return (
        <Timeline>
            {data
                .filter(
                    (item: any) =>
                        item.id === 'contractor'
                            ? services.contractor.enabled
                            : item
                )
                .sort(
                    (a: any, b: any) =>
                        moment(a.date) < moment(b.date) ? -1 : 1
                )
                .map(({ date, description, link }: any, idx: number) => (
                    <Timeline.Item
                        key={idx}
                        color={moment(date) < moment() ? 'red' : 'blue'}
                    >
                        <h3>{moment(date).format('LL')}</h3>
                        {link ? (
                            <Link to={link}>{description[intl.locale]}</Link>
                        ) : (
                            <p>{description[intl.locale]}</p>
                        )}
                    </Timeline.Item>
                ))}
        </Timeline>
    );
};

const mapStateToProps = ({ bookedServices: services }: any) => ({
    services,
});

export default injectIntl<any>(connect(mapStateToProps)(Deadlines));
