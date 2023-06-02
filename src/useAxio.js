import axios from "axios";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useAxios = ({
  method,
  url,
  body = null,
  config,
  axiosInstance = axios,
}) => {
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

  const executeGet = useCallback(async () => {
    console.log("executeGet!!");
    console.log("url:", url);
    try {
      setResponse(null);
      setError(null);
      setloading(true);

      const response = await axiosInstance.request({
        url,
        method: "get",
        config,
      });
      setResponse(response.data);
      setError(null);
      setloading(false);
    } catch (error) {
      setResponse(null);
      setError(error);
      setloading(false);
    }
  }, [method, url, axiosInstance]);

  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const executePost = useCallback(
    async ({ url, data, config }) => {
      console.log("executePost");
      console.log("data:", data);
      console.log("url:", url);
      console.log("config:", config);
      try {
        //setState({ data: null, loading: true, error: null });
        setResponse(null);
        setError(null);
        setloading(true);
        const response = await axiosInstance.request({
          url,
          method: "post",
          options: {
            config,
          },
          data,
        });
        console.log("!!");

        //setResponse(response.data);
        setError(null);
        setloading(false);
      } catch (error) {
        setResponse(null);
        setError(error);
        setloading(false);
      }
    },
    [method, url, axiosInstance]
  );

  return { response, error, loading, executePost, executeGet, refetch };
};

export default useAxios;
