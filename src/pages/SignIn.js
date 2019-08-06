// 로그인

// 최상단 페이지
// 로그인 페이지 -> 회원이면 로그인, 비회원이면 회원가입 페이지
import React, { useState } from "react";
import "./style-narrower.css";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignIn({ location: { search } }) {
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [checkRes, setCheckRes] = useState();

  const LoginCheckUrl = `${PROXY_URL}${HANUL_API}:5100/api/users/login`;
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: inputId,
      password: inputPassword
    };
    axios.post(LoginCheckUrl, data).then(res => {
      if (res.data.success === true) {
        setCheckRes(res);
        return (window.location = "/");
      } else {
        return alert("아이디 혹은 비밀번호를 다시 입력하세요. ");
      }
    });
  };

  return (
    <>
      <div className="writing-board-whole">
        <h1 className="titleBar">Login</h1>
        <div className="line-wrapper">
          <div className="input-title">ID</div>
          <input
            value={inputId}
            placeholder="ID"
            onChange={e => {
              e.preventDefault();
              setInputId(e.target.value);
            }}
          />
        </div>
        <div className="line-wrapper">
          <div className="input-title">PW</div>
          <input
            value={inputPassword}
            placeholder="PASSWORD"
            type="password"
            onChange={e => {
              e.preventDefault();
              setInputPassword(e.target.value);
            }}
          />
        </div>

        <button className="save-button" onClick={handleSubmit}>
          Login
        </button>

        <div className="description">
          <div>회원이 아니신가요?</div>

          <Link to="/signup">회원가입 하러가기</Link>
        </div>
      </div>
    </>
  );
}
