import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { ZodType, z } from "zod";
import AuthInput from '../components/auth/AuthInput';
import AuthModalBackButton from '../components/auth/AuthModalBackButton';
import AuthModalHeader from '../components/auth/AuthModalHeader';
import AuthModalRequestMessage from '../components/auth/AuthModalRequestMessage';
import AuthPage from '../components/auth/AuthPage';
import Button from '../components/ui/Button';
import { auth, db } from "../firebase";
import { signInWithFacebook, signInWithGoogle } from '../firebase/auth';
import useAccountSetupFormStore from '../store/AccountSetup';
import { FormData } from "../types/auth";
import {motion} from 'framer-motion';
import { useAuthStore } from "@/store/UserId";

type LoginProps = {

};

export const LoginFormSchema: ZodType<FormData> = z
    .object({
        email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" })
            .regex(/\d/, { message: "Password must contain at least one digit" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
        // confirmPassword: z.string(),
        // .refine((data) => data.password === data.confirmPassword, {
        //     message: "Passwords do not match",
    })
//     path: ["confirmPassword"], // path of error
// });

const Login: React.FC<LoginProps> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(LoginFormSchema),
        mode: 'onBlur'
    });
    const [loading, setLoading] = useState(false)
    const [requestError, setRequestError] = useState("")
    const setNames = useAccountSetupFormStore(state => state.setNames)
    const setGender = useAccountSetupFormStore(state => state.setGender)
    const setCountryAndPhoneData = useAccountSetupFormStore(state => state.setCountryAndPhoneData)
    const setUserId = useAccountSetupFormStore(state => state.setUserId)
    const setId = useAccountSetupFormStore(state => state.setId)
    const setAuthProvider = useAccountSetupFormStore(state => state.setAuthProvider)
    const navigate = useNavigate()
    const [attemptedAuthUser, setAttemptedAuthUser] = useState<any>({})

    const {setAuth} = useAuthStore();

    const onEmailAndPasswordSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            //Check if the user Is Logging In With The Correct Sign In Method
            // const q = query(collection(db, "users"), where("email", "==", data.email as string));
            // const result = await getDocs(q);
            // if (result.docs.length == 0) {
            //     const err = new Error("Incorrect Sign In Method Attempted") as any
            //     err.code = 'auth/account-does-not-exist'
            //     throw err;
            // }
            // else if (result.docs.length == 1) {
            //     const user = result.docs[0].data()
            //     if (user.authProvider !== 'local') {
            //         const err = new Error("Incorrect Sign In Method Attempted") as any
            //         err.code = 'auth/use-social-sign-in'
            //         throw err;
            //     }
            // }
            // Authenticate the User If The Account Is An Email & Password Account
            const res = await signInWithEmailAndPassword(auth, data.email as string, data.password as string)
            // console.log(res)
            if (res.user) {
                console.log(res.user)
                // setLoading(false)
                const q = query(collection(db, "users"), where("uid", "==", res.user.uid as string));
                const result = await getDocs(q);
                if (result.docs.length == 1) {
                    const user = result.docs[0].data()
                    if (!user.has_completed_account_creation) {
                        setId(result.docs[0].id)
                        setUserId(user.uid)
                        setAuthProvider('email')
                        setNames({ first_name: user.first_name, last_name: user.last_name })
                        setGender('')
                        setCountryAndPhoneData({ phone_number: '', country_of_origin: '' })
                        navigate('/auth/account-setup')
                    } else if (!res.user.emailVerified) {
                        navigate('/auth/email-verification')
                    }
                    else if (!user.has_completed_onboarding) {
                        navigate('/onboarding')
                        setAuth(res.user.uid)
                    } else {
                        navigate('/dashboard/user-profile')
                        setAuth(res.user.uid)
                    }
                }
            }
        } catch (error: any) {
            console.log(error)
            // if (error.code == 'auth/account-does-not-exist') {
            //     setRequestError("Account Does Not Exist")
            // }
            // else if (error.code == 'auth/use-social-sign-in') {
            //     setRequestError("Use Social/Phone Sign In")
            // }
            if ((error.code == 'auth/network-request-failed')) {
                setRequestError("Poor Internet Connection")
            }
            if (error.code == 'auth/invalid-credential') {
                setRequestError("Invalid Email or Password")
            }
            else {
                setRequestError("Something Went Wrong")
            }
        } finally {
            setLoading(false)
        }
    }
    const onGoogleSignIn = async (res: any) => {
        console.log(res)
        try {
            setLoading(true)
            setAttemptedAuthUser(res.user)
            console.log(attemptedAuthUser)
            const q = query(collection(db, "users"), where("uid", "==", res.user.uid));
            const result = await getDocs(q);
            if (result.docs.length === 0) {
                setNames({
                    first_name: res.user.displayName.split(" ")[0],
                    last_name: res.user.displayName.split(" ")[1],
                })
                await setDoc(doc(db, "users", res.user.uid), {
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
            else if (result.docs.length === 1) {
                const user = result.docs[0].data()
                if (!user.has_completed_account_creation) {
                    setId(result.docs[0].id)
                    setUserId(user.uid)
                    setNames({
                        first_name: user.first_name,
                        last_name: user.last_name
                    })
                    setGender('')
                    setCountryAndPhoneData({ phone_number: '', country_of_origin: '' })
                    navigate('/auth/account-setup')
                } else if (!res.user.emailVerified) {
                    navigate('/auth/email-verification')
                }
                else if (!user.has_completed_onboarding) {
                    navigate('/onboarding')
                    setAuth(res.user.uid)
                } else {
                    navigate('/dashboard/user-profile')
                }
            }
        } catch (err) {
            console.log(attemptedAuthUser)
            console.log(err)
            setRequestError("Could Not Sign In With Google")
        }
        finally {
            setLoading(false)
        }
    }
    const onFacebookSignIn = (res: any) => {
        console.log(res)
    }

    return <AuthPage className='login'>
        <div className='auth-page__modal'>
            <AnimatePresence mode='wait'>
                {requestError && <AuthModalRequestMessage errorMessage={requestError} />}
            </AnimatePresence>
            <AuthModalBackButton onClick={() => navigate('/auth')} />
            <AuthModalHeader title='Welcome back' subtitle='login to see who you’ve matched with ✌' />
            <form
                onSubmit={handleSubmit(onEmailAndPasswordSubmit)}
                className='auth-page__modal__form'>
                <AuthInput register={register}
                    error={errors.email} name='email' type='email' placeholder='example@gmail.com' />
                <AuthInput name="password"
                    register={register}
                    error={errors.password} placeholder='password' type='password' />
                     <button className='w-full rounded-[0.8rem] cursor-pointer bg-[#F2243E] py-6 text-white text-[1.8rem] font-medium leading-[2.16rem] active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-70 transition-all duration-200 flex items-center justify-center'> {!loading ? "Login" : <motion.img key="loading-image"className='button__loader' src='/assets/icons/loader.gif' />} </button>
                <p className='auth-page__modal__form__cta'>Forgot Password? <Link to="/auth/forgot-password" className='underline'>Reset here</Link></p>
            </form>
            <div className='auth-page__modal__alternate-options'>
                <div className="auth-page__modal__alternate-options__divider">
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <div className='auth-page__modal__alternate-options__container'>
                    <div onClick={() => signInWithFacebook(onFacebookSignIn)} className='auth-page__modal__alternate-options__item'><img src="/assets/icons/facebook.svg" /></div>
                    <div onClick={() => signInWithGoogle(onGoogleSignIn)} className='auth-page__modal__alternate-options__item'><img src="/assets/icons/google.svg" /></div>
                    <div onClick={() => navigate('/auth/phone-number')} className='auth-page__modal__alternate-options__item'><img src="/assets/icons/phone.svg" /></div>
                </div>
            </div>
            <div className="auth-page__modal__terms-and-conditions">
                By clicking on “Login” you agree to our <Link to="/terms-and-conditions">Terms and condition</Link>. Learn how we process your data in our <Link to="/privacy-policy">Privacy Policy</Link>.</div>

        </div>
    </AuthPage>
}
export default Login;