import { Button, Checkbox, Form, Input, Popconfirm } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { NEW_PASS_ID } from './';

const FormItem = Form.Item;

class BadgesForm extends React.Component<any, any> {
    public render() {
        const { intl, pass, services, form, onCancel, onRemove } = this.props;
        const options = {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: intl.formatMessage({
                        id: 'personalPass.messages.required',
                    }),
                },
            ],
        };

        return (
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                style={{ maxWidth: 600, minWidth: 400 }}
            >
                <FormItem
                    label={intl.formatMessage({ id: 'personalPass.fullName' })}
                >
                    {form.getFieldDecorator(`fullName`, {
                        ...options,
                        initialValue: pass.fullName,
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'personalPass.passport' })}
                    extra={intl.formatMessage({
                        id: 'personalPass.passportDescription',
                    })}
                >
                    {form.getFieldDecorator(`passport`, {
                        ...options,
                        initialValue: pass.passport,
                    })(<Input />)}
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator(`vest`, {
                        initialValue: pass.vest,
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            <FormattedMessage id="personalPass.vest" />
                            <span style={{ marginLeft: '1rem' }}>
                                €{services.vest.price}
                            </span>
                        </Checkbox>
                    )}
                </FormItem>

                <div style={{ display: 'flex' }}>
                    <Button onClick={onCancel} style={{ marginRight: 10 }}>
                        <FormattedMessage id="personalPass.cancel" />
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.isSubmitButtonDisabled()}
                    >
                        <FormattedMessage id="personalPass.save" />
                    </Button>
                    {pass.id !== NEW_PASS_ID && (
                        <Popconfirm
                            title={intl.formatMessage({
                                id: 'personalPass.messages.removeConfirm',
                            })}
                            okText={intl.formatMessage({
                                id: 'personalPass.messages.removeConfirmOk',
                            })}
                            cancelText={intl.formatMessage({
                                id: 'personalPass.messages.removeConfirmCancel',
                            })}
                            onConfirm={() => onRemove(pass)}
                        >
                            <Button
                                type="danger"
                                style={{ marginLeft: 'auto' }}
                            >
                                <FormattedMessage id="personalPass.remove" />
                            </Button>
                        </Popconfirm>
                    )}
                </div>
            </Form>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(
            { scroll: { offsetTop: 100 } },
            (err: any, values: any) => {
                if (!err) {
                    this.props.onSubmit({ ...values, id: this.props.pass.id });
                }
            }
        );
    };

    private isSubmitButtonDisabled = () => {
        return !this.props.form.isFieldsTouched();
    };
}

export default injectIntl<any>(
    Form.create({
        mapPropsToFields({ pass }: any) {
            return {
                fullName: Form.createFormField({ value: pass.fullName }),
                passport: Form.createFormField({ value: pass.passport }),
                vest: Form.createFormField({ value: pass.vest || false }),
            };
        },
    })(BadgesForm)
);
