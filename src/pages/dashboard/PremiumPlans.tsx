import { AnimatePresence, motion } from "framer-motion"

type PremiumPlansHeaderProps = {plan: boolean}

export const PremiumPlansHeader: React.FC<PremiumPlansHeaderProps> = ({plan}) => {
return (
    <AnimatePresence>
                            {plan ?
                            <motion.div initial={{ x: "100%" }}   animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5 }} className=" w-full absolute  px-[2.4rem]"
                            >
                                <div className=" w-full px-[1.2rem] mr-[2.4rem] py-[1.6rem] text-[#FF5C00] bg-gradient-to-r from-[#ff5e0030] to-white  " style={{border: '1.5px solid  #FF5C00', borderRadius: '1.2rem'}} >
                                    <h1 className="text-[2.4rem] font-bold ">Whossy Premium Plan</h1>
                                    <p className="flex gap-[0.4rem]"><span className="text-[1.6rem] font-semibold self-center">$</span><span className="text-[3.2rem] font-medium self-end">12.99</span><span className="text-[1.6rem] font-bold self-end">/month</span></p>
                                </div>
                            </motion.div> :

                            <div className="w-full px-[2.4rem]">
                                <div className=" min-w-full px-[1.2rem] py-[1.6rem] text-[#AAAAAA] bg-gradient-to-r from-[#E3E3E3] to-white " style={{border: '1.5px solid #AAAAAA', borderRadius: '1.2rem'}}>
                                    <h1 className="text-[2.4rem] font-bold ">Whossy Free Plan</h1>
                                    <p className="flex gap-[0.4rem]"><span className="text-[1.6rem] font-semibold self-center">$</span><span className="text-[3.2rem] font-medium self-end">0</span><span className="text-[1.6rem] font-bold self-end">/month</span></p>
                                </div>
                            </div>
                            }
    </AnimatePresence>
    )
}