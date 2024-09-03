import React from 'react';

type SettingsToggleItemProps = {
    title: string;
    subtext: string;
    isPremium?: boolean;
    onButtonToggle: () => void;
    isActive: boolean;
};

const SettingsToggleItem: React.FC<SettingsToggleItemProps> = ({ onButtonToggle, title, isPremium, subtext, isActive }) => {
    return (<div className="settings-page__settings-group__toggle-item">
        <div className="settings-page__settings-group__toggle-item-container">
            <div className="settings-page__settings-group__toggle-item__content">
                <div className="settings-page__settings-group__toggle-item__title">{title} {isPremium && <div className="premium-badge">Premium</div>}</div>
                <div className="settings-page__settings-group__toggle-item__subtext">{subtext}</div>
            </div>
            <div className={`settings-page__settings-group__toggle-item__toggle-button ${isActive && 'settings-page__settings-group__toggle-item__toggle-button--active'}`} onClick={onButtonToggle}>
                <div className="settings-page__settings-group__toggle-item__toggle-button__toggle"></div>
            </div>
        </div>
        <div className="settings-page__settings-group__item-separator"></div>
    </div>)
}
export default SettingsToggleItem;