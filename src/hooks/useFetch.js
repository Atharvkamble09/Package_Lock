import { useEffect, useState } from "react";
import axios from "axios";


const useFetch = ()=>{
    const url = 'https://api.quicksell.co/v1/internal/frontend-assignment';
    const [data,setData] = useState([]);
    const [loading , setLoading] = useState(true);
    const [apiError,setApiError] = useState(false);

    useEffect(()=>{
        const fun = async ()=>{
                try{
                const res = await axios.get(url);
                setData(res.data);
                setLoading(false);    
            }
            catch(error){
                setData([]);
                setLoading(false);
                setApiError(error);
            }
        }
        fun();
    },[]);

    return {data , loading , apiError}
}

export default useFetch;
