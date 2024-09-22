// import { useEffect, useState } from "react";
// import ProfileHeader from "./ProfileHeader";
// import { useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";
// import { User } from "@/types/user";

// const Email = () => {
//   const [initialData, setInitialData] = useState("");
//   const [email, setEmail] = useState("");
//   const fetchUserProfile = async () => {
//     const userProfile = (await useGetUserProfile(
//       "users"
//     )) as User;

//     if (userProfile) {
//       setEmail(userProfile.email as string);
//       setInitialData(userProfile.email as string);
//     } else {
//       console.log("No user profile data found.");
//     }
//   };
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const handleUpdate = () => {
//     useUpdateUserProfile(
//       "users",
//       fetchUserProfile,
//       {
//         email,
//       }
//     );
//   };
//   return (
//     <>
//       <ProfileHeader
//         title="Edit Profile"
//         changed={email !== initialData}
//         save={handleUpdate}
//       />
//       <section
//         className="bg-[#F6F6F6] px-[1.6rem]"
//         style={{
//           borderTop: "1px solid #D9D9D980",
//           borderBottom: "1px solid #D9D9D980",
//         }}
//       >
//         <div className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer">
//           <header className="flex gap-2 items-center">
//             <p>Email</p>
//             <div className="text-[1.2rem] bg-[#0CB25A] text-white px-[0.8rem] py-[0.4rem] rounded-full">
//               Verified
//             </div>
//           </header>
//           <div className="flex text-[#8A8A8E] gap-[0.8rem]">
//             <input
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               className="w-[26rem] bg-inherit outline-none text-end"
//             />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Email;
