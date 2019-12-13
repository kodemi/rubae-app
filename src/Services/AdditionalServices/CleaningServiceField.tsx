import { DatePicker, Form, Icon } from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const ServiceField = ({ service, intl, form, onRemove }: any) => {
    return (
        <Form.Item style={{ marginBottom: 0 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div>
                    <span>
                        {service[intl.locale === 'en' ? 'nameEn' : 'nameRu']}
                    </span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <span style={{ marginRight: '0.5rem' }}>
                            <FormattedMessage id="additionalServices.date" />:
                        </span>
                        {form.getFieldDecorator(`${service.id}.date`, {
                            initialValue:
                                (service.date && moment(service.date)) || null,
                            rules: [
                                {
                                    required: true,
                                    message: intl.formatMessage({
                                        id:
                                            'additionalServices.messages.required',
                                    }),
                                },
                            ],
                        })(<DatePicker allowClear={false} locale={locale} />)}
                    </div>
                    <span
                        style={{
                            marginLeft: '1rem',
                            minWidth: '3rem',
                            display: 'inline-block',
                            textAlign: 'right',
                        }}
                    >
                        <span style={{ fontWeight: 'bold' }}>
                            €{service.amount || service.price}
                        </span>
                    </span>
                    <a
                        style={{ marginLeft: '2rem', color: 'initial' }}
                        onClick={() => onRemove(service)}
                    >
                        <Icon type="delete" />
                    </a>
                </div>
            </div>
        </Form.Item>
    );
};

export default injectIntl(ServiceField);
