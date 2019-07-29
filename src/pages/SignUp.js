// 회원가입 페이지
import React from "react";
import useAxios from "../hooks/useAxios";
import queryString from "query-string";

import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";

export default function SignUp({ location: { search } }) {
  //  http://lunahc92.tplinkdns.com:5100/api/users/create
  const SignUpUrl = `${PROXY_URL}${HANUL_API}:5100/api/users/create`;
  return (
    <>
      <button
        className="btn-post"
        onClick={e => {
          e.preventDefault();
          window.location = "./board";
        }}
      >
        글쓰기
      </button>
      <br />
      <br />
    </>
  );
}
