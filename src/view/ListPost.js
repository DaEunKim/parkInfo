/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import "./ListPost.css";

function DeleteFunc(id) {
  const ListDeleteUrl = `${PROXY_URL}${HANUL_API}/api/posts/delete/${id}`;

  return fetch(ListDeleteUrl, {
    method: "DELETE"
  })
    .then(res => res)
    .catch(err => err);
}

function likeClick(e, id, isLikeChecked, setLike) {
  e.preventDefault();

  if (isLikeChecked) {
    setLike(false);
  }

  return setLike(true);
}

function List({ getListPost }) {
  const { data, isLoading, isError } = getListPost;
  const [like, setLike] = useState(0);

  const onChange = useCallback(
    (e, id, isLikeChecked) => {
      likeClick(e, id, isLikeChecked, setLike);
    },
    [like]
  );
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
      {posts.map((post, index) => {
        const { createTime, creator, id, likeCount, title, viewCount } = post;

        return (
          <>
            <ul key={`${id}_ul3`}>
              <li key={`${id}_li3`}>
                <div>
                  {`<${index + 1}>`}
                  <button
                    type="submit"
                    onClick={e => {
                      e.preventDefault();
                      DeleteFunc(id);
                    }}
                  >
                    삭제 X
                  </button>
                </div>
                <Link to={`/detailcontent?id=${id}`}>
                  <div>
                    <div>{`Time : ${createTime}`}</div>
                    <div>{`creator : ${creator}`}</div>
                    <div>{`title : ${title}`}</div>
                    <div>{`viewCount : ${viewCount}`}</div>
                    <div>{`likeCount : ${likeCount}`}</div>
                  </div>
                </Link>

                <a
                  href="#"
                  className={classNames("like", { active: like === true })}
                  onClick={e => {
                    e.preventDefault();
                    onChange(e, id, likeCount);
                  }}
                >
                  좋아용
                </a>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}
export default function ListPost() {
  const ListPostUrl = `${PROXY_URL}${HANUL_API}/api/posts/list`;
  const getListPost = useAxios({
    url: `${ListPostUrl}`,
    method: "get"
  });

  return <>{<List getListPost={getListPost} />}</>;
}
