import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxios2({ url, method = "get" }, auth) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  const [trigger, setTrigger] = useState(0);

  // const headers = { uid: auth.uid, "access-token": auth["access-token"] };

  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now());
  };

  // useEffect가 opt객체에 대해서 검사시 마다 다른객체로 인식하기 때문에(useEffect콜이 계속일어남)
  // 편법으로 primative value를 useEffect가 바라볼 수 있게 조치함
  // refetch로 trigger를 바꾸어 axios콜을 새로 할 수 있음
  useEffect(() => {
    const callUrl = async () => {
      try {
        const { data } = await axios({ url, method });
        setState(s => ({ ...s, data }));
      } catch (error) {
        setState(s => ({ ...s, error }));
      } finally {
        setState(s => ({ ...s, loading: false }));
      }
    };
    callUrl();
  }, [trigger]);

  return { ...state, refetch };
}
