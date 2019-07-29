import React from "react";
import useAxios from "../hooks/useAxios";
import queryString from "query-string";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import "./style-narrower.css";

export default function DetailContent({ location: { search } }) {
  const query = queryString.parse(search);
  const { creator, id, time, title } = query;

  const ReadPostUrl = `${PROXY_URL}${HANUL_API}/api/posts/read/${id}`;
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
      <div className="writing-board-whole">
        <h3 className="titleBar">상세 내용</h3>
        <h1>{title}</h1>
        <div>{creator}</div>
        <div>{time}</div>
        <div>{content.text}</div>
      </div>
    );
  }

  return <></>;
}
