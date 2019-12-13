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
            title={
                <span style={{ fontWeight: 'bold' }}>
                    {pass.type[intl.locale === 'ru' ? 'nameRu' : 'nameEn']}
                </span>
            }
        />
        <span style={{ fontSize: '1.3rem' }}>€{pass.type.price}</span>
    </List.Item>
);

export default injectIntl(View);
