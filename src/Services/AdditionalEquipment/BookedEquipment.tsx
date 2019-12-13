import { Button, Divider, Form } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import EquipmentField from './EquipmentField';

class BookedEquipment extends React.Component<any, any> {
    public componentDidMount() {
        this.props.resetBookedEquipment();
    }

    public render() {
        const { intl, form, saving, empty, isDeadline } = this.props;
        const items = form.getFieldValue('equipment');

        return (
            <div>
                <h2 style={{ marginBottom: '1rem' }}>
                    <FormattedMessage id="additionalEquipment.booked.title" />
                </h2>
                {empty && !items.length ? (
                    <div>
                        <FormattedMessage id="additionalEquipment.booked.empty" />
                    </div>
                ) : (
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        {items.map((item: any) => (
                            <div key={`${item.rootGroup.code}_${item.code}`}>
                                <EquipmentField
                                    disabled={isDeadline}
                                    service={item}
                                    intl={intl}
                                    form={form}
                                    onRemove={this.handleRemove}
                                />
                                <Divider style={{ margin: '10px 0' }} />
                            </div>
                        ))}
                        {!items.length && (
                            <div>
                                <FormattedMessage id="additionalEquipment.booked.allRemoved" />
                            </div>
                        )}
                        {!isDeadline && (
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={saving}
                                // disabled={this.isSubmitButtonDisabled()}
                                style={{ marginTop: 14 }}
                            >
                                <FormattedMessage id="additionalEquipment.booked.save" />
                            </Button>
                        )}
                    </Form>
                )}
            </div>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            this.props.onSave(values.values);
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
                equipment: Form.createFormField({ value: items }),
            };
        },
        onFieldsChange(props: any, fields: any) {
            if (props.isDeadline) {
                return;
            }
            props.onChange(fields.values);
        },
    })(BookedEquipment)
);
