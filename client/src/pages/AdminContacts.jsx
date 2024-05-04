import React, { useEffect } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

function AdminContacts() {
  const { getAllContacts, setAllContacts, allContacts , base } = useAuth();
  const { token } = useAuth()

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${base}/api/admin/contacts/delete/${id}`,{
        method:'DELETE',
        headers:{
          Authorization : `Bearer ${token}`,
        }
      })
      if(response.ok){
        getAllContacts()
        toast.info('message has been deleted successfully ')
      }
    } catch (error) {
      toast.error(error)
    }
  };

  console.log(allContacts);
  useEffect(() => {
    getAllContacts();
  }, []);

  return allContacts ? (
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
                <th> Message </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {allContacts.map((curUser) => {
                return (
                  <tr key={curUser._id}>
                    <td> {curUser.username} </td>
                    <td> {curUser.email} </td>
                    <td>{curUser.message}</td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(curUser._id)}
                      >
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
    <h2> No Message Found </h2>
  );
}

export default AdminContacts;
