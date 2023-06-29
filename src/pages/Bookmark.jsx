import { Heading } from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useDataContext } from '../contexts/DataContextProvider';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useEffect } from 'react';
import { getSingleUserDetail } from '../services/AuthServices';
import { getBookmarkPost } from '../services/DataServices';
import { useState } from 'react';

const Bookmark = () => {
  const {  token  } = useAuthContext();
  const {bookmarks,setLoader, dispatch}=useDataContext();
  

useEffect(()=>{
  getBookmarkPost(token,dispatch,setLoader)
},[token,dispatch,setLoader])

  if(!bookmarks.length) return;
  return (
    <>
      <Heading size="lg">Bookmark</Heading>
      {bookmarks.map((post)=>(
        <PostCard key={post._id} post={post} isBookmark />
      ))}
    </>
  );
};

export default Bookmark;
