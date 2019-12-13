import * as React from 'react';
import { connect } from 'react-redux';
import { changeLocale } from '../ducks/lang';

const selectedStyle: React.CSSProperties = {
    fontWeight: 'bold',
    borderBottom: '1px solid',
};

const style: React.CSSProperties = {
    cursor: 'pointer',
};

class LanguageSwitcher extends React.Component<any, any> {
    public render() {
        const { lang } = this.props;

        return (
            <div>
                <span
                    style={{
                        ...(lang === 'en' ? selectedStyle : style),
                        marginRight: '1rem',
                    }}
                    onClick={this.changeLocale('en')}
                >
                    ENG
                </span>
                <span
                    style={{ ...(lang === 'ru' ? selectedStyle : style) }}
                    onClick={this.changeLocale('ru')}
                >
                    РУС
                </span>
            </div>
        );
    }

    private changeLocale = (lang: string) => () => {
        this.props.changeLocale(lang);
    };
}

const mapStateToProps = ({ lang }: any) => ({ lang });

const mapDispatchToProps = (dispatch: any) => ({
    changeLocale: (lang: string) => dispatch(changeLocale(lang)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSwitcher);
