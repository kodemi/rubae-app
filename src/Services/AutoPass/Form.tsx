import { Button, Form, Input, Popconfirm, Radio } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { NEW_PASS_ID } from './';

const FormItem = Form.Item;

class BadgesForm extends React.Component<any, any> {
    public render() {
        const { intl, pass, passTypes, form, onCancel, onRemove } = this.props;
        const options = {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: intl.formatMessage({
                        id: 'autoPass.messages.required',
                    }),
                },
            ],
        };

        return (
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                style={{ maxWidth: 600 }}
            >
                <FormItem
                    label={intl.formatMessage({ id: 'autoPass.passType' })}
                >
                    {form.getFieldDecorator(`type`, {
                        ...options,
                        initialValue: pass.type && pass.type.code,
                    })(
                        <Radio.Group style={{ width: '100%' }}>
                            {passTypes.map((item: any) => (
                                <Radio
                                    key={item.code}
                                    value={item.code}
                                    style={{ width: '100%' }}
                                >
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            width: 'calc(100% - 16px - 8px)',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>
                                            {
                                                item[
                                                    intl.locale === 'ru'
                                                        ? 'nameRu'
                                                        : 'nameEn'
                                                ]
                                            }
                                        </span>
                                        <span>€{item.price}</span>
                                    </span>
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                </FormItem>
                <div style={{ display: 'flex' }}>
                    <Button onClick={onCancel} style={{ marginRight: 10 }}>
                        <FormattedMessage id="autoPass.cancel" />
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.isSubmitButtonDisabled()}
                    >
                        <FormattedMessage id="autoPass.save" />
                    </Button>
                    {pass.id !== NEW_PASS_ID && (
                        <Popconfirm
                            title={intl.formatMessage({
                                id: 'autoPass.messages.removeConfirm',
                            })}
                            okText={intl.formatMessage({
                                id: 'autoPass.messages.removeConfirmOk',
                            })}
                            cancelText={intl.formatMessage({
                                id: 'autoPass.messages.removeConfirmCancel',
                            })}
                            onConfirm={() => onRemove(pass)}
                        >
                            <Button
                                type="danger"
                                style={{ marginLeft: 'auto' }}
                            >
                                <FormattedMessage id="autoPass.remove" />
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
                regNum: Form.createFormField({ value: pass.regNum }),
                carModel: Form.createFormField({ value: pass.carModel }),
                passport: Form.createFormField({ value: pass.passport }),
                type: Form.createFormField({
                    value: (pass.type && pass.type.code) || undefined,
                }),
            };
        },
    })(BadgesForm)
);
