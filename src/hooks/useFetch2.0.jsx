import axios from "axios";
import { useState } from "react";
import { api } from "../utils/api";
function useFetchData2() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const fetchData2 = async (method, url, body) => {
    const token = localStorage.getItem("accessToken");

    try {
      const res = await api.get(url);
      return res?.data
    } catch (err) {
      setError(err);
    }
  };
  return { loading, error, fetchData2 };
}
export default useFetchData2;
