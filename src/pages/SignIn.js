// 로그인

// 최상단 페이지
// 로그인 페이지 -> 회원이면 로그인, 비회원이면 회원가입 페이지
import React, { useState } from "react";
import "./style-narrower.css";
import queryString from "query-string";
import useAxios from "../hooks/useAxios";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";

export default function SignIn({ location: { search } }) {
  const query = queryString.parse(search);
  console.log(query);
  const { creator, id, time, title } = query;

  return <>dd</>;
}
