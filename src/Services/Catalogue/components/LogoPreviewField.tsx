import { Card, Form, Icon, Popconfirm, Tooltip } from 'antd';
import * as React from 'react';
import { injectIntl } from 'react-intl';

import { download } from '../../../api';
class LogoPreviewField extends React.Component<any, any> {
    public state = {
        tooltip: true,
    };

    public render() {
        const { intl, data, form, name } = this.props;
        const { tooltip } = this.state;

        return (
            <Form.Item>
                {form.getFieldDecorator(name)(
                    <Card
                        cover={
                            <div
                                style={{
                                    padding: 10,
                                    height: 120,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {data.file ? (
                                    <img
                                        src={`data:${data.type};base64,${
                                            data.file
                                        }`}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        type="file"
                                        style={{ fontSize: 60 }}
                                    />
                                )}
                            </div>
                        }
                        style={{ width: 250 }}
                        actions={[
                            <Tooltip
                                title={intl.formatMessage({
                                    id: 'catalogue.tooltips.downloadLogoIcon',
                                })}
                            >
                                {' '}
                                <Icon
                                    type="download"
                                    onClick={this.handleDownload}
                                />
                            </Tooltip>,
                            <Tooltip
                                title={intl.formatMessage({
                                    id: 'catalogue.tooltips.deleteLogoIcon',
                                })}
                                {...(tooltip ? {} : { visible: false })}
                            >
                                <Popconfirm
                                    title={intl.formatMessage({
                                        id:
                                            'catalogue.messages.deleteLogoConfirm',
                                    })}
                                    onConfirm={this.handleDeleteConfirm}
                                    onCancel={this.enableTooltip}
                                    okType="danger"
                                    okText={intl.formatMessage({
                                        id:
                                            'catalogue.messages.deleteLogoConfirmOk',
                                    })}
                                    cancelText={intl.formatMessage({
                                        id:
                                            'catalogue.messages.deleteLogoConfirmCancel',
                                    })}
                                >
                                    <Icon
                                        type="delete"
                                        onClick={this.disableTooltip}
                                    />
                                </Popconfirm>
                            </Tooltip>,
                        ]}
                    >
                        <Card.Meta
                            title={intl.formatMessage({
                                id: `catalogue.${name}`,
                            })}
                            description={
                                <div
                                    style={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {data.name}
                                </div>
                            }
                        />
                    </Card>
                )}
            </Form.Item>
        );
    }

    private handleDeleteConfirm = () => {
        this.setState({ tooltip: true });
        this.props.form.setFieldsValue({ [this.props.name]: null });
        this.props.onChange();
    };

    private handleDownload = () => {
        download(this.props.data.link, this.props.data.name);
    };

    private disableTooltip = () => {
        this.setState({ tooltip: false });
    };

    private enableTooltip = () => {
        this.setState({ tooltip: true });
    };
}

export default injectIntl(LogoPreviewField);
