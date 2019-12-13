import { Button, Card, List, Tooltip } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

class EquipementList extends React.Component<any, any> {
    public render() {
        const { items, intl, onOrder } = this.props;
        const nameField = intl.locale === 'ru' ? 'nameRu' : 'nameEn';

        return (
            <div>
                <h2 style={{ marginBottom: '1rem' }}>
                    <FormattedMessage id="additionalServices.available.title" />
                </h2>
                <List
                    grid={{ xs: 1, md: 2, xl: 3, xxl: 4 }}
                    dataSource={items}
                    locale={{
                        emptyText: intl.formatMessage({
                            id: 'additionalServices.noAvailableServices',
                        }),
                    }}
                    renderItem={(item: any) => (
                        <List.Item key={item.code}>
                            <Card
                                style={{ width: 300, marginBottom: 10 }}
                                hoverable
                            >
                                <Card.Meta
                                    style={{ height: 80 }}
                                    title={
                                        <div style={{ whiteSpace: 'initial' }}>
                                            {item[nameField]}
                                        </div>
                                    }
                                />
                                <div
                                    style={{
                                        marginTop: '0.5rem',
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
                                            <FormattedMessage id="additionalServices.available.booked" />
                                        </span>
                                    ) : (
                                        <Button
                                            style={{ minWidth: 100 }}
                                            onClick={() => onOrder(item)}
                                        >
                                            <FormattedMessage id="additionalServices.available.orderButton" />
                                        </Button>
                                    )}
                                    <span
                                        style={{
                                            fontSize: '1.7rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        €{item.price}
                                        {item.unitRu && (
                                            <span
                                                style={{
                                                    fontWeight: 'initial',
                                                    fontSize: 'initial',
                                                    opacity: 0.5,
                                                }}
                                            >
                                                &nbsp;/&nbsp;
                                                {
                                                    item[
                                                        intl.locale === 'en'
                                                            ? 'unitEn'
                                                            : 'unitRu'
                                                    ]
                                                }
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default injectIntl(EquipementList);
