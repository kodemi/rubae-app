import { Alert, Button, Icon, InputNumber, List, message } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { saveBadge as _saveBadge } from '../../ducks/bookedServices';

import Form from './Form';
import View from './View';

export const NEW_BADGE_ID = 'NEW_BADGE';

export class Badges extends React.Component<any, any> {
    public state = {
        editing: null,
        newBadge: null,
    };

    public render() {
        const { intl, data, isDeadline } = this.props;
        const { quota, guestValue, price } = data;
        const { newBadge } = this.state;
        const items = data.items.sort((a: any, b: any) =>
            a.firstName > b.firstName ? 1 : -1
        );

        return (
            <div>
                <h3>
                    {items.length ? (
                        <FormattedMessage
                            id="badges.totalCount"
                            values={{ count: guestValue + items.length }}
                        />
                    ) : (
                        <FormattedMessage id="badges.noBadges" />
                    )}
                </h3>
                {!!items.length && (
                    <h3>
                        <FormattedMessage
                            id="badges.totalAmount"
                            values={{ total: this.getTotal() }}
                        />
                    </h3>
                )}
                <h3>
                    <FormattedMessage id="badges.price" values={{ price }} />
                </h3>
                <Alert
                    style={{ marginBottom: '2rem', marginTop: '1rem' }}
                    type="info"
                    message={intl.formatMessage(
                        { id: 'badges.quotaMessage' },
                        { quota }
                    )}
                />
                <div style={{ marginBottom: '2rem' }}>
                    <span style={{ marginRight: '1rem' }}>
                        <FormattedMessage id="badges.guestValue" />:
                    </span>
                    <InputNumber
                        disabled={isDeadline}
                        value={guestValue}
                        onChange={this.handleGuestValueChange}
                        min={0}
                        style={{ maxWidth: 55 }}
                    />
                </div>

                {!isDeadline && (
                    <Button
                        disabled={!!newBadge}
                        type="dashed"
                        onClick={this.addBadge}
                        style={{ marginBottom: '1rem' }}
                    >
                        <Icon type="plus" />
                        <FormattedMessage id="badges.addBadge" />
                    </Button>
                )}

                {(!!items.length || newBadge) && (
                    <List
                        dataSource={newBadge ? [newBadge, ...items] : items}
                        renderItem={this.renderBadge}
                    />
                )}
            </div>
        );
    }

    private getTotal = () => {
        const {
            data: { quota, items, price, guestValue },
        } = this.props;
        return (guestValue + items.length - quota) * price;
    };

    private handleGuestValueChange = (value: any) => {
        this.saveBadge({
            value,
            guest: true,
        });
    };

    private renderBadge = (badge: any) => {
        const { editing } = this.state;
        const { isDeadline } = this.props;
        return badge.id === editing ? (
            <List.Item style={{ paddingBottom: 20, paddingTop: 20 }}>
                <Form
                    badge={badge}
                    onSubmit={this.saveBadge}
                    onCancel={this.setEditing}
                    onRemove={this.handleRemove}
                />
            </List.Item>
        ) : (
            <View
                badge={badge}
                onEdit={this.setEditing}
                isDeadline={isDeadline}
            />
        );
    };

    private setEditing = (badge?: any) => {
        this.setState({ editing: badge ? badge.id : null, newBadge: null });
    };

    private addBadge = () => {
        this.setState({
            newBadge: { id: NEW_BADGE_ID },
            editing: NEW_BADGE_ID,
        });
    };

    private handleRemove = (badge: any) => {
        this.setEditing();
        if (badge.id === NEW_BADGE_ID) {
            return;
        }
        this.saveBadge({ ...badge, removed: true });
    };

    private saveBadge = (data: any) => {
        const { saveBadge, intl } = this.props;
        this.setEditing();
        saveBadge({
            ...data,
            id: data.id === NEW_BADGE_ID ? undefined : data.id,
        }).then((error: any) => {
            if (error) {
                message.error(
                    intl.formatMessage({ id: 'badges.messages.saveError' }, 10)
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'badges.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    data: bookedServices.badges,
});

const mapDispatchToProps = (dispatch: any) => ({
    saveBadge: (data: any) => dispatch(_saveBadge(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Badges)
);
