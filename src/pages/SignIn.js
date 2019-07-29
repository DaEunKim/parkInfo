// 로그인

// 최상단 페이지
// 로그인 페이지 -> 회원이면 로그인, 비회원이면 회원가입 페이지
import React, { useState } from "react";
import "./style-narrower.css";
import queryString from "query-string";
import useAxios from "../hooks/useAxios";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import { Link } from "react-router-dom";

export default function SignIn({ location: { search } }) {
  const query = queryString.parse(search);
  console.log(query);
  //   const SignInUrl = `${PROXY_URL}${HANUL_API}:5100/api/users/read/${id}`;
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    if (!id) {
      return alert("아이디를 입력하세요");
    }
    if (!password) {
      return alert("비번을 입력하세요");
    }

    const data = {
      id,
      password
    };
  };

  return (
    <>
      <div className="writing-board-whole">
        <h1 className="titleBar">로그인</h1>
        <input
          value={id}
          placeholder="id"
          onChange={e => setId(e.target.value)}
        />

        <br />
        <input
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button className="save-button" onClick={handleSubmit}>
          로그인
        </button>
        <br />
        <br />
        <div>회원이 아니신가요?</div>
        <Link to="/signup">
          <div>회원가입 하러가기</div>
        </Link>
      </div>
    </>
  );
}
