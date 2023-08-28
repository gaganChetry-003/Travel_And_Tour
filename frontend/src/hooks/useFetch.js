

import { useState,useEffect } from "react";
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        console.log("Fetching data...");
        setLoading(true);
        try {
          const res = await fetch(url);
          if (!res.ok) {
            setError('Failed to fetch');
          }
          const result = await res.json();
          console.log("Fetched data:", result.data);
          setData(result.data);
          setLoading(false);
        } catch (err) {
          console.error("Error:", err.message);
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    console.log("State at the end of useFetch:", { data, error, loading });
  
    return {
      data,
      error,
      loading
    };
  };
  
  export default useFetch;
  

