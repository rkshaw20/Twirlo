import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContextProvider";


export const RequireAuth = ({ children }) => {

    const { token } = useAuthContext();
  
    const location =useLocation()
    if (!token) {
      return <Navigate to="/login" state={{path:location.pathname}}/>;
    }
    return children;
  };