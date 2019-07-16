import React from "react";
export function List(getListPost) {
  const { data, isLoading, isError } = getListPost;
  if (!data) {
    return <></>;
  }
  if (isLoading) {
    return <>loading...</>;
  }
  if (isError) {
    return <>error</>;
  }
  const { posts } = data;
  posts &&
    posts.map(post => {
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
    });
  return <></>;
}
