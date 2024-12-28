import { db } from "@/firebase";
import { useAuthStore } from "@/store/UserId";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion"
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from 'react-paystack'

type AddCreditProps = {
    activePage: string;
    closePage: () => void;
    activeSubPage?: number;
    refetchUserData: () => void
};

interface CreditOption {
    credits: number;
    price: number;
  }
  
  const creditOptions: CreditOption[] = [
    { credits: 50, price: 10000 },
    { credits: 100, price: 20000 },
    { credits: 200, price: 30000 },
    { credits: 1000, price: 40000 },
  ];

const AddCredits: React.FC<AddCreditProps> = ({ activePage, closePage, refetchUserData }) => {
    const [selectedCreditOption, setSelectedCreditOption] = useState<{ credits: number, price: number } | null>(null);

    const handlePrice = (data: { credits: number, price: number }) => {
      setSelectedCreditOption(data);
    };

    const { user } = useAuthStore();
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_TEST_KEY;
    const amount = selectedCreditOption ? selectedCreditOption.price * 100 : 0;

    const componentProps = {
      email: user?.email as string,
      amount,
      publicKey,
      text: "Pay Now",
      onSuccess: async () => {

        const userDocRef = doc(db, "users", user?.uid as string);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          await updateDoc(userDocRef, {
            credits: data.credits + selectedCreditOption?.credits,
            amount_paid_in_total: data.amount_paid_in_total + selectedCreditOption?.price
          });
          refetchUserData();
        }

        toast.success("Thanks for doing business with us! Come back soon!!");

      },
      onClose: () => toast.error("Wait! You need this oil, don't go!!!!"),
    }

  return (
    <motion.div animate={activePage == 'add-credits' ? { x: "-100%", opacity: 1, transition: {duration: 0.25 , ease: 'easeInOut'} } : {x: "100%", opacity: 0}} className="dashboard-layout__main-app__body__secondary-page add-credits-page">
        <div className="settings-page__title">
            <button onClick={closePage} className="settings-page__title__left text-black">
                <img src="/assets/icons/back-arrow-black.svg" className="settings-page__title__icon" />
                <p>Whossy Credits</p>
            </button>
        </div>
        <div className="bg-yellow m-6 py-[5rem] rounded-[1.6rem] text-center space-y-2">
        <div className="flex justify-center">
            <img src="/assets/icons/coin.svg" alt="Credits Icon" />
        </div>


          <h3 className="font-bold text-[2.4rem]">Whossy Credits</h3>
          <p className="text-gray text-[1.4rem]">
            Buy credits to boost your profile and get more visibility on Whossy
          </p>
        </div>

        <div className="space-y-5 pb-[5rem]">
          {creditOptions.map((option) => (
            <label
              key={option.credits}
              className="flex justify-between rounded-[1.6rem] p-4 m-6 cursor-pointer"
              style={{
                    border: selectedCreditOption?.credits === option.credits ? '1px solid #F2243E' : '1px solid #8A8A8A',
               }}
              onClick={() => handlePrice({ credits: option.credits, price: option.price })}
            >
              <div className="space-y-3">
                <div className="text-[1.6rem]">{option.credits} Credits</div>
                <div className="text-[1.6rem] font-semibold">₦{option.price}</div>
              </div>

              <input
                type="radio" name="credits" value={option.credits} checked={selectedCreditOption?.credits === option.credits} readOnly className="form-radio accent-red text-red" />
            </label>
          ))}
        </div>

        <div className="flex justify-center">
        {/* <button className="w-full bg-red text-white py-[1.6rem] rounded-[0.8rem] mx-6 text-[1.8rem] text-center " onClick={() => toast.success(amount + '.')} >
            Continue
            </button> */}
            <PaystackButton disabled={ selectedCreditOption ? false : true } currency="usd" className={` w-full bg-red text-white py-[1.6rem] rounded-[0.8rem] mx-6 text-[1.8rem] text-center ${!selectedCreditOption && "cursor-not-allowed"}`} {...componentProps} />
        </div>
        
    </motion.div>
  )
  
}

export default AddCredits