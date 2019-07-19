import React from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function DeleteFunc(id) {
  const ListDeleteUrl = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/delete/${id}`;
  fetch(ListDeleteUrl, {
    method: "DELETE"
  });

  return alert("ok");
}

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

      {posts.map((post, index) => {
        const { createTime, creator, id, likeCount, title, viewCount } = post;

        return (
          <>
            <Link to={`/detailcontent?id=${id}`}>
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
                  <div>
                    <div>{`Time : ${createTime}`}</div>
                    <div>{`creator : ${creator}`}</div>
                    <div>{`title : ${title}`}</div>
                    <div>{`viewCount : ${viewCount}`}</div>
                    <div>{`likeCount : ${likeCount}`}</div>
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

  return <>{<List getListPost={getListPost} />}</>;
}
