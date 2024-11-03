import { useState } from 'react';
import DashboardSettingsModal from './DashboardSettingsModal'
import { PaystackButton } from 'react-paystack'
import StripeCheckoutForm from './StripeCheckoutForm';
import toast from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from '@/store/UserId';
import { Oval } from 'react-loader-spinner';


interface SubscriptionPlanModalProps {
  show: boolean, hide: () => void; advance: (val: 'stripe-payment' | 'payment-detail') => void, refetchUserData?: () => void
}

type UserDetails = {name: string, email: string, phone: string, amount: number}



export const SubscriptionPlanModal: React.FC<SubscriptionPlanModalProps> = ({ show, hide, refetchUserData}) => {

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'naira' | 'usd'>('naira');

  const {auth} = useAuthStore();

  const userDoc = doc(db, "users", auth?.uid as string );

  const [isLoading, setIsLoading] = useState(false);


  const handlePayment = async () => {
    setIsLoading(true);
    await updateDoc(userDoc, {
      isPremium: true
    });
    setIsLoading(false);
    toast.success('Payment successful');
    refetchUserData && refetchUserData();
    hide();
  }

  

  return (
    <DashboardSettingsModal showing={show} title="Select a payment option" hideModal={hide}>
      <div className="flex flex-col gap-y-4">
        <div className='cursor-pointer text-[1.8rem] font-medium bg-[#FFFFFF] px-[1.8rem] py-[1.8rem] flex items-center gap-x-2 rounded-[0.8rem] hover:bg-[#fafafa] transition duration-300 hover:scale-[1.01] ' style={{border: '1px solid', borderColor: selectedPaymentMethod === 'naira' ? '#f46a1afa' : '#8A8A8E'}}
         onClick={() => setSelectedPaymentMethod('naira')}>
            <div className={`size-[2rem] rounded-full transition-all duration-300 ${selectedPaymentMethod === 'naira' ? 'bg-[#f46a1afa]' : 'bg-white'}`} style={{border: '1px solid #8A8A8E'}}/>
            <p className='text-center w-full'>Pay using Naira (Paystack)</p>
        </div>
        <div className='cursor-pointer text-[1.8rem] font-medium bg-[#FFFFFF] px-[1.8rem] py-[1.8rem] flex items-center gap-x-2 rounded-[0.8rem] hover:bg-[#fafafa] transition duration-300 hover:scale-[1.01] ' style={{border: '1px solid', borderColor: selectedPaymentMethod === 'usd' ? '#f46a1afa' : '#8A8A8E'}}
         onClick={() => setSelectedPaymentMethod('usd')}>
            <div className={`size-[2rem] rounded-full transition-all duration-300 ${selectedPaymentMethod === 'usd' ? 'bg-[#f46a1afa]' : 'bg-white'}`} style={{border: '1px solid #8A8A8E'}}/>
            <p className='text-center w-full'>Pay using USD (Stripe)</p>
        </div>
        <button className="bg-[#ff5e00f7] w-full py-[1.5rem] text-center flex justify-center rounded-[0.8rem] text-[1.8rem] text-white font-medium tracking-wide cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300" onClick={
          // () => advance(selectedPaymentMethod === 'naira' ? 'payment-detail' : 'stripe-payment')
          handlePayment
        }>{!isLoading ? 'Pay - $12' : <Oval color="#FFFFFF" secondaryColor="#FFFFFF" width={20} height={20} />}</button>
      </div>
    </DashboardSettingsModal>
  )
}

export const PaymentDetailsModal: React.FC<SubscriptionPlanModalProps> = ({ show, hide}) => {

const amount = 2000000;

const [userDetails, setUserDetails] = useState<UserDetails>({name: "", email: "", phone: "", amount});


return (
  <DashboardSettingsModal showing={show} title="Select a payment option" hideModal={hide}>
    <form className="flex flex-col gap-y-6">
      <div className='flex flex-col space-y-2 text-[1.8rem]'>
          <label htmlFor="name">Name</label>
          <input id='name' type="text" value={userDetails.name} placeholder='Enter your full name' className='border py-4 px-4 rounded-lg placeholder:text-[#dad9d9]'
          onChange={(e) => setUserDetails((prev) => ({...prev, name: e.target.value}) )} />
      </div>
      <div className='flex flex-col space-y-2 text-[1.8rem]'>
          <label htmlFor="name">Phone Number</label>
          <input id='name' type="text" value={userDetails.phone} placeholder='Enter your phone number' className='border py-4 px-4 rounded-lg placeholder:text-[#dad9d9]'
          onChange={(e) => setUserDetails((prev) => ({...prev, phone: e.target.value}) )} />
      </div>
      <div className='flex flex-col space-y-2 text-[1.8rem]'>
          <label htmlFor="name">Email</label>
          <input id='name' type="text" placeholder='Enter your email address' className='border py-4 px-4 rounded-lg placeholder:text-[#dad9d9]'
          onChange={(e) => setUserDetails((prev) => ({...prev, email: e.target.value}) )} />
      </div>
      <button className="bg-[#ff5e00f7] w-full py-[1.5rem] text-center rounded-[0.8rem] text-[1.8rem] text-white font-medium tracking-wide cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300" onClick={() => {}}>Pay - $12</button>
      <PaystackButton className="paystack-button" email={userDetails.email} amount={userDetails.amount} publicKey='xxxx' />
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
      isPremium: false
    });
    refetchUserData && refetchUserData();
    toast.success('Subscription cancelled successfully');
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