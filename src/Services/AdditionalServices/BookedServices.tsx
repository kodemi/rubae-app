import { Button, Divider, Form } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import CleaningServiceField from './CleaningServiceField';
import ServiceField from './ServiceField';

class BookedServices extends React.Component<any, any> {
    public render() {
        const { form, saving, empty } = this.props;
        const items = form.getFieldValue('services');

        return (
            <div>
                <h2 style={{ marginBottom: '1rem' }}>
                    <FormattedMessage id="additionalServices.booked.title" />
                </h2>
                {empty && !items.length ? (
                    <div>
                        <FormattedMessage id="additionalServices.booked.empty" />
                    </div>
                ) : (
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        {items.map(this.renderItem)}
                        {!items.length && (
                            <div>
                                <FormattedMessage id="additionalServices.booked.allRemoved" />
                            </div>
                        )}
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={saving}
                            // disabled={this.isSubmitButtonDisabled()}
                            style={{ marginTop: 14 }}
                        >
                            <FormattedMessage id="additionalServices.booked.save" />
                        </Button>
                    </Form>
                )}
            </div>
        );
    }

    private renderItem = (item: any) => {
        const { intl, form } = this.props;
        const Component =
            item.code === 'cleaning' ? CleaningServiceField : ServiceField;
        return (
            <div key={item.id}>
                <Component
                    service={item}
                    intl={intl}
                    form={form}
                    onRemove={this.handleRemove}
                />
                <Divider style={{ margin: '10px 0' }} />
            </div>
        );
    };

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.props.onSave(values.values);
            }
        });
    };

    private isSubmitButtonDisabled = () => {
        return !this.props.form.isFieldsTouched();
    };

    private handleRemove = (item: any) => {
        this.props.onRemove(item);
    };
}

export default injectIntl<any>(
    Form.create({
        mapPropsToFields({ items }: any) {
            return {
                services: Form.createFormField({ value: items }),
            };
        },
        onValuesChange(props, changedValues) {
            props.onChange(changedValues);
        },
    })(BookedServices)
);
