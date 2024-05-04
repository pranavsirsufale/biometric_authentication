import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify'
import Error from './Error'
import {  CaptureFinger , GetMFS100Info, MatchFinger } from '../../mfs100-9.0.2.6'
import { IoFingerPrintSharp } from "react-icons/io5";


function Register() {
  const { storetokenInLs,isLoggedIn , base } = useAuth();
  const [ fingerImage , setFingerImage ] = useState('')
  const [ fingerKey , setFingerKey ] = useState('')
  const navigate = useNavigate();
  if(isLoggedIn){
    navigate('/')
  }
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    finger_image: '',
    finger_key: ''

  });

  const [ matchStatus, sestMatchStatus] = useState(false)
  const [ active , setActive ] = useState(false)
  const [ isDeviceAttached , setIsDeviceAttaced ] = useState(false)


  const CaptureFingerhere = () => {
    if(active){
      const fingerData = new CaptureFinger()
      console.log("finger data ",fingerData)
      setFingerImage(fingerData.data.BitmapData)
      setFingerKey(fingerData.data.AnsiTemplate)
      toast.info('finger has been Captured successfully')
    } else{
      toast.info('no device found ')
    }
  }

  const mathfingerhere = () => {
    // const fingerData 
    if(fingerKey !== '' ){
      sestMatchStatus(false)
      
      const matchData = new MatchFinger(80,5000,fingerKey)
      console.log("match status " , matchData);
      if(matchData.data?.Status){
        toast.success('matched successfully ')
        sestMatchStatus(true)
      }else { 
        toast.error('please capture fingerpring first')
      }
    } else{
      toast.info('finger not matched ! ❌☠ ')
      sestMatchStatus(false)
    }
  }
  
  const handleImageChange = () => {
    
   try {
     const client = new GetMFS100Info()
    //  const jsonClinet = client.json()
    //  console.log(jsonClinet);
     console.log(client);
     if(client.data?.DeviceInfo){
       setActive(true)
     }
     if(client.data.ErrorCode == "0" || client.data.ErrorDescription == 'Success'){
       setActive(true)
     }
     if(!active) toast.info('no device found')
   } catch (error) {
    
   }
  }
  
  //handling the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
      finger_image : fingerImage,
      finger_key : fingerKey
    });
    console.log(user);
  };

  //!handeling the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!fingerImage) return toast.info('first capture finger ')
    if(!fingerKey) return toast.info('first capture finger ')
    try {
      const response = await fetch(`${base}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        storetokenInLs(data.token);
        toast.success(`${data.message.username} has been registerd successfully`)
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
      } else {
        if (!response.ok) {
          const notOkResponse = await response.json();
          toast.error(notOkResponse.extraDetails ? notOkResponse.extraDetails : notOkResponse.message);
        }
      }
    } catch (error) {
      toast.error(error)
    }
  };

  useEffect(()=>{
    handleImageChange()
  },[])

  return !isLoggedIn ? (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="dealpoolcap.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registraion form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>

                  {/* <button type="button" onClick={()=>mathfingerhere()}>
                    Match finger 🖐
                  </button> */}


                  <div 
                  style={{width:'100vw',
                  height:'100vh',
                  display:'flex',
                  justifyContent:'center',
                  alignItems : "center",
                  flexDirection:'column'
                }}
                
                  >
                    <h2> Check Biometric Muahcine</h2>
                    <div 
                    style={{
                      margin:'10px',
                    }}
                    >
                      <IoFingerPrintSharp  onClick={()=>CaptureFingerhere()}
                      color={active == true ? "green" : 'pink' }
                      size={43}
                      />
                    </div>


                      <button type="button" onClick={handleImageChange} > check </button>
                    {/* <img src={`data:image/png;base64,${fingerImage}`} alt="fingerImage" /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  ) : <Error/>
}

export default Register;
