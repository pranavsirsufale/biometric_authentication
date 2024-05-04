import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function AdminUsers() {
  const { allUsers, setAllUsers, token, getAllUsers , base } = useAuth();
  const navigate = useNavigate()

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${base}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json'
          }
        }
      );

      const deletedUser = await response.json();
      if(!response.ok) return toast.error(deletedUser.message || 'User not deleted')
      if(response.ok){
        getAllUsers()
        toast.info(`${deletedUser.username} has been deleted`)

      }

    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return allUsers ? (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1> Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th> Username </th>
                <th> Email </th>
                <th> Phone </th>
                <th> Update </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((curUser) => {
                return (
                  <tr key={curUser._id}>
                    <td> {curUser.username} </td>
                    <td> {curUser.email} </td>
                    <td> {curUser.phone} </td>
                    <td> 
                      <Link to={`/admin/users/${curUser._id}`} Component={{curUser}} >

                      <button className="update-btn" onClick={()=>navigate(`${curUser._id}`)}  >
                        Update 
                      </button>
                      </Link>
                       </td>

                    <td>

                      <button className="delete-btn" onClick={()=>deleteUser(curUser._id)} >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  ) : (
    <h1> No User Found </h1>
  );
}

export default AdminUsers;
