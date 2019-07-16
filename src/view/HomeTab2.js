import React, { useState, useCallback } from "react";
import { Link } from "react-router";
import { callNative } from "../components/CommonFunction";
import useAxios from "../hooks/useAxios";
import axios from "axios";

function followClick(
  e,
  isClicked,
  setBookmarkState,
  title,
  setTitle,
  creator,
  setCreator,
  content,
  setContent
) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const postAPI = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/create`;

  // const bookmarkUrl = `${API_URL}/api/gdny/v1/users/${id}/bookmarks`;
  // const query = queryString.parse(search);
  e.preventDefault();

  if (isClicked) {
    setBookmarkState(false);
    setTitle(false);
    setCreator(false);
    setContent(false);
    return axios({
      method: "delete",
      url: postAPI
    });
  }

  return axios({
    url: postAPI,
    method: "post"
    // data: { title: { title }, creator: { creator }, text: { content } }
  }).then(response => {
    if (response.data.meta.status === "error") {
      alert(response.data.meta.alert_message);
    } else {
      setBookmarkState(true);
      setTitle(true);
      setCreator(true);
      setContent(true);
    }
  });
}
const useFetchData = ({ url, headers, payload }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });
  const [error, setError] = useState(0);

  const callAPI = useCallback(() => {
    setRes(prevState => ({ ...prevState, isLoading: true }));
    axios
      .post(url, headers, payload)
      .then(res => {
        console.log(res.data.post.title);
        // console.log(res.data.content.post.title);
        setRes({ data: res.data, isLoading: false, error: null });
      })
      .catch(error => {
        setRes({ data: null, isLoading: false, error });
      });
  }, [url, headers, payload]);
  return [res, callAPI];
};

export default function HomeTab2({ Props }) {
  const { tabIndex } = Props;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const postAPI = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/create`;
  const [res, apiMethod] = useFetchData({
    url: postAPI,
    headers: { ContentType: "text/plain" },
    payload: {}
  });

  const [follow, setFollow] = useState(0);
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitle = e => {
    setTitle(e.target.value);
  };
  const onChangeCreator = e => {
    setCreator(e.target.value);
  };
  const onChangeContent = e => {
    setContent(e.target.value);
  };

  // const onChangePost = useCallback(
  //   (e, followed, title, creator, content) => {
  //     e.preventDefault();
  //     followClick(
  //       e,
  //       followed,
  //       setFollow,
  //       title,
  //       setTitle,
  //       creator,
  //       setCreator,
  //       content,
  //       setContent
  //     // );
  //   },
  //   [follow]
  // );

  // const postAPI = `http://lunahc92.tplinkdns.com/api/posts/create`;
  // const { data, isLoading, isError } = useAxios({
  //   url: `${postAPI}`,
  //   method: "post"
  // });
  // console.log(data);
  return (
    <>
      <ul key={`${tabIndex}_ul2`}>
        <li key={`${tabIndex}_li2`}>
          <div>글쓰기</div>
          <form>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={onChangeTitle}
            />
            <br />
            <input
              type="text"
              placeholder="작성자"
              value={creator}
              onChange={onChangeCreator}
            />
            <br />
            <input
              type="text"
              placeholder="내용"
              value={content}
              onChange={onChangeContent}
            />

            <div>
              <br />
              <p>제목</p>
              <div>{title}</div>
              <br />
              <p>작성자</p>
              <div>{creator}</div>
              <br />
              <p>내용</p>
              <div>{content}</div>
            </div>

            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                apiMethod(title, creator, content);
                // onChangePost(e, follow, title, creator, content);
                // callNative({ pageName: "board", parameter: {} });
              }}
            >
              Submit
            </button>
          </form>
        </li>
      </ul>
    </>
  );
}
