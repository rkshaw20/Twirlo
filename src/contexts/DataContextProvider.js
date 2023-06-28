import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useAuthContext } from './AuthContextProvider';
import { getAllPost, getAllPostOfUser } from '../services/DataServices';
import { dataInitialState, dataReducer } from '../reducers/DataReducer';

const DataContext = createContext({
  allPost: [],
  userAllPost: [],
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
      getAllPost(token, dispatch, setLoader);
      getAllPostOfUser(token, user._id, dispatch, setLoader);
    }
  }, [token,user]);

  

  return (
    <DataContext.Provider
      value={{
        userAllPost: state.userAllPost,
        allPost: state.allPost,
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
