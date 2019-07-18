// 게시판
import React from "react";
import useAxios from "../hooks/useAxios";

export default function HomeTab4({ Props }) {
  const { tabIndex } = Props;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const ReadPostUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/read/`;
  const getReadPost = useAxios({
    url: `${ReadPostUrl}`,
    method: "get"
  });
  const { data, isLoading, isError } = getReadPost;
  if (!data) {
    return <></>;
  }
  if (isLoading) {
    return <>loading...!!</>;
  }
  if (isError) {
    return <>error</>;
  }

  return (
    <>
      <ul>
        <li>
          <div>ㅇㅇ</div>
        </li>
      </ul>
    </>
  );
}
