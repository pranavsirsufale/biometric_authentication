import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";

function AdminUsersUpdate() {
  let { id } = useParams();
  const { token , base } = useAuth();
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const getTheUserDetails = async (id) => {
    try {
      const response = await fetch(
        `${base}/api/admin/user/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setUser({
        username: responseData.username,
        email: responseData.email,
        phone: responseData.phone,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${base}/api/admin/user/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const updatedUser = await response.json();
      if (response.ok) {
        toast.success("user details have been updated successfully");
        navigate('/admin/users')
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    getTheUserDetails(id);
  }, []);

  return (
    <div className="registration-form">
      <h1 className="main-heading mb-3"> Update User </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={user.username}
            onChange={handleInput}
            name="username"
            placeholder="username"
          />
        </div>

        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            value={user.email}
            onChange={handleInput}
            name="email"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="phone">phone</label>
          <input
            type="number"
            value={user.phone}
            onChange={handleInput}
            name="phone"
            placeholder="phone"
          />
        </div>

        <br />
        <button type="submit" className="btn btn-submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default AdminUsersUpdate;
