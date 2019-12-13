import { Button, Form, InputNumber } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

class VIPParkingForm extends React.Component<any, any> {
    public render() {
        const {
            form,
            intl,
            data: { loading, price, available },
        } = this.props;
        const value = form.getFieldValue('value');

        return (
            <Form onSubmit={this.handleSubmit}>
                <p style={{ fontWeight: 'bold' }}>
                    <FormattedMessage
                        id="vipParking.available"
                        values={{ available }}
                    />
                </p>
                <Form.Item
                    extra={intl.formatMessage({ id: 'vipParking.inputExtra' })}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ marginLeft: '1rem' }}>
                            <span style={{ marginRight: 10 }}>€{price} ×</span>
                            {form.getFieldDecorator('value')(
                                <InputNumber
                                    min={0}
                                    max={available}
                                    style={{ maxWidth: 55 }}
                                    disabled
                                />
                            )}
                            <span style={{ marginLeft: 10 }}>=</span>
                            <span
                                style={{
                                    minWidth: '3rem',
                                    display: 'inline-block',
                                    textAlign: 'right',
                                }}
                            >
                                €{value * price}
                            </span>
                        </span>
                    </div>
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={this.isSubmitButtonDisabled()}
                >
                    <FormattedMessage id="vipParking.save" />
                </Button>
            </Form>
        );
    }

    private isSubmitButtonDisabled = () => {
        return !this.props.form.isFieldsTouched();
    };

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            this.props.onSave(values);
        });
    };
}

export default injectIntl<any>(
    Form.create({
        mapPropsToFields({ data }: any) {
            return {
                value: Form.createFormField({ value: data.value }),
            };
        },
    })(VIPParkingForm)
);
