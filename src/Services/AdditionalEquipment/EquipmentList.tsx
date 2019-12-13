import { Anchor, Input } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import EquipmentGroup from './EquipmentGroup';

const Link = Anchor.Link;

interface IState {
    filter: string;
    selectedGroup: number;
}

class EquipementList extends React.Component<any, IState> {
    public state: IState = {
        filter: '',
        selectedGroup: -1,
    };

    public render() {
        const { items, intl, onOrder, isDeadline } = this.props;
        const { filter, selectedGroup } = this.state;
        const nameField = intl.locale === 'ru' ? 'nameRu' : 'nameEn';
        const currentItems =
            selectedGroup !== -1 ? items[selectedGroup].items : [];

        return (
            <div>
                <h2 style={{ marginBottom: '1rem' }}>
                    <FormattedMessage id="additionalEquipment.available.title" />
                </h2>

                <div>
                    {items.map((item: any, index: number) => (
                        <h3 key={item[nameField]}>
                            <a
                                style={{
                                    color:
                                        index === selectedGroup
                                            ? '#1890ff'
                                            : 'inherit',
                                }}
                                onClick={() => this.handleGroupSelect(index)}
                            >
                                {item[nameField]}
                            </a>
                        </h3>
                    ))}
                </div>

                {selectedGroup !== -1 && (
                    <Input
                        size="large"
                        style={{ marginBottom: '2rem', marginTop: '2rem' }}
                        placeholder={intl.formatMessage({
                            id: 'additionalEquipment.available.filter',
                        })}
                        value={filter}
                        onChange={this.handleFilterChange}
                    />
                )}
                {!filter && selectedGroup !== -1 && (
                    <Anchor style={{ marginBottom: 20 }} affix={false}>
                        {currentItems.map((item: any) => (
                            <Link
                                key={item[nameField]}
                                href={`#${item[nameField]}`}
                                title={item[nameField]}
                            />
                        ))}
                    </Anchor>
                )}
                {currentItems.map((item: any) => (
                    <EquipmentGroup
                        isDeadline={isDeadline}
                        id={item[nameField]}
                        key={item.nameRu}
                        intl={intl}
                        rootGroup={items[selectedGroup]}
                        equipmentGroup={item}
                        filter={filter}
                        onOrder={onOrder}
                    />
                ))}
            </div>
        );
    }

    private handleGroupSelect(index: number) {
        this.setState({
            selectedGroup: index,
        });
    }

    private handleFilterChange = (e: any) => {
        this.setState({ filter: e.target.value.toLowerCase() });
    };
}

export default injectIntl(EquipementList);
