import axios from "axios"
import { TYPE } from "../utils/constants";

export const getAllPost=async(token,dispatch,setLoader)=>{
    try{
        setLoader(true)
        const response=await axios.get(`https://twirlo-backend-1.vercel.app/api/post`,{
            headers: {
              Authorization: token,
            },
        })
        setLoader(false);
        dispatch({type:TYPE.GET_ALL_POST, payload:response.data.posts})
    }catch(error){
        console.log(error);
    }
}
export const getAllPostOfUser= async (token,id,dispatch,setLoader)=>{
    try{
        setLoader(true)
        const response=await axios.get(`https://twirlo-backend-1.vercel.app/api/user/all-posts/${id}`,{
            headers: {
              Authorization: token,
            },
        })
        setLoader(false);
        dispatch({type:TYPE.GET_ALL_POST_OF_USER, payload:response.data.posts})
    }catch(error){
        console.log(error);
    }
}