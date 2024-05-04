import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import Error from "./Error";
import {
  CaptureFinger,
  GetMFS100Info,
  MatchFinger,
} from "../../mfs100-9.0.2.6";
import { IoFingerPrintSharp } from "react-icons/io5";

function Login() {
  const { storetokenInLs, isLoggedIn, userData, base } = useAuth();
  const [matchStatus, sestMatchStatus] = useState(false);
  const [active, setActive] = useState(false);
  const [fingerKey, setFingerKey] = useState("");
  const [isLoginViaBio, setIsLoginViaBio] = useState(false);
  const [ token , setToken] = useState('')
  console.log(fingerKey);

  const navigate = useNavigate();
  // if(isLoggedIn) navigate('/')

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // const CaptureFingerhere = () => {
  //   if(active){
  //     const fingerData = new CaptureFinger()
  //     console.log("finger data ",fingerData)
  //     setFingerImage(fingerData.data.BitmapData)
  //     setFingerKey(fingerData.data.AnsiTemplate)
  //     toast.info('finger has been Captured successfully')
  //   } else{
  //     toast.info('no device found ')
  //   }
  // }

  const handleImageChange = async () => {
    const client = new GetMFS100Info();
    console.log(client);
    if (client.data?.DeviceInfo) {
      setActive(true);
    }
    // if (
    //   client.data.ErrorCode == "0" ||
    //   client.data.ErrorDescription == "Success"
    // ) {
    //   setActive(true);
    // }
    if(active){
      const resopnse = await fetch(`${base}/api/auth/login/bio`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await resopnse.json()
      console.log(data);
      if(resopnse.ok){
        setFingerKey(data.finger_key);
        if(fingerKey && fingerKey.length > 0){
          setToken(data.token);
          mathfingerhere()
        //   if(matchStatus){
            
          // toast.success("User logged in successfully");
          //   }
          
        }
        
      }

      


      return new Promise((resolve, reject )=>{
        resolve( data.token )
      })
    }
    if (!active) toast.info("no device found");
  }

  // handleImageChange.then()


   


  const mathfingerhere = () => {
    // const fingerData
    if (fingerKey !== "") {
      sestMatchStatus(false);

      const matchData = new MatchFinger(80, 5000, fingerKey);
      console.log("match status ", matchData);
      if (matchData.data?.Status) {
        sestMatchStatus(true);
      } else {
        toast.error("finger not matched ! ❌☠ ");
      }
    } else {
      toast.info("please capture fingerpring first");
      sestMatchStatus(false);
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const url = `${base}/api/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        storetokenInLs(data.token);
        setFingerKey(data.user.finger_key);
        toast.success("User logged in successfully");

        // setUser({
        //   username: "",
        //   password: "",
        // });
        // navigate("/");
      } else {
        if (!response.ok) {
          const notOkResponse = await response.json();
          console.log(notOkResponse);
          toast.error(
            notOkResponse.extraDetails
              ? notOkResponse.extraDetails
              : notOkResponse.message
          );
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  //  !isLoggedIn ?
  return (
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
              <h1 className="main-heading mb-3">Login form</h1>
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

                {isLoginViaBio ? (
                  <>
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

                    <div className="grid grid-two-cols toggle-login">
                      <button type="submit" className="btn btn-submit">
                        Login
                      </button>
                      <button type="button" onClick={()=>setIsLoginViaBio(!isLoginViaBio)} className="btn btn-submit">
                        biometric Login
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                  <div
                    style={{
                      width: "80%",
                      height: "30vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    { fingerKey && 
                    <>
                    <h2> Check Biometric Muahcine</h2>
                    <div
                      style={{
                        margin: "10px",
                      }}
                    >
                      <IoFingerPrintSharp
                        onClick={() => mathfingerhere()}
                        color={active == true ? "green" : "pink"}
                        size={43}
                      />
                    </div>
                    </>
                    }

                    <button type="button" onClick={handleImageChange}>
                      {" "}
                      check{" "}
                    </button>
                    {/* <img src={`data:image/png;base64,${fingerImage}`} alt="fingerImage" /> */}
                  </div>

                  <div className="grid grid-two-cols toggle-login">
                      {/* <button type="submit" className="btn btn-submit ">
                      Login
                    </button> */}
                     
                      <button type="button" onClick={()=>setIsLoginViaBio(!isLoginViaBio)} className="btn btn-submit">
                        Password Login
                      </button>
                    </div>


                    </>

                )}

                {/* finger finctionality  */}
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
  // : <Error/>
}

export default Login;
