import React from 'react';
import AuthPage from '../components/auth/AuthPage';
import AuthModalBackButton from '../components/auth/AuthModalBackButton';
import AuthModalHeader from '../components/auth/AuthModalHeader';
import AuthInput from '../components/auth/AuthInput';
import Button from '../components/ui/Button';
import ResetPasswordRequirementParamater from '../components/auth/ResetPasswordRequirementParamater';

type ResetPasswordProps = {

};

const ResetPassword: React.FC<ResetPasswordProps> = () => {

    return <AuthPage className='reset-password'>
        <div className='auth-page__modal'>
            <AuthModalBackButton />
            <AuthModalHeader title='Reset your password' subtitle="Choose a new password that you can easily remember." />
            <form className='auth-page__modal__form'>
                <AuthInput type='password' placeholder='password' />
                <div className='auth-page__modal__password-requirements'>
                    <ResetPasswordRequirementParamater criteriaPassed text="Be at least 8 characters or more" />
                    <ResetPasswordRequirementParamater text="At least 1 uppercase and lower case letter" />
                    <ResetPasswordRequirementParamater text="Must contain a digit or number" />
                    <ResetPasswordRequirementParamater text="Must contain a special character e,g '@$!%*?&'." />
                </div>
                <AuthInput type='password' placeholder='confirm password' />
                <Button className='auth-page__modal__form__button' text='Submit' />
            </form>
        </div>
    </AuthPage>
}
export default ResetPassword;