import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useAuthContext } from './AuthContextProvider';
import {
  getAllPost,
  getAllPostOfUser,
  getAllUser,
  getBookmarkPost,
} from '../services/DataServices';
import { dataInitialState, dataReducer } from '../reducers/DataReducer';

const DataContext = createContext({
  allUser: [],
  allPost: [],
  userAllPost: [],
  bookmarks: [],
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
      setLoader(true);
      getAllUser(token, dispatch);
      getAllPost(token, dispatch);
      getBookmarkPost(token, dispatch);
      setLoader(false);
    }
  }, [token, user]);

  return (
    <DataContext.Provider
      value={{
        allUser: state.allUser,
        userAllPost: state.userAllPost,
        allPost: state.allPost,
        bookmarks: state.bookmarks,
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
