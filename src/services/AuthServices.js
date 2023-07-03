import axios from 'axios';
import { apiUrl } from '../utils/constants';

export const loginService = async (userData) => {
  const response = await axios.post(
    'https://twirlo-backend-1.vercel.app/api/auth/signin',
    { ...userData }
  );

  const { token } = response.data;
 
  return { token };
};
export const SignUpService = async (userData) => {
  const response = await axios.post(
    'https://twirlo-backend-1.vercel.app/api/auth/register',
    { ...userData }
  );
  return response.data;
};

export const getSingleUserDetail=async (token,id)=>{
  const response = await axios.get(`https://twirlo-backend-1.vercel.app/api/user/${id}`,{
    headers: {
      Authorization: token,
    },
  });
  const {user}=response.data;
  return {user} ;
}

export const updateUserInfo=async(token,updateInfo)=>{
  try{
    const response=await axios.patch(`${apiUrl}/user/update`,{
      ...updateInfo
    },
    {
      headers: {
        Authorization: token,
      },
    }	)
    console.log(response.data);
  }catch(error){
    console.log("Error in updating user info", error);
  }
}