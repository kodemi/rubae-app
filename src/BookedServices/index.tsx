import { Alert, Collapse, List } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { getBookedServices } from '../ducks/bookedServices';
import { toggleBookedServices } from '../ducks/view';

import Service from '../components/Service';

export class BookedServices extends React.Component<any, any> {
    public state = {
        editDialogVisible: false,
        confirmServiceLoading: false,
        service: null,
    };

    public componentDidMount() {
        if (!this.props.loaded) {
            this.props.getBookedServices();
        }
    }

    public render() {
        const { error, intl, collapsible, collapsed } = this.props;
        const {
            editDialogVisible,
            confirmServiceLoading,
            service,
        } = this.state;

        if (error) {
            return (
                <Alert
                    showIcon
                    message={intl.formatMessage({ id: 'bookedServices.error' })}
                    description={intl.formatMessage({
                        id: 'bookedServices.errorDescription',
                    })}
                    type="error"
                />
            );
        }

        return (
            <div>
                {collapsible ? (
                    <Collapse
                        bordered={false}
                        onChange={this.handleCollapseChange}
                        activeKey={collapsed ? '1' : ''}
                    >
                        <Collapse.Panel
                            key="1"
                            header={this.renderHeader()}
                            style={{ border: 0 }}
                        >
                            {this.renderList()}
                        </Collapse.Panel>
                    </Collapse>
                ) : (
                    this.renderList()
                )}
            </div>
        );
    }

    private handleCollapseChange = () => {
        this.props.toggleBookedServices();
    };

    private renderList = () => {
        const { loading, services, intl, collapsible } = this.props;
        return (
            <List
                size="large"
                loading={loading}
                dataSource={services}
                renderItem={(item: any) => (
                    <Service data={item} locale={intl.locale} />
                )}
                {...(collapsible ? {} : { header: this.renderHeader() })}
            />
        );
    };

    private renderHeader = () => {
        const total = this.props.services.reduce(
            (sum: number, item: any) => sum + item.amount,
            0
        );

        return (
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginBottom: 0 }}>
                    <FormattedMessage id="bookedServices.title" />
                </h2>
                <h2
                    style={{
                        marginLeft: 'auto',
                        marginBottom: 0,
                    }}
                >
                    <FormattedMessage id="bookedServices.total" />:
                    <span style={{ marginLeft: '1rem' }}>€{total}</span>
                </h2>
            </div>
        );
    };
}

const mapStateToProps = (state: any) => ({
    ...state.bookedServices,
    collapsed: state.view.bookedServices.collapsed,
});

const mapDispatchToProps = (dispatch: any) => ({
    getBookedServices: () => dispatch(getBookedServices()),
    toggleBookedServices: () => dispatch(toggleBookedServices()),
});

export default injectIntl<any>(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BookedServices)
);
