import { Button, Form, Icon, Upload } from 'antd';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const LogoUploadField = ({ name, form, intl, onChange, ...props }: any) => {
    const { getFieldDecorator } = form;
    const handleFileSelect = ({ file }: any) => [file];
    const beforeUpload = props.beforeUpload || (() => false);
    const handleRemove = () => {
        form.setFieldsValue({ [name]: null });
        onChange();
    };

    return (
        <Form.Item
            label={intl.formatMessage({ id: `catalogue.${name}` })}
            extra={intl.formatMessage({
                id: `catalogue.${name}Extra`,
            })}
        >
            {getFieldDecorator(name, {
                valuePropName: 'fileList',
                getValueFromEvent: handleFileSelect,
                rules: [
                    // {
                    //     required: true,
                    //     message: intl.formatMessage({
                    //         id: 'catalogue.messages.logoRequired',
                    //     }),
                    // },
                    ...(props.rules || []),
                ],
            })(
                <Upload
                    name={name}
                    beforeUpload={beforeUpload}
                    onRemove={handleRemove}
                >
                    <Button>
                        <Icon type="upload" />{' '}
                        <FormattedMessage id="catalogue.selectFile" />
                    </Button>
                </Upload>
            )}
        </Form.Item>
    );
};

export default injectIntl(LogoUploadField);
