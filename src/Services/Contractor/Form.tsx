import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item;

class ContractorForm extends React.Component<any, any> {
    public render() {
        const { intl, loading, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                style={{ maxWidth: 600 }}
            >
                <FormItem label={intl.formatMessage({ id: 'contractor.name' })}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({
                                    id: 'contractor.messages.required',
                                }),
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'contractor.contact' })}
                >
                    {getFieldDecorator('contact', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({
                                    id: 'contractor.messages.required',
                                }),
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'contractor.email' })}
                >
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({
                                    id: 'contractor.messages.required',
                                }),
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label={intl.formatMessage({ id: 'contractor.tel' })}>
                    {getFieldDecorator('tel', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({
                                    id: 'contractor.messages.required',
                                }),
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={this.isSubmitButtonDisabled()}
                >
                    <FormattedMessage id="contractor.send" />
                </Button>
            </Form>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(
            { scroll: { offsetTop: 100 } },
            (err: any, values: any) => {
                if (!err) {
                    this.props.onSubmit(values);
                }
            }
        );
    };

    private isSubmitButtonDisabled = () => {
        return !this.props.form.isFieldsTouched();
    };
}

export default Form.create({
    mapPropsToFields({ data }: any) {
        return {
            name: Form.createFormField({ value: data.name }),
            inn: Form.createFormField({ value: data.inn }),
            contact: Form.createFormField({ value: data.contact }),
            email: Form.createFormField({ value: data.email }),
            tel: Form.createFormField({ value: data.tel }),
        };
    },
})(ContractorForm);
