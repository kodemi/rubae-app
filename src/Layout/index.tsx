import { BackTop, Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import Logo from '../components/Logo';
import { logout } from '../ducks/auth';
import Menu from '../Menu';

const { Header, Content, Footer, Sider } = Layout;

export class AppLayout extends React.Component<any, any> {
    public state = {
        siderCollapsed: false,
    };

    public render() {
        const { pathname } = this.props;
        const { siderCollapsed } = this.state;

        return (
            <Layout style={{ height: '100vh', minWidth: 500 }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={this.handleSiderCollapse}
                >
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: 'white',
                                padding: 20,
                                borderRight: '1px solid #eee',
                            }}
                        >
                            <Logo />
                        </div>
                        <Menu
                            logout={this.props.logout}
                            onClick={this.handleMenuClick}
                            pathname={pathname}
                        />
                    </div>
                </Sider>
                <Layout style={{ overflowY: 'hidden' }}>
                    <Header
                        style={{
                            background: '#fff',
                            padding: 0,
                            position: 'fixed',
                            zIndex: 1,
                            width: siderCollapsed
                                ? '100%'
                                : 'calc(100% - 200px)',
                        }}
                    >
                        <h3>{this.props.title}</h3>
                    </Header>
                    <Content
                        id="content"
                        style={{
                            margin: '88px 16px 0',
                            minWidth: 450,
                            overflowY: 'auto',
                            borderTop: '1rem solid white',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 360,
                                textAlign: 'left',
                            }}
                        >
                            <BackTop target={this.getBackTopTarget} />
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <span style={{ color: '#aaa' }}>
                            <FormattedMessage id="contacts" />:
                            <a
                                style={{ color: '#aaa', paddingLeft: '0.5rem' }}
                                href="mailto:sales@rubae.ru"
                            >
                                sales@rubae.ru
                            </a>
                        </span>
                        <span style={{ float: 'right', color: '#aaa' }}>
                            build: {process.env.BUILD_VERSION}
                        </span>
                    </Footer>
                </Layout>
            </Layout>
        );
    }

    private getBackTopTarget = () => {
        return document.getElementById('content') || window;
    };

    private handleMenuClick = ({ key }: any) => {
        this.props.navigate(key);
    };

    private handleSiderCollapse = (collapsed: boolean) => {
        this.setState({ siderCollapsed: collapsed });
    };
}

const mapStateToProps = (state: any) => ({
    pathname: state.router.location.pathname,
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logout()),
    navigate: (route: string) => dispatch(push(`${route}`)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppLayout);
