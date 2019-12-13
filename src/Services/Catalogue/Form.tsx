import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import LogoPreviewField from './components/LogoPreviewField';
import LogoUploadField from './components/LogoUploadField';
import ServiceField from './components/ServiceField';

import countries from '../../i18n/countries';

const FormItem = Form.Item;
const Option = Select.Option;

class CatalogueForm extends React.Component<any, any> {
    public state = {
        touched: false,
    };

    public render() {
        const { intl, loading, form, onCancel } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const logo = getFieldValue('logo');
        const logoVector = getFieldValue('logoVector');

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Row gutter={32} type="flex">
                    <Col>
                        {logo && !Array.isArray(logo) ? (
                            <LogoPreviewField
                                name="logo"
                                data={logo}
                                form={form}
                                intl={intl}
                                onChange={this.touch}
                            />
                        ) : (
                            <LogoUploadField
                                name="logo"
                                form={form}
                                intl={intl}
                                onChange={this.touch}
                                rules={[
                                    {
                                        message: intl.formatMessage({
                                            id: 'catalogue.messages.logoType',
                                        }),
                                        validator: this.logoTypeValidator,
                                    },
                                    {
                                        message: intl.formatMessage({
                                            id: 'catalogue.messages.logoSize',
                                        }),
                                        validator: this.logoSizeValidator,
                                    },
                                ]}
                            />
                        )}
                    </Col>
                    <Col>
                        {logoVector && !Array.isArray(logoVector) ? (
                            <LogoPreviewField
                                name="logoVector"
                                data={logoVector}
                                form={form}
                                intl={intl}
                                onChange={this.touch}
                            />
                        ) : (
                            <LogoUploadField
                                name="logoVector"
                                form={form}
                                intl={intl}
                                onChange={this.touch}
                                rules={[
                                    {
                                        message: intl.formatMessage({
                                            id:
                                                'catalogue.messages.logoVectorType',
                                        }),
                                        validator: this.logoVectorTypeValidator,
                                    },
                                ]}
                            />
                        )}
                    </Col>
                </Row>
                <Divider dashed />
                <FormItem
                    label={intl.formatMessage({ id: 'catalogue.nameEn' })}
                >
                    {getFieldDecorator('en.name')(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'catalogue.nameRu' })}
                >
                    {getFieldDecorator('ru.name')(<Input />)}
                </FormItem>
                <Divider dashed />
                <FormItem
                    label={intl.formatMessage({
                        id: 'catalogue.descriptionEn',
                    })}
                    extra={intl.formatMessage({
                        id: 'catalogue.descriptionEnExtra',
                    })}
                >
                    {getFieldDecorator('en.description', {
                        rules: [
                            {
                                max: 1000,
                                message: intl.formatMessage({
                                    id:
                                        'catalogue.messages.descriptionMaxLength',
                                }),
                            },
                        ],
                    })(
                        <Input.TextArea
                            autosize={{ minRows: 3 }}
                            maxLength={1000}
                        />
                    )}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({
                        id: 'catalogue.descriptionRu',
                    })}
                    extra={intl.formatMessage({
                        id: 'catalogue.descriptionRuExtra',
                    })}
                >
                    {getFieldDecorator('ru.description', {
                        rules: [
                            {
                                max: 1000,
                                message: intl.formatMessage({
                                    id:
                                        'catalogue.messages.descriptionMaxLength',
                                }),
                            },
                        ],
                    })(
                        <Input.TextArea
                            autosize={{ minRows: 3 }}
                            maxLength={1000}
                        />
                    )}
                </FormItem>
                <Divider dashed />
                <h3>
                    <FormattedMessage id="catalogue.contacts" />
                </h3>
                <FormItem
                    label={intl.formatMessage({ id: 'catalogue.country' })}
                >
                    {getFieldDecorator('country')(
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            optionFilterProp="children"
                            notFoundContent={intl.formatMessage({
                                id: 'catalogue.countryNotFound',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'catalogue.countryPlaceholder',
                            })}
                            filterOption={(input, option) =>
                                (option.props.children as any)
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.getCountries(intl.locale).map((item) => (
                                <Option key={item.code}>{item.name}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'catalogue.cityEn' })}
                >
                    {getFieldDecorator('en.city')(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'catalogue.cityRu' })}
                >
                    {getFieldDecorator('ru.city')(<Input />)}
                </FormItem>
                <FormItem label={intl.formatMessage({ id: 'catalogue.tel' })}>
                    {getFieldDecorator('tel', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({
                                    id: 'catalogue.messages.required',
                                }),
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label={intl.formatMessage({ id: 'catalogue.email' })}>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({
                                    id: 'catalogue.messages.required',
                                }),
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label={intl.formatMessage({ id: 'catalogue.website' })}
                >
                    {getFieldDecorator('website')(<Input />)}
                </FormItem>

                <Divider dashed />
                <h3>
                    <FormattedMessage id="catalogue.services" />
                </h3>
                <ServiceField
                    locale={intl.locale}
                    service="catalogueAdPage05"
                    form={form}
                />
                <ServiceField
                    locale={intl.locale}
                    service="catalogueAdPage1"
                    form={form}
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={this.isSubmitButtonDisabled()}
                >
                    <FormattedMessage id="catalogue.save" />
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: 10 }}>
                    <FormattedMessage id="catalogue.cancel" />
                </Button>
            </Form>
        );
    }

    private isSubmitButtonDisabled = () => {
        return !(this.state.touched || this.props.form.isFieldsTouched());
    };

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

    private getCountries = (locale: string) => {
        const countriesArray = Object.keys(countries[locale]).map((key) => ({
            code: key,
            name: countries[locale][key],
        }));
        return countriesArray.sort(
            (a: any, b: any) => (a.name > b.name ? 1 : -1)
        );
    };

    private logoTypeValidator = (rule: any, value: any, callback: any) => {
        if (!value) {
            return callback();
        }
        const isPNG = value[0].type === 'image/png';
        if (!isPNG) {
            callback(false);
        }
        callback();
    };

    private logoSizeValidator = (rule: any, value: any, callback: any) => {
        if (!value) {
            return callback();
        }
        const isLt300KB = value[0].size / 1024 < 150;
        if (!isLt300KB) {
            callback(false);
        }
        callback();
    };

    private logoVectorTypeValidator = (
        rule: any,
        value: any,
        callback: any
    ) => {
        if (!value) {
            return callback();
        }
        const type = value[0].type;
        const allowedTypes = [
            'image/svg+xml',
            'application/postscript',
            'image/x-coreldraw',
            'application/cdr',
            'application/coreldraw',
            'application/x-cdr',
            'application/x-coreldraw',
            'image/cdr',
            'image/x-cdr',
        ];
        if (allowedTypes.indexOf(type) === -1) {
            callback(false);
        }
        callback();
    };

    private touch = () => {
        this.setState({ touched: true });
    };
}

export default Form.create({
    mapPropsToFields({ data }: any) {
        return {
            en: {
                name: Form.createFormField({ value: data.en.name }),
                description: Form.createFormField({
                    value: data.en.description,
                }),
                city: Form.createFormField({ value: data.en.city }),
            },
            ru: {
                name: Form.createFormField({ value: data.ru.name }),
                description: Form.createFormField({
                    value: data.ru.description,
                }),
                city: Form.createFormField({ value: data.ru.city }),
            },
            country: Form.createFormField({ value: data.country }),
            tel: Form.createFormField({ value: data.tel }),
            email: Form.createFormField({ value: data.email }),
            website: Form.createFormField({ value: data.website }),
            services: {
                catalogueAdPage05: Form.createFormField({
                    value: data.services.catalogueAdPage05,
                }),
                catalogueAdPage1: Form.createFormField({
                    value: data.services.catalogueAdPage1,
                }),
            },
            logo: Form.createFormField({
                value: data.logo,
            }),
            logoVector: Form.createFormField({ value: data.logoVector }),
        };
    },
})(CatalogueForm);
