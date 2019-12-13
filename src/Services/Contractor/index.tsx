import { message } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { saveContractor as _saveContractor } from '../../ducks/bookedServices';
import Form from './Form';
import View from './View';

export class Contractor extends React.Component<any, any> {
    public render() {
        const { intl, data, loading } = this.props;

        if (data.sent) {
            return <View data={data} locale={intl.locale} />;
        }
        return (
            <Form
                intl={intl}
                data={data}
                loading={loading}
                onSubmit={this.saveContractor}
            />
        );
    }

    private saveContractor = (data: any) => {
        const { saveContractor, intl } = this.props;
        saveContractor(data).then((error: any) => {
            if (error) {
                message.error(
                    intl.formatMessage(
                        { id: 'contractor.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'contractor.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = (state: any) => ({
    data: {
        ...state.bookedServices.contractor,
    },
    loading: state.bookedServices.contractor.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
    saveContractor: (data: any) => dispatch(_saveContractor(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Contractor)
);
