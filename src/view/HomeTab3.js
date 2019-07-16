// 게시판
import React from "react";
import useAxios from "../hooks/useAxios";

function List({ getListPost }) {
  const { data, isLoading, isError } = getListPost;

  if (isLoading) {
    return <>loading...</>;
  }
  if (!data) {
    return <>null</>;
  }

  if (isError) {
    return <>error</>;
  }
  const { posts } = data;
  if (!posts) {
    return <></>;
  }
  if (posts.length < 1) return <></>;

  return (
    <>
      {posts.map(post => {
        const { createTime, creator, id, likeCount, title, viewCount } = post;

        return (
          <ul key={`${id}_ul3`}>
            <li key={`${id}_li3`}>
              <div>{`Time : ${createTime}`}</div>
              <div>{`creator : ${creator}`}</div>
              <div>{`title : ${title}`}</div>
              <div>{`viewCount : ${viewCount}`}</div>
              <div>{`likeCount : ${likeCount}`}</div>
            </li>
          </ul>
        );
      })}
    </>
  );
}
export default function HomeTab3({ Props }) {
  const { tabIndex } = Props;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const getUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts`;
  const getData = useAxios({
    url: `${getUrl}`,
    method: "get"
  });

  const ListPostUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/list`;
  const getListPost = useAxios({
    url: `${ListPostUrl}`,
    method: "get"
  });

  const { data, isLoading, isError } = getData;
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
      {<List getListPost={getListPost} />}
      <ul key={`${tabIndex}_ul3`}>
        <li key={`${tabIndex}_li3`}>
          <div>{data.name}</div>
          <div>{data.남자친구}</div>
          <div>{data.사랑해유}</div>
        </li>
      </ul>
    </>
  );
}
