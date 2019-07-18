// 게시판
import React from "react";
import useAxios from "../hooks/useAxios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Board } from "../pages";

// import { HomeTab4 } from "./HomeTab4";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// function Lower({ id }) {
//   const ReadPostUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/read/${id}`;
//   const getReadPost = useAxios({
//     url: `${ReadPostUrl}`,
//     method: "get"
//   });
//   return <HomeTab4 getReadPost={getReadPost} />;
// }

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
      <button
        onClick={e => {
          e.preventDefault();
        }}
      >
        글쓰기
      </button>

      {posts.map(post => {
        const { createTime, creator, id, likeCount, title, viewCount } = post;

        return (
          <>
            {/* <Lower id={id} /> */}
            <ul key={`${id}_ul3`}>
              <li key={`${id}_li3`}>
                <div>
                  <div>{`Time : ${createTime}`}</div>
                  <div>{`creator : ${creator}`}</div>
                  <div>{`title : ${title}`}</div>
                  <div>{`viewCount : ${viewCount}`}</div>
                  <div>{`likeCount : ${likeCount}`}</div>
                </div>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}
export default function ListPost() {
  const ListPostUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/list`;
  const getListPost = useAxios({
    url: `${ListPostUrl}`,
    method: "get"
  });
  console.log(getListPost.data);

  return <>{<List getListPost={getListPost} />}</>;
}
