import { Menu } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import LanguageSwitcher from '../components/LanguageSwitcher';

const { Item, Divider } = Menu;

const AppMenu = ({ onClick, logout, pathname }: any) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}
    >
        <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            onClick={onClick}
        >
            <Item key="/dashboard">
                <FormattedMessage id="menu.dashboard" />
            </Item>
            <Item key="/deadlines">
                <FormattedMessage id="menu.deadlines" />
            </Item>
        </Menu>
        <Menu
            mode="inline"
            theme="dark"
            selectable={false}
            style={{ marginTop: 'auto' }}
        >
            <Item>
                <LanguageSwitcher />
            </Item>
        </Menu>
        <Menu mode="inline" theme="dark">
            <Divider />
            <Item key="logout" onClick={logout}>
                <FormattedMessage id="menu.logout" />
            </Item>
        </Menu>
    </div>
);

export default injectIntl<any>(AppMenu);
