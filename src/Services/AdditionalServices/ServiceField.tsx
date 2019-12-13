import { Form, Icon, InputNumber } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';

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
                {' '}
                <div>
                    <span>
                        {service[intl.locale === 'en' ? 'nameEn' : 'nameRu']}
                    </span>
                </div>
                <span style={{ marginLeft: '1rem' }}>
                    <span style={{ marginRight: 10 }}>€{service.price} ×</span>
                    {form.getFieldDecorator(`${service.id}`, {
                        initialValue: service.value,
                    })(<InputNumber min={0} style={{ maxWidth: 55 }} />)}
                    <span style={{ marginLeft: 10 }}>=</span>
                    <span
                        style={{
                            minWidth: '3rem',
                            display: 'inline-block',
                            textAlign: 'right',
                            fontWeight: 'bold',
                        }}
                    >
                        €{service.value * service.price}
                    </span>
                    <a
                        style={{ marginLeft: '2rem', color: 'initial' }}
                        onClick={() => onRemove(service)}
                    >
                        <Icon type="delete" />
                    </a>
                </span>
            </div>
        </Form.Item>
    );
};

export default injectIntl(ServiceField);
