import { Button, Icon, List, message } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { saveAutoPass as _saveAutoPass } from '../../ducks/bookedServices';

import Form from './Form';
import View from './View';

export const NEW_PASS_ID = 'NEW_PASS_ID';

export class AutoPass extends React.Component<any, any> {
    public state = {
        editing: null,
        newPass: null,
    };

    public render() {
        const { intl, data, isDeadline } = this.props;
        const { newPass } = this.state;
        const nameField = intl.locale === 'ru' ? 'nameRu' : 'nameEn';
        const items = data.items.sort((a: any, b: any) =>
            a.type[nameField] > b.type[nameField] ? 1 : -1
        );

        return (
            <div>
                <FormattedMessage id="autoPass.description" tagName="p" />
                <div style={{ marginBottom: '2rem' }}>
                    <h3>
                        {items.length ? (
                            <FormattedMessage
                                id="autoPass.totalCount"
                                values={{ count: items.length }}
                            />
                        ) : (
                            <FormattedMessage id="autoPass.noPasses" />
                        )}
                    </h3>
                    {!!items.length && (
                        <h3>
                            <FormattedMessage
                                id="autoPass.totalAmount"
                                values={{ total: this.getTotal() }}
                            />
                        </h3>
                    )}
                </div>
                {!isDeadline && (
                    <Button
                        disabled={!!newPass}
                        type="dashed"
                        onClick={this.addPass}
                        style={{ marginBottom: '1rem' }}
                    >
                        <Icon type="plus" />
                        <FormattedMessage id="autoPass.addPass" />
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
        return items.reduce(
            (sum: number, item: any) => sum + item.type.price,
            0
        );
    };

    private renderPass = (pass: any) => {
        const { editing } = this.state;
        const {
            isDeadline,
            data: { types },
        } = this.props;
        return pass.id === editing ? (
            <List.Item style={{ paddingBottom: 20, paddingTop: 20 }}>
                <Form
                    pass={pass}
                    passTypes={types}
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
                        { id: 'autoPass.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'autoPass.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    data: bookedServices.autoPasses,
});

const mapDispatchToProps = (dispatch: any) => ({
    savePass: (data: any) => dispatch(_saveAutoPass(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AutoPass)
);
