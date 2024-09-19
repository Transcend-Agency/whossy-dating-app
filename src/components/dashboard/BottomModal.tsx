// import { useState } from "react";
// import SliderBar from "../ui/SliderBar";
// import { useUpdateUserProfile } from "@/hooks/useUser";
// import { UserFilters, UserPrefences } from "@/types/user";
// import {
//   marital_status,
//   relationship_preferences,
//   preference,
//   love_language,
//   zodiac,
//   family_goal,
//   religion,
//   smoking,
//   drinking,
//   pets,
//   workout,
//   education,
// } from "@/constants";
// import {motion as m} from "framer-motion"

// const BottomModal = ({
//   item,
//   close,
//   path,
// }: {
//   item: {
//     title: string;
//     options?: string[];
//     placeholder?: string;
//     range?: number;
//     value?: string;
//     id?: string;
//     // arrayNumber?: number;
//   };
//   close: () => void;
//   path: string;
// }) => {
//   const [active, setActive] = useState<string | null | undefined>(item.value);

//   const [heightOrWeight, setHeightOrWeight] = useState<number | undefined>(
//     item.range
//   );

//   const arrays = {
//     marital_status,
//     love_language,
//     zodiac,
//     family_goal,
//     religion,
//     relationship_preferences,
//     smoking,
//     drinking,
//     pets,
//     workout,
//     preference,
//     education,
//   };

//   const findValueInArrays = (item: any) => {
//     for (const [arrayName, array] of Object.entries(arrays)) {
//       const index = array.indexOf(item);
//       if (index !== -1) {
//         return { array: arrayName, index };
//       }
//     }
//     return null;
//   };

//   const handleUpdate = () => {
//     useUpdateUserProfile(
//       path,
//       () => {
//         close();
//       },
//       {
//         [item.id as keyof (UserPrefences | UserFilters)]: findValueInArrays(active)?.index,
//       }
//     );
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, y: "100%" },
//     visible: { opacity: 1, y: "0%", transition: { duration: 0.5 } },
//     exit: { opacity: 0, y: "100%", transition: { duration: 1.5 } },
//   };

//   return (
//     <m.div
//       className="bg-white text-black flex-1 fixed w-full bottom-0 z-50"
//       style={{
//         border: "1px solid",
//         borderColor: "transparent",
//         borderTopRightRadius: "1.8rem",
//         borderTopLeftRadius: "1.8rem",
//       }}
//       variants={modalVariants}
//       initial={"hidden"}
//       animate="visible"
//       exit="exit"
//     >
//       <header
//         className="text-[1.6rem] flex justify-between p-[1.6rem]"
//         style={{ borderBottom: "2px solid #F6F6F6" }}
//       >
//         <h1>{item.title}</h1>
//         {active === item.value ? (
//           <p onClick={close} className="cursor-pointer">
//             X
//           </p>
//         ) : (
//           <p className="cursor-pointer" onClick={handleUpdate}>
//             Save
//           </p>
//         )}
//       </header>
//       {item.options && (
//         <div className=" w-full p-[1.6rem] space-y-[1rem]">
//           {item.options.map((_, i) => (
//             <div
//               className={`p-[0.8rem] cursor-pointer inline-block mr-[1.6rem] text-[1.4rem]  ${
//                 active === _
//                   ? "bg-black text-white"
//                   : "bg-[#F6F6F6] text-[#8A8A8E]"
//               } w-fit rounded-[0.6rem]`}
//               key={i}
//               onClick={() => {
//                 setActive(_);
//                 console.log(
//                   item.id as keyof (UserPrefences | UserFilters),
//                   findValueInArrays(active)?.index
//                 );
//               }}
//             >
//               {_}
//             </div>
//           ))}
//         </div>
//       )}
//       {item.placeholder && (
//         <div className="flex bg-[#F6F6F6] m-[1.6rem] gap-2 p-[1.6rem] text-[1.4rem]">
//           <img src="/assets/icons/search.svg" alt="" />
//           <input
//             className="w-full outline-none bg-inherit"
//             type="text"
//             placeholder={item.placeholder}
//           />{" "}
//         </div>
//       )}
//       {item.range && item.title.toLowerCase() === "height" && (
//         <div className="p-4 ">
//           <div className="bg-[#F6F6F6] px-[1.6rem] py-[1.2rem] rounded-lg">
//             <div className="bg-white py-2 px-3 rounded-md text-[1.2rem] w-fit">
//               {heightOrWeight}cm (
//               {Math.floor((heightOrWeight as number) / 2.54 / 12)}'
//               {Math.round((heightOrWeight as number) / 2.54 / 12)})
//             </div>
//             <SliderBar
//               getValue={(val) => setHeightOrWeight(val)}
//               min={100}
//               max={200}
//               val={item.range}
//             />
//           </div>
//         </div>
//       )}
//       {item.range && item.title.toLowerCase() === "weight" && (
//         <div className="p-4 ">
//           <div className="bg-[#F6F6F6] px-[1.6rem] py-[1.2rem] rounded-lg">
//             <div className="bg-white py-2 px-3 rounded-md text-[1.2rem] w-fit">
//               {heightOrWeight}Ibs
//             </div>
//             <SliderBar
//               getValue={(val) => setHeightOrWeight(val)}
//               min={130}
//               max={250}
//               val={item.range}
//             />
//           </div>
//         </div>
//       )}
//     </m.div>
//   );
// };

// export default BottomModal;
