import { Col, Row } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ name, stand, logo, ...props }: any) => (
    <Row type="flex" gutter={32} align="middle" {...props}>
        {logo &&
            logo.file && (
                <Col
                    xs={24}
                    sm={1}
                    style={{
                        minWidth: 220,
                        textAlign: 'center',
                        marginBottom: 10,
                    }}
                >
                    <img
                        src={`data:${logo.type};base64,${logo.file}`}
                        style={{ width: '100%', maxWidth: 250 }}
                    />
                </Col>
            )}
        <Col>
            <h1>{name}</h1>
            <h3>
                <FormattedMessage id="dashboard.stand" />: {stand.name}
            </h3>
        </Col>
    </Row>
);
