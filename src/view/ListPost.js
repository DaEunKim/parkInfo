// 게시판
import React from "react";
import useAxios from "../hooks/useAxios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { DetailContent } from "../pages";

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
          window.location = "./board";
        }}
      >
        글쓰기
      </button>

      {posts.map(post => {
        const { createTime, creator, id, likeCount, title, viewCount } = post;

        return (
          <>
            <Link to={`/detailcontent?id=${id}`}>
              <ul key={`${id}_ul3`}>
                <li key={`${id}_li3`}>
                  <div>
                    <div>{`Time : ${createTime}`}</div>
                    <div>{`creator : ${creator}`}</div>
                    <div>{`title : ${title}`}</div>
                    <div>{`viewCount : ${viewCount}`}</div>
                    <div>{`likeCount : ${likeCount}`}</div>
                  </div>
                  <div>
                    <Switch>
                      <Route
                        key="switch/detail"
                        path="/detailcontent"
                        component={DetailContent}
                      />
                    </Switch>
                  </div>
                </li>
              </ul>
            </Link>
          </>
        );
      })}
    </>
  );
}
export default function ListPost() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const ListPostUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/list`;
  const getListPost = useAxios({
    url: `${ListPostUrl}`,
    method: "get"
  });

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
  const Props = { posts };

  return <>{<List getListPost={getListPost} />}</>;
}
