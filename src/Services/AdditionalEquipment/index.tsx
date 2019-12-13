import { Divider, message } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
    getEquipment,
    orderEquipment as _orderEquipment,
    removeEquipment as _removeEquipment,
    resetBookedEquipment as _resetBookedEquipment,
    saveEquipment as _saveEquipment,
    updateEquipment as _updateEquipment,
} from '../../ducks/bookedServices';

import BookedEquipment from './BookedEquipment';
import EquipmentList from './EquipmentList';

export class AdditionalEquipment extends React.Component<any, any> {
    public componentDidMount() {
        if (!this.props.equipment.loaded) {
            this.props.getEquipment();
        }
    }

    public render() {
        const { equipment, resetBookedEquipment, isDeadline } = this.props;
        // const items = equipment.items.map((group: any) => ({
        //     ...group,
        //     items: group.items.map((item: any) => ({
        //         ...item,
        //         booked: !!equipment.booked.find(
        //             ({ code }: any) => item.code === code
        //         ),
        //     })),
        // }));

        return (
            <div>
                <BookedEquipment
                    isDeadline={isDeadline}
                    items={equipment.booked}
                    empty={equipment.empty}
                    saving={equipment.saving}
                    onSave={this.handleSave}
                    resetBookedEquipment={resetBookedEquipment}
                    onRemove={this.handleRemove}
                    onChange={this.handleChange}
                />
                <Divider dashed />
                <EquipmentList
                    isDeadline={isDeadline}
                    items={equipment.items}
                    loading={equipment.loading}
                    onOrder={this.handleOrder}
                />
            </div>
        );
    }

    private handleSave = (data: any) => {
        const { intl, saveEquipment } = this.props;
        const bookedEquipment = data
            ? Object.keys(data).map((key: string) => {
                  const [rootGroupCode, code] = key.split('_');
                  return {
                      ...this.getEquipmentByCode(rootGroupCode, code),
                      value: data[key],
                  };
              })
            : [];
        saveEquipment(bookedEquipment).then((error: any) => {
            if (error) {
                console.log(error); //tslint:disable-line
                message.error(
                    intl.formatMessage(
                        { id: 'additionalEquipment.messages.saveError' },
                        10
                    )
                );
            } else {
                message.success(
                    this.props.intl.formatMessage({
                        id: 'additionalEquipment.messages.saveSuccess',
                    })
                );
            }
        });
    };

    private handleChange = (data: any) => {
        const bookedEquipment = Object.keys(data).map((key: string) => {
            const [rootGroupCode, code] = key.split('_');
            return {
                ...this.getEquipmentByCode(rootGroupCode, code),
                value: data[key].value,
            };
        });
        this.props.updateEquipment(bookedEquipment[0]);
    };

    private handleOrder = (item: any, rootGroup: any) => {
        this.props.orderEquipment(item, rootGroup);
    };

    private handleRemove = (item: any) => {
        this.props.removeEquipment(item);
    };

    private getEquipmentByCode = (rootGroupCode: string, code: string) => {
        const { equipment } = this.props;
        for (const rootGroup of equipment.items) {
            if (rootGroup.code === rootGroupCode) {
                for (const group of rootGroup.items) {
                    for (const item of group.items) {
                        if (item.code === code) {
                            return item;
                        }
                    }
                }
            }
        }
    };
}

const mapStateToProps = ({ bookedServices }: any) => ({
    equipment: {
        ...bookedServices.equipment,
    },
});

const mapDispatchToProps = (dispatch: any) => ({
    getEquipment: () => dispatch(getEquipment()),
    orderEquipment: (item: any, rootGroup: any) =>
        dispatch(_orderEquipment(item, rootGroup)),
    removeEquipment: (data: any) => dispatch(_removeEquipment(data)),
    updateEquipment: (data: any) => dispatch(_updateEquipment(data)),
    saveEquipment: (data: any) => dispatch(_saveEquipment(data)),
    resetBookedEquipment: () => dispatch(_resetBookedEquipment()),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdditionalEquipment)
);
