import { createContext, useContext, useEffect, useState } from "react"
import { getLocalStorage, setLocalStorage } from "../utils/utils";
import jwtDecode from "jwt-decode";
import { getSingleUserDetail } from "../services/AuthServices";


const AuthContext=createContext(null);

export const useAuthContext=()=>useContext(AuthContext)


const AuthContextProvider =({children})=>{
  const [user, setUser]=useState(getLocalStorage('user'));
  const [token, setToken]=useState(getLocalStorage('token'));
       

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const userData = await getSingleUserDetail(token, decodedToken._id);
        setLocalStorage('user',userData.user);
        // setUser(userData)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);
  

  return (
    <AuthContext.Provider value={{user, setUser, token, setToken}} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;