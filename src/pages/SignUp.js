// 회원가입 페이지
import React, { useState } from "react";
import "./style-narrower.css";
import axios from "axios";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";

function checkedID(id) {
  const SignInUrl = `${PROXY_URL}${HANUL_API}:5100/api/users/read/${id}`;
  axios
    .get(SignInUrl)
    .then(res => {
      if (res.data.success) {
        return alert("사용할 수 없는 아이디입니다. ");
      }
      return alert("사용할 수 있는 아이디입니다. ");
    })
    .catch(err => {
      console.log(err);
    });
}

export default function SignUp({ location: { search } }) {
  const SignUpUrl = `${PROXY_URL}${HANUL_API}:5100/api/users/create`;

  const [id, setId] = useState("");

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkRes, setCheckRes] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    if (!id) {
      return alert("아이디를 입력하세요");
    }
    if (!password) {
      return alert("비번을 입력하세요");
    }
    if (!name) {
      return alert("이름을 입력하세요");
    }
    if (!email) {
      return alert("이메일을 입력하세요");
    }

    const data = {
      id,
      password,
      name,
      email
    };

    axios
      .post(SignUpUrl, data)
      .then(res => {
        if (res.data.success) {
          console.log(res);
          setCheckRes(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="writing-board-whole">
        <h1 className="titleBar">회원가입</h1>
        <input
          value={id}
          placeholder="id"
          onChange={e => setId(e.target.value)}
        />
        <button
          className="sub-button"
          onClick={e => {
            e.preventDefault();
            checkedID(id);
          }}
        >
          아이디 확인
        </button>
        <br />
        <input
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <input
          value={name}
          placeholder="name"
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          value={email}
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <button className="save-button" onClick={handleSubmit}>
          가입하기
        </button>
        <div className="description">{checkRes && "가입완료!"}</div>
        <button
          className="back-button"
          onClick={e => (window.location = "./signin")}
        >
          로그인하기
        </button>
      </div>
    </>
  );
}
