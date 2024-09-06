import React from 'react';
import { AnimatePresence, motion } from 'framer-motion'

export type DashboardSettingsModalProps = {
    showing: boolean;
    children?: JSX.Element | JSX.Element[] | boolean;
    hideModal: () => void;
    title?: string;
    save?: JSX.Element | JSX.Element[] | boolean;
};

const DashboardSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, children, hideModal, title, save }) => {

    return <>
        <AnimatePresence mode='wait'>
            {showing && <>
                <div className='modal'>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} exit={{ opacity: 0 }} className='modal__overlay'></motion.div>
                    <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.2 }} className='modal__container'>
                        <div className='modal__body'>
                            <header className='modal__body__header'>
                                <div className='modal__body__header__left'>
                                    <button onClick={hideModal} className='modal__body__back-button'>
                                        <img src="/assets/icons/back-arrow-black.svg" className='' />
                                    </button>
                                    <h3 className='modal__body__header__title'>{title}</h3>
                                </div>
                                {save}
                            </header>
                            <section className='modal__body__content'>
                                {children}
                            </section>
                        </div>
                    </motion.div>
                </div>
            </>}
        </AnimatePresence>
    </>
}
export default DashboardSettingsModal;