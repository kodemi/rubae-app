import { Form, InputNumber } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';

const services = {
    catalogueAdPage05: {
        nameRu: 'Реклама в официальном каталоге 1/2 полоса',
        nameEn: 'RUBAE catalogue AD 1/2 page',
        price: 1360,
    },
    catalogueAdPage1: {
        nameRu: 'Реклама в официальном каталоге 1/1 полоса',
        nameEn: 'RUBAE catalogue AD 1/1 page',
        price: 3260,
    },
};

const ServiceField = ({ service, intl, form }: any) => (
    <Form.Item>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {services[service][intl.locale === 'en' ? 'nameEn' : 'nameRu']}
            <span style={{ marginLeft: '1rem' }}>
                <span style={{ marginRight: 10 }}>
                    €{services[service].price} ×
                </span>
                {form.getFieldDecorator(`services.${service}`)(
                    <InputNumber min={0} />
                )}
                <span style={{ marginLeft: 10 }}>=</span>
                <span
                    style={{
                        minWidth: '3rem',
                        display: 'inline-block',
                        textAlign: 'right',
                    }}
                >
                    €{form.getFieldValue(`services.${service}`) *
                        services[service].price}
                </span>
            </span>
        </div>
    </Form.Item>
);

export default injectIntl(ServiceField);
