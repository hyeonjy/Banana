import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useAxios = ({ method, url, config }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setloading(true);
    setTrigger(Date.now());
  };
  const fetchData = () => {
    axios[method](url, config)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [trigger]);

  return { response, error, loading, refetch };
};

export default useAxios;
