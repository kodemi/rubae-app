import { Alert, message } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import deadlines from '../../data/deadlines.json';
import { saveElectricity as _saveElectricity } from '../../ducks/bookedServices';
import Form from './Form';

export class Electricity extends React.Component<any, any> {
    public render() {
        const {
            intl,
            data,
            loading,
            stand: { area: standArea, type: standType },
        } = this.props;
        const deadline = moment(
            deadlines.find(({ id }: any) => id === 'electricity').date
        ).format('LL');
        const afterDeadlinePowerSupply =
            standArea <= 25
                ? 3
                : standArea <= 50
                    ? 5
                    : standArea <= 100
                        ? 10
                        : 25;

        return (
            <div>
                <Form
                    intl={intl}
                    data={data}
                    loading={loading}
                    standType={standType}
                    onSubmit={this.saveElectricity}
                />
                {standType === 'spaceOnly' && (
                    <Alert
                        style={{ marginTop: '2rem' }}
                        type="warning"
                        message={intl.formatMessage(
                            {
                                id: 'electricity.afterDeadlineNotice',
                            },
                            {
                                value: afterDeadlinePowerSupply,
                                deadline,
                            }
                        )}
                    />
                )}
            </div>
        );
    }

    private saveElectricity = (data: any) => {
        const {
            saveElectricity,
            intl,
            data: { services },
        } = this.props;
        saveElectricity({
            service: {
                ...services.find(({ code }: any) => data.service === code),
                value: 1,
            },
        }).then((error: any) => {
            if (error) {
                message.error(
                    intl.formatMessage(
                        { id: 'electricity.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'electricity.messages.saveSuccess',
                    })
                );
            }
        });
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    data: {
        services: bookedServices.electricity.services,
        service: bookedServices.electricity.service,
    },
    stand: bookedServices.stand,
    loading: bookedServices.electricity.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
    saveElectricity: (data: any) => dispatch(_saveElectricity(data)),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Electricity)
);
