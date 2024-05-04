import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify'

function Contact() {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData, setsUserData] = useState(true);

  const { user , base } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setsUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${base}/api/form/contact`,{
        method:"POST",
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(contact)
      })
      if(response.ok){
        const okResponse = await response.json()
        toast.success(okResponse.message)
        setContact({
          username: user.username,
          email: user.email,
          message: "",
        })
      }
      



    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="body.png" alt="we are always ready o help" />
          </div>

          {/* contact conteant actual  */}
          <div className="section-form">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="username"> Username </label>
                <input
                  type="text"
                  name="username"
                  readOnly
                  value={contact.username}
                  onChange={(e) => handleInput(e)}
                  id="username"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="email"> email </label>
                <input
                  type="text"
                  name="email"
                  readOnly
                  value={contact.email}
                  onChange={(e) => handleInput(e)}
                  id="email"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="message"> Message </label>
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={(e) => handleInput(e)}
                  id="message"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
