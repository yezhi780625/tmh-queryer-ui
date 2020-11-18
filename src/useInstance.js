import { useState, useCallback, useEffect, useRef } from "react";
import Axios from "axios";

const url = process.env.REACT_APP_URL;
// const url = "http://localhost:3000";

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
  const sp = useRef();

  const load = useCallback((fromDate, toDate, days) => {
    sp.current = { fromDate, toDate, days };
    setToken(Symbol());
    setState(STATE.LOADING);
  }, []);

  useEffect(() => {
    if (token !== null) {
      const query = async () => {
        const { data, status } = await Axios.get(url, {
          params: sp.current,
        });
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
