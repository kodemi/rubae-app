import { Form, Icon, InputNumber } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import images from './images';

const EquipmentField = ({
    service,
    intl,
    form,
    onRemove,
    onChange,
    disabled,
}: any) => {
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
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            height: 50,
                            display: 'inline-block',
                            marginRight: '1rem',
                        }}
                    >
                        {!!images[`${service.code}.jpg`] ? (
                            <img
                                style={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                }}
                                src={images[`${service.code}.jpg`]}
                            />
                        ) : (
                            <Icon
                                type="picture"
                                style={{
                                    fontSize: 50,
                                    color: 'lightgray',
                                }}
                            />
                        )}
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>
                            {
                                service[
                                    intl.locale === 'en' ? 'nameEn' : 'nameRu'
                                ]
                            }{' '}
                            [
                            <FormattedMessage
                                id="additionalEquipment.itemCode"
                                values={{ code: service.code }}
                            />
                            ]
                        </div>
                        <div>
                            {
                                service.rootGroup[
                                    intl.locale === 'en' ? 'nameEn' : 'nameRu'
                                ]
                            }
                        </div>
                    </div>
                </div>
                <span style={{ marginLeft: '1rem', minWidth: 230 }}>
                    <span style={{ marginRight: 10 }}>€{service.price} ×</span>
                    {form.getFieldDecorator(
                        `values.${service.rootGroup.code}_${service.code}`,
                        {
                            initialValue: service.value,
                        }
                    )(
                        <InputNumber
                            disabled={disabled}
                            min={0}
                            style={{ maxWidth: 55 }}
                            onChange={onChange}
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
                        €{service.value * service.price}
                    </span>
                    {!disabled && (
                        <a
                            style={{ marginLeft: '2rem', color: 'initial' }}
                            onClick={() => onRemove(service)}
                        >
                            <Icon type="delete" />
                        </a>
                    )}
                </span>
            </div>
        </Form.Item>
    );
};

export default injectIntl(EquipmentField);
