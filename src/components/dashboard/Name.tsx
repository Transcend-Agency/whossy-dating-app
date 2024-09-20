// import { useGetUserProfile, useUpdateUserProfile } from "@/hooks/useUser";
// import { useEffect, useState } from "react";
// import ProfileHeader from "./ProfileHeader";
// import { useNavigate } from "react-router-dom";
// import { User } from "@/types/user";

// const Name = () => {
//   const [initialData, setInitialData] = useState({
//     "First Name": "",
//     "Last Name": "",
//   });
//   const [name, setName] = useState({
//     "First Name": "",
//     "Last Name": "",
//   });

//   const handleUpdate = () => {
//     useUpdateUserProfile("users",  fetchUserProfile, {
//       first_name: name["First Name"],
//       last_name: name["Last Name"],
//     });
//   };
//   const fetchUserProfile = async () => {
//     const userProfile = await useGetUserProfile("users") as User;

//     if (userProfile) {
//       setName({
//         "First Name": userProfile.first_name as string,
//         "Last Name": userProfile.last_name as string,
//       });
//       setInitialData({
//         "First Name": userProfile.first_name as string,
//         "Last Name": userProfile.last_name as string,
//       });
//     } else {
//       console.log("No user profile data found.");
//     }
//   };
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const navigate = useNavigate();

//   const hasChanged =
//     initialData["First Name"] !== name["First Name"] ||
//     initialData["Last Name"] !== name["Last Name"];
//   return (
//     <>
//       <ProfileHeader
//         title="Edit Profile"
//         changed={hasChanged}
//         save={handleUpdate}
//         goBack={() => navigate('/dashboard/profile/edit')}
//       />
//       <section
//         className="bg-[#F6F6F6] px-[1.6rem]"
//         style={{
//           borderTop: "1px solid #D9D9D980",
//           borderBottom: "1px solid #D9D9D980",
//         }}
//       >
//         {Object.keys(name).map((item, i) => (
//           <div
//             className="flex justify-between py-[1.2rem] text-[1.4rem] border-[#D9D9D9] cursor-pointer"
//             style={{
//               borderBottom:
//                 i !== Object.keys(name).length - 1 ? "1px solid #D9D9D9" : "",
//             }}
//             key={i}
//           >
//             <p>{item}</p>
//             <div className="flex text-[#8A8A8E] gap-[0.8rem]">
//               <input
//                 value={
//                   name[
//                     item as keyof { "First Name": string; "Last Name": string }
//                   ]
//                 }
//                 onChange={(e) => {
//                   setName((prev) => ({ ...prev, [item]: e.target.value }));
//                 }}
//                 className="w-[7rem] bg-inherit outline-none text-end"
//               />
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// };

// export default Name;
