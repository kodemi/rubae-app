import { Icon, List } from 'antd';
import * as React from 'react';

export default ({ badge, onEdit, isDeadline }: any) => (
    <List.Item
        actions={
            !isDeadline
                ? [
                      <span onClick={() => onEdit(badge)}>
                          <Icon type="edit" />
                      </span>,
                  ]
                : []
        }
    >
        <List.Item.Meta
            title={
                <span style={{ fontWeight: 'bold' }}>{`${badge.firstName} ${
                    badge.lastName
                }`}</span>
            }
        />
    </List.Item>
);
