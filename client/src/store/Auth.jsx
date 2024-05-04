import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services , setServices] = useState([])
  const [allUsers, setAllUsers ] = useState([])
  const [allContacts, setAllContacts ] = useState([])

  const base = `http://localhost:3000`

  const storetokenInLs = (serverToken) => {
    setToken(serverToken)
    localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  //? logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //jwt authentication - to get the currently logged in user data

  const userAuthentication = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.log("error fetching user data ");
    }
  };


  const getService = async () => {
    if( !services.length > 0  ){
      try {
        const response = await fetch(`http://localhost:3000/api/service`,{
          method:'GET',
          headers:{
            'Content-Type': 'applicatoin/json'
          }
        })
        if(response.ok){
          const serviceData = await response.json()
          setServices(serviceData.response)
        }
  
      } catch (error) {
          console.log('error occred service' , error);
          setError(error)
      }
    }
  }

  const getAllUsers = async () => {
    try {
      let users = await fetch(`http://localhost:3000/api/admin/users`,{
        method : "GET",
        headers : {
          "Authorization": `Bearer ${token}`
        }
      })
      if(users.ok){
        let userData = await users.json();
        setAllUsers(userData)
      }
    } catch (error) {
      toast.error(error)
    }
  }


  const getAllContacts = async () => {
    try {
      let contactResponse = await fetch(`http://localhost:3000/api/admin/contacts`,{
        method:'GET',
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })

      if(contactResponse.ok){
        let userAllContacts = await contactResponse.json()
        setAllContacts(userAllContacts)
      }

    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userAuthentication,
        isLoggedIn,
        storetokenInLs,
        LogoutUser,
        services,
        setServices,
        getService,
        allUsers,
        setAllUsers,
        token,
        getAllUsers,
        setAllContacts,
        getAllContacts,
        allContacts,
        base
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) throw new Error("auth used outisde of the provider ");
  return AuthContextValue;
};
