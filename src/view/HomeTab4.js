// 게시판
import React from "react";
import useAxios from "../hooks/useAxios";

export default function HomeTab4({ Props }) {
  const tmp = Props;
  //   console.log(tmp);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const id = "77dc912c-7341-4052-a050-c0ca85e8d5f9";
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
