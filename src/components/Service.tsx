import { List } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const moneyStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '110%',
    marginLeft: '1rem',
};

const valueStyle: React.CSSProperties = {
    color: '#aaa',
};

const AmountLabel = ({ amount, unit, price, value }: any) => (
    <span>
        <span style={valueStyle}>
            {value} <FormattedMessage id={`units.${unit}`} /> × €{price} =
        </span>
        <span style={moneyStyle}>€{amount}</span>
    </span>
);

export default class Service extends React.Component<any, any> {
    public render() {
        const { locale } = this.props;
        const {
            nameRu,
            nameEn,
            amount,
            price,
            value,
            unit,
            code,
            date,
        } = this.props.data;
        const title =
            (locale === 'en' ? nameEn : nameRu) +
            (date ? ` (${moment(date).format('LL')})` : '');

        return (
            <List.Item>
                <List.Item.Meta title={title} />
                {code === 'cleaning' ? (
                    <span style={moneyStyle}>€{amount}</span>
                ) : (
                    <AmountLabel
                        amount={amount}
                        price={price}
                        unit={unit}
                        value={value}
                    />
                )}
            </List.Item>
        );
    }
}
