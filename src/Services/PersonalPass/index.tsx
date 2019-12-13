import { Button, Icon, List, message } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { savePersonalPass as _savePersonalPass } from '../../ducks/bookedServices';

import Form from './Form';
import View from './View';

export const NEW_PASS_ID = 'NEW_PASS_ID';

export class PersonalPass extends React.Component<any, any> {
    public state = {
        editing: null,
        newPass: null,
    };

    public render() {
        const { data, isDeadline } = this.props;
        const { newPass } = this.state;
        const items = data.items.sort(
            (a: any, b: any) => (a.fullName > b.fullName ? 1 : -1)
        );

        return (
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <h3>
                        {items.length ? (
                            <FormattedMessage
                                id="personalPass.totalCount"
                                values={{ count: items.length }}
                            />
                        ) : (
                            <FormattedMessage id="personalPass.noPasses" />
                        )}
                    </h3>
                    {!!items.length && (
                        <h3>
                            <FormattedMessage
                                id="personalPass.totalAmount"
                                values={{ total: this.getTotal() }}
                            />
                        </h3>
                    )}
                </div>
                <p>
                    <FormattedMessage
                        id="personalPass.passCost"
                        values={{ price: data.services.pass.price }}
                    />
                </p>
                {!isDeadline && (
                    <Button
                        disabled={!!newPass}
                        type="dashed"
                        onClick={this.addPass}
                        style={{ marginBottom: '1rem' }}
                    >
                        <Icon type="plus" />
                        <FormattedMessage id="personalPass.addPass" />
                    </Button>
                )}
                {(!!items.length || newPass) && (
                    <List
                        dataSource={newPass ? [newPass, ...items] : items}
                        renderItem={this.renderPass}
                    />
                )}
            </div>
        );
    }

    private getTotal = () => {
        const {
            data: { items },
        } = this.props;
        return items.reduce((sum: number, item: any) => sum + item.amount, 0);
    };

    private renderPass = (pass: any) => {
        const { editing } = this.state;
        const { isDeadline, data } = this.props;
        return pass.id === editing ? (
            <List.Item style={{ paddingBottom: 20, paddingTop: 20 }}>
                <Form
                    pass={pass}
                    services={data.services}
                    onSubmit={this.savePass}
                    onCancel={this.setEditing}
                    onRemove={this.handleRemove}
                />
            </List.Item>
        ) : (
            <View
                pass={pass}
                onEdit={this.setEditing}
                isDeadline={isDeadline}
            />
        );
    };

    private setEditing = (pass?: any) => {
        this.setState({ editing: pass ? pass.id : null, newPass: null });
    };

    private addPass = () => {
        this.setState({
            newPass: { id: NEW_PASS_ID },
            editing: NEW_PASS_ID,
        });
    };

    private handleRemove = (pass: any) => {
        this.setEditing();
        if (pass.id === NEW_PASS_ID) {
            return;
        }
        this.savePass({ ...pass, removed: true });
    };

    private savePass = (data: any) => {
        const { savePass, intl } = this.props;
        this.setEditing();
        savePass({
            ...data,
            id: data.id === NEW_PASS_ID ? undefined : data.id,
        }).then((error: any) => {
            if (error) {
                message.error(
                    intl.formatMessage(
                        { id: 'personalPass.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'personalPass.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    data: bookedServices.personalPasses,
});

const mapDispatchToProps = (dispatch: any) => ({
    savePass: (data: any) => dispatch(_savePersonalPass(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PersonalPass)
);
