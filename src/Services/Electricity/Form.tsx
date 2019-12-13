import { Button, Form, Radio } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class ElectricityForm extends React.Component<any, any> {
    public render() {
        const { intl, loading, form, data, standType } = this.props;
        const { getFieldDecorator } = form;
        const { services } = data;

        return (
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                style={{ maxWidth: 600 }}
            >
                <FormItem
                    label={intl.formatMessage({
                        id:
                            standType === 'shellScheme'
                                ? 'electricity.serviceShellScheme'
                                : 'electricity.serviceSpaceOnly',
                    })}
                >
                    {getFieldDecorator('service')(
                        <RadioGroup style={{ width: '100%' }}>
                            {services.map((item: any) => (
                                <Radio
                                    style={radioStyle}
                                    key={item.code}
                                    value={item.code}
                                >
                                    <span>
                                        <span>
                                            {intl.locale === 'ru'
                                                ? item.nameRu
                                                : item.nameEn}
                                        </span>
                                        {item.price && (
                                            <span style={{ float: 'right' }}>
                                                €{item.price}
                                            </span>
                                        )}
                                    </span>
                                </Radio>
                            ))}
                        </RadioGroup>
                    )}
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={this.isSubmitButtonDisabled()}
                >
                    <FormattedMessage id="electricity.save" />
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
            service: Form.createFormField({
                value: (data.service && data.service.code) || 'none',
            }),
        };
    },
})(ElectricityForm);
