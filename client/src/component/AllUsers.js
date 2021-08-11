import React, { useEffect, useState } from "react";
import baseURL from "../config/baseURL";
import axios from "axios";

export default function AllUsers() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();

  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userData = await axios.get(baseURL + "users/" + userId);
      // console.log(userData);
      setUser(userData.data);
    }
  };

  const getAllUsers = async (e) => {
    try {
      const users = await axios(baseURL + "users");
      console.log(users.data.data);
      setUsers(users.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    getAllUsers();
  }, []);

  return user ? (
    <div className="container Page ">
      <h1>All Users</h1>
      <h4>Hallo {user.userName}</h4>
      <h4>{user.email}</h4>
      {users && users.length > 0 ? (
        <h5 className="m-5 bg-info text-center p-3">{users.length} Users</h5>
      ) : (
        <div>Loading</div>
      )}

      {users && users.length > 0 ? (
        users.map((user) => {
          return (
            <div className="" key={user.id}>
              <li className="d-flex m-1 align-items-center border">
                <div className="d-flex align-items-center ">
                  <img src={user.avatar} className="" width="50" alt="2" />
                  <p className="bg-success ms-2 text-white rounded-pill text-center">
                    <span className="p-5">User Name: {user.userName}</span>{" "}
                  </p>
                  <p className="bg-warning ms-2  rounded-pill">
                    <span className="p-5">Email: {user.email}</span>{" "}
                  </p>
                  <p className="bg-danger ms-2 text-white rounded-pill">
                    <span className="p-5">
                      Admin: {user.isAdmin.toString()}
                    </span>{" "}
                  </p>
                </div>
              </li>
            </div>
          );
        })
      ) : (
        <div>No Users</div>
      )}
    </div>
  ) : (
    <div>loading</div>
  );
}

// return user? (
//     <div className='container '>
//          <h1>All Users</h1>
//        <h4>Hallo {user.userName}</h4>
//        <h4>{user.email}</h4>

//  {users && users.length >0 ? (users.map((user)=>{
//
//      return (    <div className='container' key={user.id}>
//         <li className='d-flex m-3 justify-content-between border'>
//         <div className='d-flex align-items-center'>
//             <img src={user.avatar} className="" width='100' alt="2"/>
//             <p className='bg-white ms-2'>{user.userName}</p>
//         </div>
//      </li>
//  </div> )

//  })): <div>No Users</div> }
//     </div>
// ): <div>
//     loading
// </div>

// return users && users.length >0 ?(
//     users.map((user)=>{
//         return(
//           <div className='container' key={user.id}>
//           <li className='d-flex m-3 justify-content-between border'>
//              <div className='d-flex align-items-center'>
//                  <img src={user.avatar} className="" width='100' alt="2"/>
//                  <p className='bg-white ms-2'>{user.userName}</p>
//              </div>
//           </li>
//       </div>
//         )
//     })
//   ): <div>No Users</div>
