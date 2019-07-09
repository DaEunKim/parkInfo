/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";

import axios from "axios";

export default function useAxios({ API }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(API);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [API]);

  return { data, isLoading, isError };
}
