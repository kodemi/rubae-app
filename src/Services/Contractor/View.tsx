import { Alert } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const InfoBlock = ({ children }: any) => (
    <div style={{ marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
        {children}
    </div>
);

const View = ({ data, intl }: any) => {
    const status = data.approved
        ? 'contractor.status.approved'
        : 'contractor.status.waiting';

    return (
        <div>
            <Alert
                style={{ marginBottom: '1rem' }}
                type={data.approved ? 'success' : 'info'}
                message={intl.formatMessage({ id: status })}
            />
            <InfoBlock>
                <FormattedMessage id="contractor.name" tagName="h3" />
                {data.name}
            </InfoBlock>
            <InfoBlock>
                <FormattedMessage id="contractor.contact" tagName="h3" />
                {data.contact}
            </InfoBlock>
            <InfoBlock>
                <FormattedMessage id="contractor.email" tagName="h3" />
                {data.email}
            </InfoBlock>
            <InfoBlock>
                <FormattedMessage id="contractor.tel" tagName="h3" />
                {data.tel}
            </InfoBlock>
        </div>
    );
};

export default injectIntl(View);
