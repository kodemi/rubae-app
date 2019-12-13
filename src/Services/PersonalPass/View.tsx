import { Icon, List } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const View = ({ pass, onEdit, isDeadline, intl }: any) => (
    <List.Item
        actions={
            !isDeadline
                ? [
                      <span onClick={() => onEdit(pass)}>
                          <Icon type="edit" />
                      </span>,
                  ]
                : []
        }
    >
        <List.Item.Meta
            title={<span style={{ fontWeight: 'bold' }}>{pass.fullName}</span>}
            description={
                <div>
                    <p style={{ marginBottom: 0 }}>
                        <FormattedMessage id="personalPass.pass" />
                        {pass.vest
                            ? `, ${intl
                                  .formatMessage({
                                      id: 'personalPass.vest',
                                  })
                                  .toLowerCase()}`
                            : ''}
                    </p>
                </div>
            }
        />
        <span style={{ fontSize: '1.3rem' }}>€{pass.amount}</span>
    </List.Item>
);

export default injectIntl(View);
