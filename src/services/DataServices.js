import axios from 'axios';
import { TYPE, apiUrl } from '../utils/constants';

// this gives all post that are on app
export const getAllPost = async (token, dispatch, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.get(
      `https://twirlo-backend-1.vercel.app/api/post`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setLoader(false);
    dispatch({ type: TYPE.GET_ALL_POST, payload: response.data.posts });
  } catch (error) {
    console.log(error);
  }
};

// this gives all post that are posted by a user
export const getAllPostOfUser = async (token, id, dispatch, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.get(
      `https://twirlo-backend-1.vercel.app/api/user/all-posts/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setLoader(false);
    dispatch({ type: TYPE.GET_ALL_POST_OF_USER, payload: response.data.posts });
  } catch (error) {
    console.log(error);
  }
};

// like a post
export const likePostService = async (token, postId, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.post(
      'https://twirlo-backend-1.vercel.app/api/post/like',
      {
        postId: postId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setLoader(false);
  } catch (error) {
    console.log('like error', error);
  }
};

// dislike a post
export const dislikePostService = async (token, postId, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.post(
      'https://twirlo-backend-1.vercel.app/api/post/dislike',
      {
        postId: postId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setLoader(false);
  } catch (error) {
    console.log('like error', error);
  }
};

// bookmarks a post

export const bookmarkPostService = async (token, postId, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.post(
      `https://twirlo-backend-1.vercel.app/api/post/bookmark/${postId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setLoader(false);
  } catch (error) {
    console.log('bookmark error', error);
  }
};
export const unbookmarkPostService = async (token, postId, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.delete(
      `https://twirlo-backend-1.vercel.app/api/post/bookmark/${postId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setLoader(false);
  } catch (error) {
    console.log('bookmark error', error);
  }
};

// get bookmarks post
export const getBookmarkPost = async (token,dispatch, setLoader) => {
  try {
    setLoader(true);
    const response = await axios.get(`${apiUrl}/post/bookmark`, {
      headers: {
        Authorization: token,
      },
    });
    setLoader(false);
    dispatch({ type: TYPE.GET_BOOKMARKS, payload: response.data.bookmarks });
    
  } catch (error) {
    console.log('bookmark error', error);
    throw error;
  }
};
