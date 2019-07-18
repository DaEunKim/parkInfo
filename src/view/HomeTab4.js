// 게시판
import React from "react";
import useAxios from "../hooks/useAxios";

export default function HomeTab4({ Props }) {
  //   const { tabIndex } = Props;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const id = "469ce1ec-01ff-49c5-a36c-905a698e440e";
  const ReadPostUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/read/${id}`;
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

  const { content, success } = data;
  if (success) {
    return (
      <>
        <ul>
          <li>
            <div>{content.text}</div>
          </li>
        </ul>
      </>
    );
  }

  return <></>;
}
