import { message } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { saveCatalogue as _saveCatalogue } from '../../ducks/bookedServices';
import Form from './Form';
import View from './View';

class Catalogue extends React.Component<any, any> {
    public state = {
        editing: false,
    };

    public render() {
        const { intl, data, loading, isDeadline } = this.props;
        const { editing } = this.state;

        return !editing ? (
            <View
                data={data}
                locale={intl.locale}
                isDeadline={isDeadline}
                onEdit={this.handleEdit}
            />
        ) : (
            <Form
                intl={intl}
                data={data}
                loading={loading}
                onSubmit={this.saveCatalogue}
                onCancel={this.handleCancel}
            />
        );
    }

    private handleEdit = () => {
        this.setState({ editing: true });
    };

    private handleCancel = () => {
        this.setState({ editing: false });
    };

    private saveCatalogue = (data: any) => {
        const { saveCatalogue, intl } = this.props;
        this.setState({ editing: false });
        saveCatalogue(data).then((error: any) => {
            if (error) {
                message.error(
                    intl.formatMessage(
                        { id: 'catalogue.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'catalogue.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = (state: any) => ({
    data: {
        ...state.bookedServices.catalogue,
    },
    loading: state.bookedServices.catalogue.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
    saveCatalogue: (data: any) => dispatch(_saveCatalogue(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Catalogue)
);
