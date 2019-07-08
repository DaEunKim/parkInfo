/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, setState, useState, useEffect } from "react";
import useAxios2 from "../hooks/useAxios2";
import axios from "axios";
import { async } from "q";

// const PhotosEndPoint = "https://jsonplaceholder.typicode.com/photos";
// const ServiceKey =
//   "hOvnmYcLNUIcmKU7ZqAYimjJP8jeE%2FBUq1%2Bt%2B2ZquMGCntSn9WSOWKZ1Vh18uUhgE3gh73VWXLjOvWuK0nILRw%3D%3D";
// const Url = `http://api.data.go.kr/openapi/cty-park-info-std`;
const cityList = [
  { id: 1, value: "Seoul" },
  { id: 2, value: "London" },
  { id: 3, value: "Busan" }
];
const APPID = `bf433117441b83694e383606086227c9`;
export default function Home() {
  const [cityName, setCityName] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const CityNameAPI = cityName === 1 ? "Seoul" : cityList[cityName - 1].value;

  const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${CityNameAPI}&APPID=${APPID}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(weatherApi);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [weatherApi]);

  console.log(data);

  if (!data) {
    return <></>;
  }

  return (
    <>
      {isLoading ? (
        <>loading...</>
      ) : (
        <select
          name="city"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        >
          {cityList.map(city => (
            <option key={city.id} value={city.id}>
              {city.value}
            </option>
          ))}
        </select>
      )}

      <div>현재 위치 : {data.name}</div>
      <div>현재 온도 : {data.main && data.main.temp}</div>
    </>
  );
}
