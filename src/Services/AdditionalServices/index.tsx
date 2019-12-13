import { Divider, message } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
    getAdditionalServices,
    orderAdditionalService as _orderAdditionalService,
    removeAdditionalService as _removeAdditionalService,
    resetBookedAdditionalServices as _resetBookedAdditionalServices,
    saveAdditionalServices as _saveAdditionalServices,
    updateAdditionalService as _updateAdditionalService,
} from '../../ducks/bookedServices';

import BookedServices from './BookedServices';
import ServicesList from './ServicesList';

let newOrderId = 1;

function getNewOrderId() {
    return `NEW_ORDER_${newOrderId++}`;
}

export class AdditionalServices extends React.Component<any, any> {
    public componentDidMount() {
        if (!this.props.services.loaded) {
            this.props.getAdditionalServices();
        }
    }

    public render() {
        const { services, resetBookedAdditionalServices } = this.props;
        const booked = services.booked.filter(({ removed }: any) => !removed);

        return (
            <div>
                <BookedServices
                    items={booked}
                    empty={services.empty}
                    saving={services.saving}
                    onSave={this.handleSave}
                    resetBookedEquipment={resetBookedAdditionalServices}
                    onRemove={this.handleRemove}
                    onChange={this.handleChange}
                />
                <Divider dashed />
                <ServicesList
                    items={services.items}
                    loading={services.loading}
                    onOrder={this.handleOrder}
                />
            </div>
        );
    }

    private handleSave = (data: any) => {
        const { intl, saveAdditionalServices } = this.props;
        saveAdditionalServices().then((error: any) => {
            if (error) {
                console.log(error); //tslint:disable-line
                message.error(
                    intl.formatMessage(
                        { id: 'additionalServices.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'additionalServices.messages.saveSuccess',
                    })
                );
            }
        });
    };

    private handleChange = (data: any) => {
        const id = Object.keys(data)[0];
        const payload = isNaN(data[id]) ? { ...data[id] } : { value: data[id] };
        this.props.updateAdditionalService({ id, ...payload });
    };

    private handleOrder = (item: any) => {
        this.props.orderAdditionalService({
            ...item,
            id: getNewOrderId(),
            value: 1,
        });
    };

    private handleRemove = (item: any) => {
        this.props.removeAdditionalService(item);
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    services: {
        ...bookedServices.additionalServices,
    },
    standArea: bookedServices.stand.area,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAdditionalServices: () => dispatch(getAdditionalServices()),
    orderAdditionalService: (data: any) =>
        dispatch(_orderAdditionalService(data)),
    removeAdditionalService: (data: any) =>
        dispatch(_removeAdditionalService(data)),
    updateAdditionalService: (data: any) =>
        dispatch(_updateAdditionalService(data)),
    saveAdditionalServices: () => dispatch(_saveAdditionalServices()),
    resetBookedAdditionalServices: () =>
        dispatch(_resetBookedAdditionalServices()),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdditionalServices)
);
