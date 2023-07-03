import axios from 'axios';
import { TYPE, apiUrl } from '../utils/constants';

// get all user of the app
export const getAllUser = async (token, dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/user`, {
      headers: {
        Authorization: token,
      },
    });
    // console.log(response);
    dispatch({ type: TYPE.GET_ALL_USER, payload: response.data.users });
  } catch (error) {
    console.log('error in get user list', error);
  }
};

// this gives all post that are on app
export const getAllPost = async (token, dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/post`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: TYPE.GET_ALL_POST, payload: response.data.posts });
  } catch (error) {
    console.log(error);
  }
};

// this gives all post that are posted by a user
export const getAllPostOfUser = async (token, id, dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/user/all-posts/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: TYPE.GET_ALL_POST_OF_USER, payload: response.data.posts });
  } catch (error) {
    console.log(error);
  }
};

// like a post
export const likePostService = async (token, postId) => {
  try {
    const response = await axios.post(
      `${apiUrl}/post/like`,
      {
        postId: postId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log('like error', error);
  }
};

// dislike a post
export const dislikePostService = async (token, postId) => {
  try {
    const response = await axios.post(
      `${apiUrl}/post/dislike`,
      {
        postId: postId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log('like error', error);
  }
};

// bookmarks a post

export const bookmarkPostService = async (token, postId) => {
  try {
    await axios.post(
      `${apiUrl}/post/bookmark/${postId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log('bookmark error', error);
  }
};

export const unbookmarkPostService = async (token, postId) => {
  try {
    await axios.delete(`${apiUrl}/post/bookmark/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.log('unbookmark error', error);
  }
};

// get bookmarks post
export const getBookmarkPost = async (token, dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/post/bookmark`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: TYPE.GET_BOOKMARKS, payload: response.data.bookmarks });
  } catch (error) {
    console.log('getBookmark error', error);
    throw error;
  }
};

// create new post

export const createNewPost = async (token, inputData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/post`,
      {
        ...inputData,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log({ response });
  } catch (error) {
    console.log(error);
  }
};

// edit post
export const editPost = async (token, inputData, dispatch) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/post/${inputData._id}`,
      {
        ...inputData,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: TYPE.EDIT_POST, payload: inputData });
    console.log(response);
  } catch (error) {
    console.log('edit post error', error);
  }
};

// delete post
export const deletePost = async (token, postId) => {
  try {
    await axios.delete(`${apiUrl}/post/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.log('delete post', error);
  }
};

// follow user

export const followUser = async (token, userId) => {
  try {
    await axios.post(
      `${apiUrl}/user/follow`,

      {
        followId: userId, // userID of the person you wish to follow
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const unfollowUser = async (token, userId) => {
  try {
    console.log('unfollow');

    const response=await axios.post(
      `${apiUrl}/user/unfollow`,

      {
        unfollowId: userId, // userID of the person you wish to unfollow
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
