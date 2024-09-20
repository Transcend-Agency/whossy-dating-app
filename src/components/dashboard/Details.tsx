// import { drinking, education, family_goal, love_language, marital_status, pets, relationship_preferences, religion, smoking, workout, zodiac } from "@/constants";
// import { useGetUserProfile } from "@/hooks/useUser";
// import { UserFilters, UserPrefences, UserProfile } from "@/types/user";
// import { useEffect, useState } from "react";

// const Details = ({
//     items,
//     navigate,
//     setShow,
//   }: {
//     items: {
//       title: string;
//       value: string;
//       page?: number;
//       options?: string[];
//       notChange?: boolean;
//       id?: string;
//       placeholder?: string;
//       range?: number;
//       arrayNumber?: number;
//     }[];
//     navigate?: (i: number | undefined) => void;
//     setShow: (s: any) => void;
//   }) => {
//     const [fetchedUserProfile, setFetchedUserProfile] = useState<UserFilters>({});
//     const [fetchedUserPreferences, setFetchedUserPreferences] =
//       useState<UserFilters>({});
  
//     const fetchUserProfile = async () => {
//       const userProfile = await useGetUserProfile("users");
  
//       if (userProfile) {
//         setFetchedUserProfile(userProfile);
//       } else {
//         console.log("No user profile data found.");
//       }
//     };
//     const fetchUserPreferences = async () => {
//       const userPrefences = await useGetUserProfile("preferences");
  
//       if (userPrefences) {
//         setFetchedUserPreferences(userPrefences as UserFilters);
//       } else {
//         console.log("No user preferences data found.");
//       }
//     };
//     useEffect(() => {
//       fetchUserProfile();
//       fetchUserPreferences();
//     }, []);
//     const getValue = (id: string | undefined): string | null => {
//       switch (id) {
//         case "preference":
//           return (
//             relationship_preferences[fetchedUserPreferences.preference as number]
//               ?.title ?? "choose"
//           );
//         case "drink":
//           return drinking[fetchedUserPreferences.drink as number] ?? "choose";
//         case "smoke":
//           return smoking[fetchedUserPreferences.smoke as number] ?? "choose";
//         case "workout":
//           return workout[fetchedUserPreferences.workout as number] ?? "choose";
//         case "pet_owner":
//           return pets[fetchedUserPreferences.pet_owner as number] ?? "choose";
//         case "education":
//           return education[fetchedUserPreferences.education as number] ?? "choose";
//         case "love_language":
//           return (
//             love_language[fetchedUserPreferences.love_language as number] ??
//             "choose"
//           );
//         case "zodiac":
//           return zodiac[fetchedUserPreferences.zodiac as number] ?? "choose";
//         case "family_goal":
//           return (
//             family_goal[fetchedUserPreferences.family_goal as number] ??
//             "choose"
//           );
//         case "marital_status":
//           return (
//             marital_status[fetchedUserPreferences.marital_status as number] ??
//             "choose"
//           );
//         case "interests":
//           return fetchedUserPreferences.interests?.[0] ?? "choose";
//         case "religion":
//           return religion[fetchedUserPreferences.religion as number] ?? null;
//         default:
//           return "chooose";
//       }
//     };
//     return (
//       <section
//         className="bg-[#F6F6F6] px-[1.6rem] my-5"
//         style={{
//           borderTop: "1px solid #D9D9D980",
//           borderBottom: "1px solid #D9D9D980",
//         }}
//       >
//         {items.map((item, i) => (
//           <div
//             className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer"
//             style={{
//               borderBottom: i !== items.length - 1 ? "1px solid #D9D9D9" : "",
//             }}
//             key={i}
//             onClick={() => {
//               if (navigate && item.page) {
//                 navigate(item.page);
//               } else {
//                 console.log("pressed");
//                 if (!item.notChange) {
//                   setShow({
//                     title: item.title,
//                     options: item.options,
//                     placeholder: item.placeholder,
//                     range: item.range,
//                     value: getValue(item.id),
//                     id: item.id,
//                     // arrayNumber: typeof(fetchedUserPreferences[item.id] ?? 5) === 'number'
//                   });
//                 }
//               }
//             }}
//           >
//             <p>{item.title}</p>
//             <div className="flex text-[#8A8A8E] gap-[0.8rem]">
//               {item.value === "user_profile" && (
//                 <p>{fetchedUserProfile[item.id as keyof UserFilters]}</p>
//               )}
  
//               {/* {item.value === "user_preferences" && (
//                 <p>
//                   {fetchedUserPreferences[ item.id as keyof UserPrefences
//                   ]?.toString()}
//                 </p>
//               )} */}
//               {item.id && <p>{getValue(item.id)}</p>}
//               {!item.notChange && (
//                 <img src="/assets/icons/right-arrow.svg" alt="" />
//               )}
//             </div>
//           </div>
//         ))}
//       </section>
//     );
//   };

//   export default Details