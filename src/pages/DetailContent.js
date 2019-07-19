import React from "react";
import useAxios from "../hooks/useAxios";
import queryString from "query-string";

export default function DetailContent({ location: { search } }) {
  const query = queryString.parse(search);
  const { id } = query;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

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
