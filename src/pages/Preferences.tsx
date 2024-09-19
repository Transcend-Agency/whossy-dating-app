// import Habits from "@/components/dashboard/Habits";
// import PreferencesModal from "@/components/dashboard/PreferencesModal";
// import ProfileHeader from "@/components/dashboard/ProfileHeader";
// import DoubleSliderBar from "@/components/ui/DoubleSliderBar";
// import Skeleton from "@/components/ui/Skeleton";
// import SliderBar from "@/components/ui/SliderBar";
// import Switch from "@/components/ui/Switch";
// import Tag from "@/components/ui/Tag";
// import {
//   communication_style,
//   drinking,
//   education,
//   family_goal,
//   love_language,
//   pets,
//   preference,
//   smoking,
//   workout,
//   zodiac,
// } from "@/constants";
// import { useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";
// import { UserFilters } from "@/types/user";
// import React, { useEffect, useState } from "react";
// import { Oval, Puff, ThreeCircles } from "react-loader-spinner";

// interface SectionProps {
//   children: React.ReactNode | React.ReactNode[];
//   className?: string;
// }

// interface HeaderProps {
//   title: string;
//   value: string;
//   isLoading: boolean;
// }

// interface OtherProps {
//   items: { title: string };
//   value: string;
//   getValue: (s: { title: string }) => void;
//   isLoading: boolean;
// }

// const Header: React.FC<HeaderProps> = ({ title, value, isLoading }) => {
//   return (
//     <div className="flex justify-between items-center">
//       <p>{title}</p>
//       {isLoading ? (
//         <Skeleton height="1.923rem" width="4.1rem" />
//       ) : (
//         <p className="bg-white py-2 px-3 text-[1.2rem] rounded-[4px]">
//           {value}
//         </p>
//       )}
//     </div>
//   );
// };

// const Sections: React.FC<SectionProps> = ({ children, className }) => {
//   return (
//     <div
//       className={`bg-[#F6F6F6] text-[1.4rem] py-[1.2rem] px-[1.6rem] ${className}`}
//       style={{ border: "1px solid #D9D9D980" }}
//     >
//       {children}
//     </div>
//   );
// };

// const Others: React.FC<OtherProps> = ({
//   items,
//   getValue,
//   value,
//   isLoading,
// }) => {
//   return (
//     <div
//       className="flex justify-between items-center pb-3 cursor-pointer"
//       style={{ borderBottom: "1px solid #D9D9D9" }}
//       onClick={() => getValue(items)}
//     >
//       <p>{items.title}</p>
//       {isLoading ? (
//         <Skeleton width="13rem" height="1.225rem" />
//       ) : (
//         <div className="flex gap-2 ">
//           <p>{value}</p>
//           <img src="/assets/icons/right-arrow.svg" alt="" />
//         </div>
//       )}
//     </div>
//   );
// };

// const getOptionsByTitle = (title: string) => {
//   const item = others.find((o) => o.title === title);
//   return item ? item.options : [];
// };
// const getIdByTitle = (title: string) => {
//   const item = others.find((o) => o.title === title);
//   return item ? item.id : "";
// };
// // const getOptionsByType = (title: string) => {
// //   const item = others.find((o) => o.title === title);
// //   return item ? item.type : "";
// // };

// const Preferences = () => {
//   // const [ageRange, setAgeRange] = useState<number[]>([20, 50]);

//   const [show, setShow] = useState<{ title: string } | null>(null);
//   const [distance, setDistance] = useState<number>(30);

//   const [data, setData] = useState<UserFilters>();
//   const [mutatedData, setMutatedData] = useState<UserFilters>();
//   const [isLoading, setIsloading] = useState<boolean>(false);

//   const fetchUserFilters = async () => {
//     setIsloading(true);
//     const data = (await useGetUserProfile("filters")) as UserFilters;
//     if (data) {
//       setData(data as UserFilters);
//       setMutatedData(data as UserFilters);
//       setDistance(Math.round(data?.distance as number));
//     } else {
//       console.log("No user profile data found.");
//     }
//     setIsloading(false);
//   };

//   useEffect(() => {
//     fetchUserFilters();
//   }, []);

//   const changed = JSON.stringify(data) !== JSON.stringify(mutatedData);

//   const getValue = (id: string | undefined): string => {
//     switch (id) {
//       case "preference":
//         return preference[mutatedData?.preference as number] ?? "choose";
//       case "education":
//         return education[mutatedData?.education as number] ?? "choose";
//       case "love_language":
//         return love_language[mutatedData?.love_language as number] ?? "choose";
//       case "zodiac":
//         return zodiac[mutatedData?.zodiac as number] ?? "choose";
//       case "family_plans":
//         return family_goal[mutatedData?.family_plans as number] ?? "choose";
//       case "communication_style":
//         return (
//           communication_style[mutatedData?.communication_style as number] ??
//           "choose"
//         );
//       case "smoke":
//         return smoking[mutatedData?.smoke as number] ?? "choose";
//       case "drink":
//         return drinking[mutatedData?.drink as number] ?? "choose";
//       case "workout":
//         return workout[mutatedData?.workout as number] ?? "choose";
//       case "pet_owner":
//         return pets[mutatedData?.pet_owner as number] ?? "choose";
//       default:
//         return "choose";
//     }
//   };

//   const pages = ["filter", "interest"];
//   const [currentPage, setCurrentPage] = useState<number>(0);

//   // useEffect(() => {
//   //   console.log(mutatedData);
//   // }, [mutatedData]);
//   const handleUpdate = () => {
//     useUpdateUserProfile("filters", auth ,fetchUserFilters, mutatedData);
//   };
//   return (
//     <div>
//       {pages[currentPage] === "filter" && (
//         <main className="flex flex-col gap-y-3">
//           {/* {JSON.stringify(data)} */}
//           <ProfileHeader
//             title="Preferences"
//             changed={changed}
//             save={handleUpdate}
//           />
//           <Sections>
//             <Header
//               title="Distance Search"
//               value={mutatedData?.distance + " " + "mi"}
//               isLoading={isLoading}
//             />
//             <SliderBar
//               getValue={(val) =>
//                 setMutatedData((prev) => ({ ...prev, distance: val }))
//               }
//               rangeColor="#C5C5C7"
//               trackColor="#ffffff"
//               thumbColor="white"
//               val={mutatedData?.distance}
//             />
//             <Switch
//               checks={mutatedData?.outreach}
//               setChecked={(e) => {
//                 setMutatedData((prev) => ({ ...prev, outreach: e }));
//               }}
//               // checkedValue={(val) =>
//               //   setMutatedData((prev) => ({ ...prev, outreach: val }))
//               // }
//               text="Show people outside my distance radius and country for better reach"
//             />
//             <hr className="my-4" />
//             <Header
//               title="Age range"
//               isLoading={isLoading}
//               value={`${mutatedData?.age_range?.min} - ${mutatedData?.age_range?.max}`}
//             />
//             <DoubleSliderBar
//               thumbColor="white"
//               rangeColor="#C5C5C7"
//               trackColor="#fff"
//               val={[
//                 mutatedData?.age_range?.min as number,
//                 mutatedData?.age_range?.max as number,
//               ]}
//               getValue={(range) =>
//                 setMutatedData((prev) => ({
//                   ...prev,
//                   age_range: { min: range[0], max: range[1] },
//                 }))
//               }
//             />
//           </Sections>
//           <Sections className="space-y-4">
//             <h1 className="text-[1.4rem[">I want to meet</h1>
//             {/* <div className="flex space-x-2">
//             {gender.map((item, i) => ( */}
//             <Tag
//               setGender={(gender) =>
//                 setMutatedData((prev) => ({ ...prev, gender }))
//               }
//               active={mutatedData?.gender}
//               arr={gender}
//             />
//             {/* ))}
//           </div> */}
//           </Sections>
//           <Sections className="space-y-4">
//             <Switch
//               checks={mutatedData?.similar_interest}
//               setChecked={(e) =>
//                 setMutatedData((prev) => ({ ...prev, similar_interest: e }))
//               }
//               text="Have similar interests"
//               textColor="black"
//             />
//             <hr />
//             <div
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//             >
//               <p>Add personalized interests</p>
//               <img src="/assets/icons/add.svg" alt="Add interests" />
//             </div>
//             <hr />
//             <Switch
//               checks={mutatedData?.has_bio}
//               setChecked={(e) =>
//                 setMutatedData((prev) => ({ ...prev, has_bio: e }))
//               }
//               text="Has a bio"
//               textColor="black"
//             />
//             <hr />
//           </Sections>
//           <Sections className="space-y-[1.6rem]">
//             {others.map((other, i) => (
//               <Others
//                 key={i}
//                 items={other}
//                 value={getValue(other.id)}
//                 getValue={(val) => setShow(val)}
//                 isLoading={isLoading}
//               />
//             ))}
//           </Sections>
//           {show && (
//             <div
//               className="fixed inset-0 bg-black opacity-50"
//               style={{ zIndex: 10 }}
//               onClick={() => setShow(null)}
//             />
//           )}
//           {/* {isLoading && (
//             <div
//               className="fixed inset-0 flex items-center justify-center bg-black opacity-50"
//               style={{ zIndex: 10 }}
//               onClick={() => setShow(null)}
//             >
//               {" "}
//               <ThreeCircles color="white" />
//             </div>
//           )} */}
//           {show && (
//             <PreferencesModal
//               item={{
//                 title: show.title,
//                 options: getOptionsByTitle(show.title),
//                 id: getIdByTitle(show.title),
//               }}
//               // type: getOptionsByType(show)
//               close={() => setShow(null)}
//               mutatedData={mutatedData as UserFilters}
//               setMutatedData={(key, value) =>
//                 setMutatedData((prev) => ({
//                   ...prev,
//                   [key as keyof UserFilters]: value,
//                 }))
//               }
//               // path="filters"
//             />
//           )}
//         </main>
//       )}
//       {pages[currentPage] === "interest" && <Habits path="filters" />}
//     </div>
//   );
// };

// export default Preferences;

// const gender = [
//   { image: "/assets/images/onboarding/men.svg", text: "Men" },
//   { image: "/assets/images/onboarding/women.svg", text: "Women" },
//   { image: "/assets/images/onboarding/everyone.svg", text: "Everyone" },
// ];

// const others = [
//   {
//     title: "Relationship Preference",
//     options: preference,
//     id: "preference",
//   },
//   {
//     title: "Education",
//     options: education,
//     id: "education",
//   },
//   {
//     title: "Love language",
//     options: love_language,
//     id: "love_language",
//   },
//   {
//     title: "Zodiac",
//     options: zodiac,
//     id: "zodiac",
//   },
//   {
//     title: "Future family plans",
//     options: family_goal,
//     id: "family_plans",
//   },
//   {
//     title: "How you communicate",
//     options: communication_style,
//     id: "communication_style",
//   },
//   {
//     title: "Smoker",
//     options: smoking,
//     id: "smoke",
//   },
//   {
//     title: "Drinking",
//     options: drinking,
//     id: "drink",
//   },
//   {
//     title: "Workout",
//     options: workout,
//     id: "workout",
//   },
//   {
//     title: "Pet owner",
//     options: pets,
//     id: "pet_owner",
//   },
//   // {
//   //   title: "City of residence",
//   //   type: "input",
//   //   id: "city",
//   // },
//   // {
//   //   title: "Height",
//   //   type: "range",
//   //   id: "height_range",
//   // },
//   // {
//   //   title: "Weight",
//   //   type: "range",
//   //   id: "weight_range",
//   // },
// ];
