import { Card as AntCard, Icon, Tooltip } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import config from '../../config';
import deadlines from '../../data/deadlines.json';

const CardTitle = ({ children }: any) => (
    <h3 style={{ marginBottom: 0, textAlign: 'center' }}>{children}</h3>
);

const warningStyle: React.CSSProperties = {
    color: 'orange',
    display: 'inline-block',
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: '1.3rem',
};

const errorStyle: React.CSSProperties = {
    ...warningStyle,
    color: 'red',
};

const Card = ({ intl, title, deadline: deadlineId, onClick }: any) => {
    let deadline =
        deadlineId && deadlines.find(({ id }: any) => id === deadlineId);
    let tillDeadline =
        deadline &&
        moment(deadline.date)
            .endOf('day')
            .diff(moment().startOf('day'), 'days');

    if (deadlineId === 'vip-parking') {
        deadline = true;
        tillDeadline = -1;
    }

    return (
        <AntCard
            hoverable
            onClick={onClick}
            style={{ height: 96 }}
            bodyStyle={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CardTitle>
                <span
                    style={{
                        display: 'inline-block',
                        color: tillDeadline < 0 ? 'lightgray' : 'auto',
                    }}
                >
                    <FormattedMessage id={title} />
                </span>
                {deadline &&
                    tillDeadline > 0 &&
                    tillDeadline < config.deadlineWarn && (
                        <Tooltip
                            title={intl.formatMessage({
                                id: 'dashboard.deadlineWarning',
                            })}
                        >
                            <Icon type="warning" style={warningStyle} />
                        </Tooltip>
                    )}
                {deadline && tillDeadline === 0 && (
                    <Tooltip
                        title={intl.formatMessage({
                            id: 'dashboard.deadlineError',
                        })}
                    >
                        <Icon type="warning" style={errorStyle} />
                    </Tooltip>
                )}
            </CardTitle>
        </AntCard>
    );
};

export default injectIntl(Card);
