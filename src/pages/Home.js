/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, setState } from "react";
import useAxios2 from "../hooks/useAxios2";

// const PhotosEndPoint = "https://jsonplaceholder.typicode.com/photos";
// const ServiceKey =
//   "hOvnmYcLNUIcmKU7ZqAYimjJP8jeE%2FBUq1%2Bt%2B2ZquMGCntSn9WSOWKZ1Vh18uUhgE3gh73VWXLjOvWuK0nILRw%3D%3D";
// const Url = `http://api.data.go.kr/openapi/cty-park-info-std`;
const APPID = `bf433117441b83694e383606086227c9`;
const Sity = `Seoul`;
const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${Sity}&APPID=${APPID}`;

export default function Home({ location: { search }, history }) {
  const weather = useAxios2({ url: `${weatherApi}` });

  const { data, loading, error } = weather;

  if (!data) {
    return <></>;
  }
  console.log(data);
  console.log(data.main);

  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>error</>;
  }
  if (!weather) {
    console.log("null data");
    return <></>;
  }

  return (
    <>
      <div>현재 온도 : {data.main.temp}</div>
      <div>현재 습도 : {data.main.humidity}</div>
    </>
  );
}
