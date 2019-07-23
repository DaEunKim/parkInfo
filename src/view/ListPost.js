/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, setState } from "react";
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

function likeClick(e, liked, setLike) {
  e.preventDefault();
  if (liked) {
    return setLike(false);
  }
  return setLike(true);
}

function List({ getListPost }, onChange, like, setLike) {
  const { data, isLoading, isError } = getListPost;
  const [likecount, setLikecount] = useState(0);
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
  let buttonText = like ? "Unlike" : "Like";
  const state = {
    viewIcon:
      "https://png.pngtree.com/element_origin_min_pic/17/09/29/955b938f7a6dffad4141dafdaf9679d2.jpg",
    likeIcon:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple49/v4/46/57/3f/46573f1e-c430-92d4-1f5d-16ccf43f7b15/source/200x200bb.jpg"
  };

  return posts.map((post, index) => {
    const { createTime, creator, id, likeCount, title, viewCount } = post;

    return (
      <>
        <div className="post-box">
          <h4 className="post-title">
            {`${index + 1}. ${title}`}
            <button
              className="post-button"
              type="submit"
              onClick={e => {
                e.preventDefault();
                DeleteFunc(id);
              }}
            >
              삭제 X
            </button>
          </h4>
          <Link to={`/detailcontent?id=${id}`} className="board-list">
            <div>{`${createTime}`}</div>
            <div>{`${creator}`}</div>
          </Link>
          <div className="post-bottom">
            <div className="post-bottom-item">
              <img
                className="post-bottom-item-icon"
                width="20px"
                src={state.viewIcon}
              />
              {viewCount}
            </div>

            <div className="post-bottom-item">
              <img
                className="post-bottom-item-icon"
                width="20px"
                src={state.likeIcon}
                onClick={() => {
                  setLikecount(likecount + 1);
                }}
              />
              {likecount}
              <br />
              {`server : ${likeCount}`}
            </div>
            <button
              className={classNames("like", { active: like })}
              onClick={e => {
                e.preventDefault();
                onChange(e, like);
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </>
    );
  });
}
export default function ListPost() {
  const ListPostUrl = `${PROXY_URL}${HANUL_API}/api/posts/list`;
  const [like, setLike] = useState(-1);

  const getListPost = useAxios({
    url: `${ListPostUrl}`,
    method: "get"
  });
  const onChange = useCallback(
    (e, liked) => {
      likeClick(e, liked, setLike);
    },
    [like]
  );

  return <>{List({ getListPost }, onChange, like, setLike)}</>;
}
