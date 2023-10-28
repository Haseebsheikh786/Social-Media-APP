// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// // import '@testing-library/jest-dom';
// import React, { useEffect } from "react";
// import "./index.css";
// import LeftCol from "../../component/leftCol";
// import RightCol from "../../component/rightCol";
// import MainCol from "../../component/mainCol";
// import { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectLoggedInUser } from "../auth/authSlice";

// const Home = () => {
//   const UserId = useSelector(selectLoggedInUser);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [users, setUsers] = useState([]);
//   const [friends, setfriends] = useState([]);
//   const [AddRemfriend, setAddRemfriend] = useState();

//   const addRemoveuser = async (id) => {
//     const response = await axios.patch(
//       `/auth/${UserId._id}/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       }
//     );
//     setAddRemfriend(response.data);
//   };

//   useEffect(() => {
//     const FetchAllFriends = async () => {
//       const response = await axios.get("/auth/getFriend", {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       setfriends(response.data);
//     };
//     FetchAllFriends();
//   }, [AddRemfriend, UserId]);

//   useEffect(() => {
//     const FetchAllUsers = async () => {
//       const response = await axios.get("/auth/users", {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       setUsers(response.data);
//     };
//     FetchAllUsers();
//   }, [AddRemfriend, UserId]);
//   return (
//     <>
//       <div className="Container">
//         <div id="leftCol">
//           <LeftCol
//             users={users}
//             friends={friends}
//             addRemoveuser={addRemoveuser}
//           />
//         </div>
//         <div id="mainCol">
//           <MainCol />
//         </div>
//         <div id="rightCol">
//           <RightCol
//             users={users}
//             friends={friends}
//             addRemoveuser={addRemoveuser}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


