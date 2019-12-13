import { Button, Card, Divider, Icon, List, Tooltip } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import images from './images';

export default ({
    equipmentGroup,
    rootGroup,
    intl,
    filter,
    onOrder,
    isDeadline,
    ...props
}: any) => {
    const nameField = intl.locale === 'ru' ? 'nameRu' : 'nameEn';
    const items = (
        (filter &&
            equipmentGroup.items.filter(
                (item: any) =>
                    item[nameField].toLowerCase().indexOf(filter) !== -1
            )) ||
        equipmentGroup.items
    ).sort((a: any, b: any) => (a.code > b.code ? 1 : -1));

    if (!items.length) {
        return null;
    }

    return (
        <div {...props}>
            <h3 style={{ marginBottom: 20 }}>{equipmentGroup[nameField]}</h3>
            <List
                grid={{ xs: 1, md: 2, xl: 3, xxl: 4 }}
                dataSource={items}
                renderItem={(item: any) => (
                    <List.Item key={item.code}>
                        <Card
                            style={{ width: 300, marginBottom: 10 }}
                            hoverable
                            cover={
                                <div
                                    style={{
                                        height: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 5,
                                    }}
                                >
                                    {!!images[`${item.code}.jpg`] ? (
                                        <img
                                            style={{
                                                maxHeight: '100%',
                                                maxWidth: '100%',
                                            }}
                                            src={images[`${item.code}.jpg`]}
                                        />
                                    ) : (
                                        <Icon
                                            type="picture"
                                            style={{
                                                fontSize: 100,
                                                color: 'lightgray',
                                            }}
                                        />
                                    )}
                                    {item.code && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 5,
                                                color: 'rgba(0, 0, 0, 0.45)',
                                            }}
                                        >
                                            {intl.formatMessage(
                                                {
                                                    id:
                                                        'additionalEquipment.itemCode',
                                                },
                                                { code: item.code }
                                            )}
                                        </div>
                                    )}
                                </div>
                            }
                        >
                            <Card.Meta
                                style={{ height: 80 }}
                                description={
                                    <div>
                                        <Tooltip title={item[nameField]}>
                                            {item[nameField]}
                                        </Tooltip>
                                    </div>
                                }
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {item.booked ? (
                                    <span
                                        style={{
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                            color: '#aaa',
                                        }}
                                    >
                                        <FormattedMessage id="additionalEquipment.available.booked" />
                                    </span>
                                ) : (
                                    !isDeadline && (
                                        <Button
                                            style={{ minWidth: 100 }}
                                            onClick={() =>
                                                onOrder(item, rootGroup)
                                            }
                                        >
                                            <FormattedMessage id="additionalEquipment.available.orderButton" />
                                        </Button>
                                    )
                                )}
                                <span
                                    style={{
                                        fontSize: '1.7rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    €{item.price}
                                </span>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
            <Divider dashed />
        </div>
    );
};
