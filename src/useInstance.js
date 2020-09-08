import { useState, useCallback, useEffect } from "react";
import Axios from "axios";

const url = "https://tmh-queryer.herokuapp.com/";

export const STATE = {
  INIT: "init",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export default () => {
  const [state, setState] = useState(STATE.INIT);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  const load = useCallback(() => {
    setToken(Symbol());
    setState(STATE.LOADING);
  }, []);

  useEffect(() => {
    if (token !== null) {
      const query = async () => {
        const { data, status } = await Axios.get(url);
        try {
          if (status === 200) {
            setState(STATE.SUCCEEDED);
            setData(data);
          } else {
            setState(STATE.FAILED);
          }
        } catch (e) {
          setState(STATE.FAILED);
        }
      };
      query();
    }
  }, [token]);

  return {
    load,
    state,
    data,
  };
};
