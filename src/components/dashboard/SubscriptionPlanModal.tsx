import React, { useState } from 'react';
import DashboardSettingsModal from './DashboardSettingsModal'
import StripeCheckoutForm from './StripeCheckoutForm';
import toast from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { Oval } from 'react-loader-spinner';
import { useSubscribe } from '@/hooks/usePaystack';
import { usePaystackStore } from '@/store/Paystack';


interface SubscriptionPlanModalProps {
  show: boolean, hide: () => void; advance?: (val: 'stripe-payment' | 'payment-detail') => void, refetchUserData?: () => void
}

type UserDetails = {name: string, email: string, phone: string, amount: number}



export const SubscriptionPlanModal: React.FC<SubscriptionPlanModalProps> = ({ show, hide, advance}) => {

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'paystack' | 'usd'>('paystack');

  // const {auth} = useAuthStore();

  // const userDoc = doc(db, "users", auth?.uid as string );

  // const [isLoading, setIsLoading] = useState(false);


  const handlePayment = async () => {
    advance && advance(selectedPaymentMethod === 'paystack' ? 'payment-detail' : 'stripe-payment');
    // setIsLoading(true);
    // await updateDoc(userDoc, {
    //   isPremium: true
    // });
    // setIsLoading(false);
    // toast.success('Payment successful');
    // refetchUserData && refetchUserData();
    // window.location.reload();
    // hide();
  }

  

  return (
    <DashboardSettingsModal showing={show} title="Select a payment option" hideModal={hide}>
      <div className="flex flex-col gap-y-4">
        <div className='cursor-pointer text-[1.8rem] font-medium bg-[#FFFFFF] px-[1.8rem] py-[1.8rem] flex items-center gap-x-2 rounded-[0.8rem] hover:bg-[#fafafa] transition duration-300 hover:scale-[1.01] ' style={{border: '1px solid', borderColor: selectedPaymentMethod === 'paystack' ? '#f46a1afa' : '#ececec'}}
         onClick={() => setSelectedPaymentMethod('paystack')}>
            <div className={`size-[2rem] rounded-full transition-all duration-300 ${selectedPaymentMethod === 'paystack' ? 'bg-[#f46a1afa]' : 'bg-white'}`} style={{border: '1px solid #ececec'}}/>
            <p className='text-center w-full text-[#8A8A8E]'>Pay using Naira (Paystack)</p>
        </div>
        <div className='cursor-pointer text-[1.8rem] font-medium bg-[#FFFFFF] px-[1.8rem] py-[1.8rem] flex items-center gap-x-2 rounded-[0.8rem] hover:bg-[#fafafa] transition duration-300 hover:scale-[1.01] ' style={{border: '1px solid', borderColor: selectedPaymentMethod === 'usd' ? '#f46a1afa' : '#ececec'}}
         onClick={() => setSelectedPaymentMethod('usd')}>
            <div className={`size-[2rem] rounded-full transition-all duration-300 ${selectedPaymentMethod === 'usd' ? 'bg-[#f46a1afa]' : 'bg-white'}`} style={{border: '1px solid #ececec'}}/>
            <p className='text-center w-full text-[#8A8A8E]'>Pay using USD (Stripe)</p>
        </div>
        <button className="bg-[#ff5e00f7] w-full py-[1.5rem] text-center flex justify-center rounded-[0.8rem] text-[1.8rem] text-white font-medium tracking-wide cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300" onClick={
          handlePayment
        }>Next</button>
        {/* <Oval color="#FFFFFF" secondaryColor="#FFFFFF" width={20} height={20} /> */}
      </div>
    </DashboardSettingsModal>
  )
}

export const PaystackPaymentDetailsModal: React.FC<SubscriptionPlanModalProps> = ({ show, hide}) => {

const [userDetails, setUserDetails] = useState<UserDetails>({name: "", email: "", phone: "", amount: 200000});

const { auth } = useAuthStore();

const { mutate } = useSubscribe();

const handleSuccessfulPayment = async() => {
  if ( userDetails.name === "" || userDetails.email === "" || userDetails.phone === "" ) {
    return toast.error('Please fill in all fields');
  } else {
    mutate({email: userDetails.email, amount: 50000, plan: 'PLN_pmtergy'}, {onError: () => {toast.error('An error occured, please try again later.')}})
    // try {
    //   const userRef = doc(db, 'users', auth?.uid as string);
    //   await updateDoc(userRef, { isPremium: true })
    //   .then(() => toast.success('Payment successful! Your account is now premium.'))
    //   .then(() => setTimeout(() => window.location.reload(), 1500));
    // } catch (error) {
    //   console.error('Error updating premium status:', error);
    //   toast.error('Payment succeeded, but we encountered an issue upgrading your account. Please contact support.');
    // }
  }
}


const { setReference } = usePaystackStore();

return (
  <DashboardSettingsModal showing={show} title="Select a payment option" hideModal={hide}>
    <form className="flex flex-col gap-y-6" 
      onSubmit= { (e) => { 
        e.preventDefault(); 
        mutate({email: userDetails.email, amount: 50000, plan: 'PLN_pmtergy4o4vv216'}, { onSuccess: (res) => {  setReference(res.data.reference);  setTimeout(() => window.open(res.data.authorization_url, '_blank'), 500); }})
        }
      }
      >
      <div className='flex flex-col space-y-2 text-[1.8rem]'>
          <label htmlFor="name" className='text-[#666]'>Name</label>
          <input id='name' type="text" value={userDetails.name} placeholder='Enter your full name' className='border py-4 px-4 outline-none border-[#ccc] rounded-lg placeholder:text-[#dad9d9]'
          onChange={(e) => setUserDetails((prev) => ({...prev, name: e.target.value}) )} />
      </div>
      <div className='flex flex-col space-y-2 text-[1.8rem]'>
          <label htmlFor="name" className='text-[#666]'>Phone Number</label>
          <input id='name' type="text" value={userDetails.phone} placeholder='Enter your phone number' className='border py-4 px-4 outline-none border-[#ccc] rounded-lg placeholder:text-[#dad9d9]'
          onChange={(e) => setUserDetails((prev) => ({...prev, phone: e.target.value}) )} />
      </div>
      <div className='flex flex-col space-y-2 text-[1.8rem]'>
          <label htmlFor="name" className='text-[#666]'>Email</label>
          <input id='name' type="text" placeholder='Enter your email address' className='border py-4 px-4 outline-none border-[#ccc] rounded-lg placeholder:text-[#dad9d9]'
          onChange={(e) => setUserDetails((prev) => ({...prev, email: e.target.value}) )} />
      </div>
      <button 
      className="bg-[#ff5e00f7] w-full py-[1.5rem] text-center rounded-[0.8rem] text-[1.8rem] text-white font-medium tracking-wide cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300" 
      >Pay - $12</button>
      {/* <PaystackButton text='Pay Now' className="paystack-button" email={userDetails.email}  amount={userDetails.amount} publicKey={publicKey} onSuccess={handleSuccessfulPayment}/> */}
      {/* <button onClick={(e) => {alert('pay now'); e.preventDefault()}}>click</button> */}
    </form>
  </DashboardSettingsModal>
)
}

export const StripePaymentDetailsModal: React.FC<SubscriptionPlanModalProps> = ({ show, hide}) => {
  return (
    <DashboardSettingsModal showing={show} title="Select a payment option" hideModal={hide}>
      <StripeCheckoutForm />
    </DashboardSettingsModal>
  )
}

export const CancelPlanModal: React.FC<SubscriptionPlanModalProps> = ({ show, hide, refetchUserData}) => {

  const {auth} = useAuthStore();

  const userDoc = doc(db, "users", auth?.uid as string );

  const [isLoading, setIsLoading] = useState(false);

  const handleUnsubscription = async () => {
    setIsLoading(true);
    await updateDoc(userDoc, {
      is_premium: false
    });
    refetchUserData && refetchUserData();
    toast.success('Subscription cancelled successfully');
    window.location.reload();
    hide();
  } 

  return (
    <DashboardSettingsModal showing={show} title="Select a payment option" hideModal={hide}>
    <div className="flex flex-col gap-y-4">
      <h1 className='text-center text-[2.4rem] font-medium'>Are you sure you want to unsubscribe</h1>
      <div className='flex gap-x-5'>
        <button  className='cursor-pointer text-[1.8rem] w-full font-medium bg-[#FFFFFF] px-[1.8rem] py-[1.8rem] flex justify-center gap-x-2 rounded-[0.8rem] hover:bg-[#f6f6f6] transition duration-300 hover:scale-[1.01] text-center ' style={{border: '2px solid #f6f6f6'}} onClick={
          hide
        }>Cancel</button>
        <button className='cursor-pointer text-[1.8rem] w-full font-medium bg-[#FFFFFF] px-[1.8rem] py-[1.8rem] flex justify-center gap-x-2 rounded-[0.8rem] hover:bg-[#f6f6f6] transition duration-300 hover:scale-[1.01] text-center ' style={{border: '2px solid #f6f6f6'}} onClick={
          handleUnsubscription
        }>{!isLoading ? 'Yes' : <Oval color="#000000" secondaryColor="#000000" width={20} height={20} />}</button>
      </div>
    </div>
  </DashboardSettingsModal>
  )
}