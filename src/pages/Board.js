import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./style-narrower.css";

function useAsyncEndpoint(fn) {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  const [req, setReq] = useState();

  useEffect(() => {
    if (!req) return;

    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false
    });
    axios(req)
      .then(res =>
        setRes({
          data: res.data,
          pending: false,
          error: false,
          complete: true
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          complete: true
        })
      );
  }, [req]);

  return [res, (...args) => setReq(fn(...args))];
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const todosApi = `${proxyUrl}http://lunahc92.tplinkdns.com/api/posts/create`;

// const todosApi = "https://jsonplaceholder.typicode.com/todos";

function postTodoEndpoint() {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useAsyncEndpoint(data => ({
    url: todosApi,
    method: "POST",
    data
  }));
}

export default function Board() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [creator, setCreator] = useState("");
  const [newTodo, postNewTodo] = postTodoEndpoint();

  function createTodo() {
    if (!title) {
      return alert("제목을 입력하세요.");
    }
    if (!creator) {
      return alert("작성자를 입력하세요.");
    }
    if (!text) {
      return alert("내용을 입력하세요.");
    }
    postNewTodo({
      title,
      creator,
      text,
      userId: 1
    });
  }

  return (
    <>
      <div className="writing-board-whole">
        <h1 className="titleBar">게시판</h1>
        <label>
          Title
          <input
            placeholder="제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Creator
          <input
            placeholder="작성자"
            value={creator}
            onChange={e => setCreator(e.target.value)}
          />
        </label>
        <br />
        <label>
          Text
          <input
            placeholder="내용"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <br />
        <button className="save-button" onClick={createTodo}>
          save
        </button>
        <br />
        <div className="new-todo">
          {(newTodo.pending && "Creating...") ||
            (newTodo.complete &&
              `작성완료!  title : ${newTodo.data.post.title}, 
            creator :  ${newTodo.data.post.creator}`)}
        </div>
        <br />
        <button
          className="back-button"
          onClick={e => {
            e.preventDefault();
            window.location = "./";
          }}
        >
          글 목록으로 가기
        </button>
      </div>
    </>
  );
}
