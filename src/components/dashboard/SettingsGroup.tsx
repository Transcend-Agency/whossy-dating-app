import React from 'react';

type SettingsGroupProps = {
    data: [string, string, () => void][]
};

const SettingsGroup: React.FC<SettingsGroupProps> = ({ data }) => {

    return <div className="settings-page__settings-group">
        {data.map((item, index) => (
            <button onClick={item[2]} className="settings-page__settings-group__item">
                <div className="settings-page__settings-group__item-container">
                    <div className="settings-page__settings-group__item__label">{item[0]}</div>
                    <div className="settings-page__settings-group__item__value">{item[1]}<img src="/assets/icons/arrow-right.svg" /></div>
                </div>
                {index !== data.length - 1 && <div className="settings-page__settings-group__item-separator"></div>}
            </button>
        ))}
    </div>
}
export default SettingsGroup;
