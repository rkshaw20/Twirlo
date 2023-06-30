import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useAuthContext } from './AuthContextProvider';
import { getAllPost, getAllPostOfUser, getBookmarkPost } from '../services/DataServices';
import { dataInitialState, dataReducer } from '../reducers/DataReducer';

const DataContext = createContext({
  allPost: [],
  userAllPost: [],
  bookmarks:[],
  loader: '',
  dispatch: () => {},
  setLoader: () => {},
});

export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const { token, user } = useAuthContext();
  const [loader, setLoader] = useState(false);

  
  useEffect(() => {
    if (token && user) {
      getAllPost(token, dispatch);
      getAllPostOfUser(token, user._id, dispatch);
      getBookmarkPost(token,dispatch)
    }
  }, [token,user]);

  // console.log({state})

  return (
    <DataContext.Provider
      value={{
        userAllPost: state.userAllPost,
        allPost: state.allPost,
        bookmarks:state.bookmarks,
        dispatch,
        loader,
        setLoader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
