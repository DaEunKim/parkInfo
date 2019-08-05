// 로그인

// 최상단 페이지
// 로그인 페이지 -> 회원이면 로그인, 비회원이면 회원가입 페이지
import React, { useState } from "react";
import "./style-narrower.css";
import queryString from "query-string";
import useAxios from "../hooks/useAxios";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginInfo(userid) {
  const SignInUrl =
    userid && `${PROXY_URL}${HANUL_API}:5100/api/users/read/${userid}`;
  const getSignIn = useAxios({ url: `${SignInUrl}`, method: "get" });

  const { data, isError, isLoading } = getSignIn;

  if (!data) {
    return <></>;
  }
}
// 로그인은 api users login 에
// post로 id:~ password:~

export default function SignIn({ location: { search } }) {
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [checkRes, setCheckRes] = useState();

  //   const SignInUrl =userid && `${PROXY_URL}${HANUL_API}:5100/api/users/read/${userid}`;
  //   const getSignIn = useAxios({ url: `${SignInUrl}`, method: "get" });

  const LoginCheckUrl = `${PROXY_URL}${HANUL_API}:5100/api/users/login`;
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      inputId,
      inputPassword
    };
    axios.post(LoginCheckUrl, data).then(res => {
      if (res.data.success === true) {
        // 페이지 이동
        return <Link to="/" />;
      }
      if (res) {
        console.log(res.data.success);
        setCheckRes(res);
      }
    });
  };

  //   const { data, isError, isLoading } = getSignIn;

  //   if (!data) {
  //     return <></>;
  //   }

  //   const handleSubmit = event => {
  //     event.preventDefault();
  //     if (!inputId) {
  //       return alert("아이디를 입력하세요");
  //     }
  //     if (!inputPassword) {
  //       return alert("비번을 입력하세요");
  //     }
  //   };

  //   if (inputId === data.user && data.user.id) {
  //     if (inputPassword === data.user.password) {
  //       alert("ok ~~");
  //     }
  //   }
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
          로그인
        </button>

        <div className="description">
          <div>회원이 아니신가요?</div>

          <Link to="/signup">회원가입 하러가기</Link>
        </div>
      </div>
    </>
  );
}
