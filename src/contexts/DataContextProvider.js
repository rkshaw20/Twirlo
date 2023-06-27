import { createContext, useContext, useState } from "react";

const DataContext=createContext({
    loader:'',
    setLoader:()=>{}
})

export const useDataContext=()=>useContext(DataContext);


const DataContextProvider=({children})=>{
    const [loader,setLoader]=useState(false);

    return(
        <DataContext.Provider value={{loader,setLoader}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;