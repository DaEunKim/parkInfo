import React, { useState } from "react";
import axios from "axios";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import "./style-narrower.css";

export default function Board() {
  const createPostUrl = `${PROXY_URL}${HANUL_API}/api/posts/create`;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [creator, setCreator] = useState("");
  const [checkRes, setCheckRes] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    if (!title) {
      return alert("제목을 입력하세요");
    }
    if (!creator) {
      return alert("작성자를 입력하세요");
    }
    if (!text) {
      return alert("내용을 입력하세요");
    }
    const data = {
      title,
      creator,
      text,
      userId: 1
    };

    axios.post(createPostUrl, data).then(res => {
      if (res) {
        setCheckRes(res);
      }
    });
  };

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
        <button className="save-button" onClick={handleSubmit}>
          save
        </button>
        <br />
        <div className="new-todo">{checkRes && "작성완료!"}</div>
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
