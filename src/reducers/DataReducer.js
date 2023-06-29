import { TYPE } from '../utils/constants';

export const dataInitialState = {
  allPost: [],
  userAllPost: [],
  bookmarks:[],
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

    default:
      return;
  }
};
