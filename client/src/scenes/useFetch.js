import { useState, useEffect } from "react";

const useFetch = (url)=> {
    const [data, setData]= useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if (!res.ok){
                throw Error('could not fetch the data');
            }
            return res.json();
        })
        .then(data => {
            console.log("Loading data successfully");
            console.log(data);
            setData(data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log('Error fetching user:', err);
        })
    },[url]);

    return {data,isLoading};
}

export default useFetch;