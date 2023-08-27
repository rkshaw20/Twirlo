import { useEffect } from "react";


const useBlur=(initialFocusRef,onClose)=>{
    const handleClick=(e)=>{
        if(e.target !== initialFocusRef.current){
            onClose();
        }
    }

    useEffect(()=>{
        window.addEventListener('click',handleClick);
        return ()=>{
            window.removeEventListener('click',handleClick);
        }
    },[])
}

export default useBlur;