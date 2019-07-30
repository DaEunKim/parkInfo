// 로그인

// 최상단 페이지
// 로그인 페이지 -> 회원이면 로그인, 비회원이면 회원가입 페이지
import React, { useState } from "react";
import "./style-narrower.css";
import queryString from "query-string";
import useAxios from "../hooks/useAxios";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import { Link } from "react-router-dom";

function LoginInfo(userid) {
  const SignInUrl =
    userid && `${PROXY_URL}${HANUL_API}:5100/api/users/read/${userid}`;
  const getSignIn = useAxios({ url: `${SignInUrl}`, method: "get" });

  const { data, isError, isLoading } = getSignIn;
  console.log(data);
  if (!data) {
    return <></>;
  }
}
export default function SignIn({ location: { search } }) {
  const query = queryString.parse(search);
  console.log(query);
  if (!query) {
    query = "";
  }
  const { userid } = query;
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (!inputId) {
      return alert("아이디를 입력하세요");
    }
    if (!inputPassword) {
      return alert("비번을 입력하세요");
    }
  };

  //   if (isError) {
  //     return <>error</>;
  //   }
  //   if (isLoading) {
  //     return <>loading...</>;
  //   }
  if (userid === inputId) {
    LoginInfo(userid);
    alert("성공");
  }
  return (
    <>
      <div className="writing-board-whole">
        <h1 className="titleBar">로그인</h1>
        <div className="line-wrapper">
          <div className="input-title">user id</div>
          <input
            value={inputId}
            placeholder="id"
            onChange={e => {
              e.preventDefault();
              setInputId(e.target.value);
            }}
          />
        </div>
        <div className="line-wrapper">
          <div className="input-title">password</div>
          <input
            value={inputPassword}
            placeholder="password"
            type="password"
            onChange={e => {
              e.preventDefault();
              setInputPassword(e.target.value);
            }}
          />
        </div>

        <button className="save-button" onClick={handleSubmit}>
          <Link to={`/signin?userid=${inputId}`}>로그인</Link>
        </button>

        <div className="description">
          <div>회원이 아니신가요?</div>

          <Link to="/signup">회원가입 하러가기</Link>
        </div>
      </div>
    </>
  );
}
