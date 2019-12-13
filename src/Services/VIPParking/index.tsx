import { message } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { saveVIPParking } from '../../ducks/bookedServices';

import Form from './Form';

export class VIPParking extends React.Component<any, any> {
    public render() {
        const { data } = this.props;
        return (
            <div>
                <p>
                    <FormattedMessage id="vipParking.description" />
                </p>
                <Form data={data} onSave={this.save} />
            </div>
        );
    }

    private save = (data: any) => {
        const { save, intl } = this.props;
        save(data).then((error: any) => {
            if (error) {
                message.error(
                    intl.formatMessage(
                        { id: 'vipParking.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'vipParking.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    data: bookedServices.vipParking,
});

const mapDispatchToProps = (dispatch: any) => ({
    save: (data: any) => dispatch(saveVIPParking(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(VIPParking)
);
