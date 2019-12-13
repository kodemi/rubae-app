import { Button, Form, Input, Popconfirm, Select } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import countries from '../../i18n/countries';
import { NEW_BADGE_ID } from './';

const FormItem = Form.Item;
const Option = Select.Option;

const getCountries = (locale: string) => {
    const countriesArray = Object.keys(countries[locale]).map((key) => ({
        code: key,
        name: countries[locale][key],
    }));
    return countriesArray.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
};

class BadgesForm extends React.Component<any, any> {
    public render() {
        const { intl, badge, form, onCancel, onRemove } = this.props;
        const options = {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: intl.formatMessage({
                        id: 'badges.messages.required',
                    }),
                },
            ],
        };

        return (
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                style={{ minWidth: 350, maxWidth: 600 }}
            >
                <FormItem
                    label={intl.formatMessage({
                        id: 'badges.form.firstName',
                    })}
                >
                    {form.getFieldDecorator(`firstName`, {
                        ...options,
                        initialValue: badge.firstName,
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({
                        id: 'badges.form.lastName',
                    })}
                >
                    {form.getFieldDecorator(`lastName`, {
                        ...options,
                        initialValue: badge.lastName,
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({
                        id: 'badges.form.country',
                    })}
                >
                    {form.getFieldDecorator(`country`, {
                        ...options,
                        initialValue: badge.country,
                    })(
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            optionFilterProp="children"
                            notFoundContent={intl.formatMessage({
                                id: 'badges.form.countryNotFound',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'badges.form.countryPlaceholder',
                            })}
                            filterOption={(input, option) =>
                                (option.props.children as any)
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {getCountries(intl.locale).map((item) => (
                                <Option key={item.code}>{item.name}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>

                <div style={{ display: 'flex' }}>
                    <Button onClick={onCancel} style={{ marginRight: 10 }}>
                        <FormattedMessage id="badges.cancel" />
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.isSubmitButtonDisabled()}
                    >
                        <FormattedMessage id="badges.save" />
                    </Button>
                    {badge.id !== NEW_BADGE_ID && (
                        <Popconfirm
                            title={intl.formatMessage({
                                id: 'badges.messages.removeConfirm',
                            })}
                            okText={intl.formatMessage({
                                id: 'badges.messages.removeConfirmOk',
                            })}
                            cancelText={intl.formatMessage({
                                id: 'badges.messages.removeConfirmCancel',
                            })}
                            onConfirm={() => onRemove(badge)}
                        >
                            <Button
                                type="danger"
                                style={{ marginLeft: 'auto' }}
                            >
                                <FormattedMessage id="badges.form.remove" />
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
                    this.props.onSubmit({ ...values, id: this.props.badge.id });
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
        mapPropsToFields({ badge }: any) {
            return {
                firstName: Form.createFormField({ value: badge.firstName }),
                lastName: Form.createFormField({ value: badge.lastName }),
                country: Form.createFormField({ value: badge.country }),
                type: Form.createFormField({ value: badge.type }),
                value: Form.createFormField({ value: badge.value }),
            };
        },
    })(BadgesForm)
);
