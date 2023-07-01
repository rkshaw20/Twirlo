import { TYPE } from '../utils/constants';

export const dataInitialState = {
  allPost: [],
  userAllPost: [],
  bookmarks: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case TYPE.GET_ALL_POST_OF_USER: {
      return {
        ...state,
        userAllPost: [...action.payload],
      };
    }
    case TYPE.GET_ALL_POST: {
      return {
        ...state,
        allPost: [...action.payload],
      };
    }
    case TYPE.GET_BOOKMARKS: {
      return {
        ...state,
        bookmarks: [...action.payload],
      };
    }
    case TYPE.EDIT_POST: {
      return {
        ...state,
        allPost: state.allPost.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }

    default:
      return;
  }
};
