import {
    Alert,
    Button,
    Col,
    Divider,
    Form,
    Icon,
    Input,
    Layout,
    Row,
} from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';

import { login, resetError } from '../ducks/auth';

import './Login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component<any, any> {
    public componentDidMount() {
        this.props.resetError();
    }

    public render() {
        const { intl, form, auth } = this.props;
        const { getFieldDecorator } = form;
        const { error, loading } = auth;

        return (
            <Layout>
                <Layout.Content
                    style={{
                        height: '100vh',
                        backgroundColor: 'white',
                        minHeight: 580,
                    }}
                >
                    <Row
                        justify="center"
                        align="middle"
                        type="flex"
                        style={{ height: '100%' }}
                    >
                        <Col style={{ width: 290, padding: 20 }}>
                            <a
                                href="https://rubae.ru"
                                style={{
                                    display: 'inline-block',
                                    marginBottom: '2rem',
                                }}
                            >
                                <Logo />
                            </a>
                            <Form
                                onSubmit={this.handleSubmit}
                                className="login-form"
                            >
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                message: intl.formatMessage({
                                                    id:
                                                        'login.messages.username',
                                                }),
                                                required: true,
                                            },
                                        ],
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="user"
                                                    style={{
                                                        color:
                                                            'rgba(0,0,0,.25)',
                                                    }}
                                                />
                                            }
                                            placeholder={intl.formatMessage({
                                                id: 'login.username',
                                            })}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                message: intl.formatMessage({
                                                    id:
                                                        'login.messages.password',
                                                }),
                                                required: true,
                                            },
                                        ],
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="lock"
                                                    style={{
                                                        color:
                                                            'rgba(0,0,0,.25)',
                                                    }}
                                                />
                                            }
                                            type="password"
                                            placeholder={intl.formatMessage({
                                                id: 'login.password',
                                            })}
                                        />
                                    )}
                                </FormItem>
                                {error && (
                                    <Alert
                                        message={intl.formatMessage({id: 'login.messages.error'})}
                                        type="error"
                                        style={{ marginBottom: '1rem' }}
                                    />
                                )}
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        loading={loading}
                                    >
                                        <FormattedMessage id="login.login" />
                                    </Button>
                                </FormItem>
                            </Form>
                            <LanguageSwitcher />
                            <div
                                style={{
                                    color: '#aaa',
                                    marginTop: 40,
                                }}
                            >
                                <Divider>
                                    <span
                                        style={{
                                            fontSize: '90%',
                                            color: '#aaa',
                                        }}
                                    >
                                        <FormattedMessage id="contacts" />
                                    </span>
                                </Divider>
                                <a
                                    style={{
                                        color: '#aaa',
                                        paddingLeft: '0.5rem',
                                    }}
                                    href="mailto:sales@rubae.ru"
                                >
                                    sales@rubae.ru
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({ authError: false });
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.props.login(values.username, values.password);
            }
        });
    };
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state: any) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) =>
        dispatch(login(username, password)),
    resetError: () => dispatch(resetError()),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WrappedNormalLoginForm)
);
