import { Heading } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { useAuthContext } from "../contexts/AuthContextProvider";
import { useDataContext } from "../contexts/DataContextProvider";
import { useEffect } from "react";
import { getAllPost } from "../services/DataServices";

const Explore=()=>{
  const {allPost,dispatch,setLoader,}=useDataContext();
   

  

    return (
        <>
          <Heading m={2} size='lg'>Explore</Heading>
           {allPost.length>0 && allPost.map((post)=>(
            <PostCard key={post._id} post={post} />
           ))}
           
        </>        
    )
}

export default Explore;