import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { ZodType, z } from 'zod';
import AlternateSignupOptions from '../components/auth/AlternateSignupOptions';
import AuthInput from '../components/auth/AuthInput';
import AuthModalBackButton from '../components/auth/AuthModalBackButton';
import AuthModalHeader from '../components/auth/AuthModalHeader';
import AuthModalRequestMessage from '../components/auth/AuthModalRequestMessage';
import AuthPage from '../components/auth/AuthPage';
import Button from '../components/ui/Button';
import { auth, db } from "../firebase";
import { signInWithFacebook, signInWithGoogle } from '../firebase/auth';
import { FormData } from '../types/auth';
import firebase from 'firebase/app';
import useAccountSetupFormStore from '../store/AccountSetup';


const CreateAccountFormSchema: ZodType<FormData> = z
    .object({
        email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" })
            .regex(/\d/, { message: "Password must contain at least one digit" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // path of error
    });


const CreateAccount: React.FC<{}> = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(CreateAccountFormSchema),
        mode: 'onBlur'
    });
    const [loading, setLoading] = useState(false)
    const [requestError, setRequestError] = useState("")
    const setUserId = useAccountSetupFormStore(state => state.setUserId)
    const setNames = useAccountSetupFormStore(state => state.setNames)
    const setGender = useAccountSetupFormStore(state => state.setGender)
    const setCountryAndPhoneData = useAccountSetupFormStore(state => state.setCountryAndPhoneData)
    const setId = useAccountSetupFormStore(state => state.setId)

    const onEmailAndPasswordSubmit = async (data: FormData) => {
        console.log(data)
        try {
            setLoading(true)
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email as string,
                data.password as string
            )
            if (userCredential) {
                // TODO: Check if users email already exist before trying to log them in
                console.log("You've been logged", userCredential);
                const user = userCredential.user
                const q = query(collection(db, "users"), where("uid", "==", user.uid));
                const result = await getDocs(q);
                if (result.docs.length === 0) {
                    setUserId(user.uid)
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        auth_provider: "local",
                        email: user.email,
                        has_completed_account_creation: false,
                        has_completed_account_onboarding: false
                    });
                    setId(user.uid)
                    navigate('/auth/account-setup')
                }
            }
            console.log(userCredential)
        } catch (error: any) {
            if (error.code == 'auth/email-already-in-use') {
                setRequestError("Account already exists")
            }
            else if (error.code == 'auth/network-request-failed') {
                setRequestError("Poor Intenet Connection")
            }
            else { setRequestError('Something Went Wrong') }
        } finally {
            setLoading(false)
        }
    }

    const onGoogleSignIn = async (res: any) => {
        console.log(res)
        try {
            setLoading(true)
            const user = res.user;
            setUserId(user.uid)
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const result = await getDocs(q);
            if (result.docs.length === 0) {
                const userResult = await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    first_name: res.user.displayName.split(" ")[0],
                    last_name: res.user.displayName.split(" ")[1],
                    auth_provider: "google",
                    email: res.user.email,
                    has_completed_account_creation: false,
                    has_completed_onboarding: false
                });
                setId(res.user.uid)
                navigate('/auth/account-setup')
            }
            if (result.docs.length === 1) {
                const user = result.docs[0].data()
                console.log(result.docs[0])
                console.log(user)
                if (!user.has_completed_account_creation) {
                    setId(result.docs[0].id)
                    setNames({
                        first_name: user.first_name,
                        last_name: user.last_name
                    })
                    setGender('')
                    setCountryAndPhoneData({ phone_number: '', country_of_origin: '' })
                    navigate('/auth/account-setup')
                } else if (!user.has_completed_onboarding) {
                    navigate('/onboarding')
                } else {
                    navigate('/')
                }
            }
        } catch (err) {
            console.error(err);
            setRequestError("Could Not Sign In With Google")
        } finally {
            setLoading(false)
        }
    }
    const onFacebookSignIn = (res: any) => {
        console.log(res)
    }
    return (
        <AuthPage className='create-account-home'>
            <div className='auth-page__modal'>
                <AnimatePresence mode='wait'>
                    {requestError && <AuthModalRequestMessage errorMessage={requestError} />}
                </AnimatePresence>
                <AuthModalBackButton onClick={() => navigate(-1)} />
                <AuthModalHeader title='Create Account' subtitle="Your perfect match is a swipe away :)" />
                <form onSubmit={handleSubmit(onEmailAndPasswordSubmit)} className='auth-page__modal__form'>
                    <AuthInput register={register} error={errors.email} name='email' type='email' placeholder='Your Email' />
                    <AuthInput name="password" register={register}
                        error={errors.password} placeholder='Password' type='password' />
                    <AuthInput name='confirmPassword' register={register}
                        error={errors.confirmPassword} type='password' placeholder='Confirm Password' />
                    <Button loading={loading} className='auth-page__modal__form__button' text='Create Account' />
                </form>
                <AlternateSignupOptions google={() => signInWithGoogle(onGoogleSignIn)} facebook={() => signInWithFacebook(onFacebookSignIn)} phone={() => navigate('/auth/phone-number')} text='or sign up with' />
                <div className="auth-page__modal__terms-and-conditions">
                    By clicking on “Login” you agree to our <Link to="/terms-and-conditions">Terms and condition</Link>. Learn how we process your data in our <Link to="/privacy-policy">Privacy Policy</Link>.</div>
            </div>
        </AuthPage>
    )
}

export default CreateAccount;