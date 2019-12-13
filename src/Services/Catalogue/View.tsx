import { Button, Divider } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import countries from '../../i18n/countries';

const InfoBlock = ({ children }: any) => (
    <div style={{ marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
        {children}
    </div>
);

const contactsTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginRight: '0.5rem',
};

export default ({ data, locale, isDeadline, onEdit }: any) => (
    <div>
        <InfoBlock>
            <FormattedMessage id="catalogue.nameEn" tagName="h3" />
            {data.en.name}
        </InfoBlock>
        <InfoBlock>
            <FormattedMessage id="catalogue.nameRu" tagName="h3" />
            {data.ru.name}
        </InfoBlock>
        <InfoBlock>
            <FormattedMessage id="catalogue.descriptionEn" tagName="h3" />
            {data.en.description}
        </InfoBlock>
        <InfoBlock>
            <FormattedMessage id="catalogue.descriptionRu" tagName="h3" />
            {data.ru.description}
        </InfoBlock>
        <InfoBlock>
            <FormattedMessage id="catalogue.contacts" tagName="h3" />
            <div>
                <span style={contactsTitleStyle}>
                    <FormattedMessage id="catalogue.country" />:
                </span>
                {countries[locale][data.country]}
            </div>
            <div>
                <span style={contactsTitleStyle}>
                    <FormattedMessage id="catalogue.cityEn" />:
                </span>
                {data.en.city}
            </div>
            <div>
                <span style={contactsTitleStyle}>
                    <FormattedMessage id="catalogue.cityRu" />:
                </span>
                {data.ru.city}
            </div>
            <div>
                <span style={contactsTitleStyle}>
                    <FormattedMessage id="catalogue.tel" />:
                </span>
                {data.tel}
            </div>
            <div>
                <span style={contactsTitleStyle}>
                    <FormattedMessage id="catalogue.email" />:
                </span>
                {data.email}
            </div>
            <div>
                <span style={contactsTitleStyle}>
                    <FormattedMessage id="catalogue.website" />:
                </span>
                <a href={data.website}>{data.website}</a>
            </div>
        </InfoBlock>
        {!isDeadline && (
            <div>
                <Divider dashed />
                <Button type="primary" onClick={onEdit}>
                    <FormattedMessage id="catalogue.editButton" />
                </Button>
            </div>
        )}
    </div>
);
