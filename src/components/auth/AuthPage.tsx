import React from 'react';
import { motion } from 'framer-motion'

type AuthPageProps = {
    children: React.ReactNode | React.ReactNode[];
    className: string;
    key?: string;
};

const AuthPage: React.FC<AuthPageProps> = ({ children, className, key }) => {

    return <motion.div key={key} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }} className={`auth-page ${className}`} >
        {children}
    </motion.div>
}
export default AuthPage;