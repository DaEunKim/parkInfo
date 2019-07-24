/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";

import "./Home.css";
import { HomeTab1 } from "../view";
import useAxios from "../hooks/useAxios";

const cityList = [
  { id: 1, value: "Seoul" },
  { id: 2, value: "Busan" },
  { id: 3, value: "Wonju" },
  { id: 4, value: "Sogcho" },
  { id: 5, value: "Ansan" },
  { id: 6, value: "Incheon" },
  { id: 7, value: "Jeonju" },
  { id: 8, value: "Masan" },
  { id: 9, value: "Jeju" },
  { id: 10, value: "London" },
  { id: 11, value: "Tokyo" },
  { id: 12, value: "Osaka-shi" }
];
const cityListKR = [
  { id: 1, value: "서울" },
  { id: 2, value: "부산" },
  { id: 3, value: "원주" },
  { id: 4, value: "속초" },
  { id: 5, value: "안산" },
  { id: 6, value: "인천" },
  { id: 7, value: "젼주" },
  { id: 8, value: "마산" },
  { id: 9, value: "제주" },
  { id: 10, value: "런던" },
  { id: 11, value: "동경" },
  { id: 12, value: "오사카" }
];

const APPID = `bf433117441b83694e383606086227c9`;

export default function Main({ location: { search }, history }) {
  const [cityName, setCityName] = useState(1);

  // const query = queryString.parse(search);
  // const defaultTabIndex = query.tab_index ? parseInt(query.tab_index, 10) : 0;
  const defaultTabIndex = 0;
  const [tabIndex, setTabIndex] = useState(defaultTabIndex || 0);

  const CityNameAPI = cityName === 1 ? "Seoul" : cityList[cityName - 1].value;

  const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${CityNameAPI}&APPID=${APPID}`;
  const { data, isLoading, isError } = useAxios({
    url: `${weatherApi}`,
    method: "get"
  });
  if (!data) {
    return <></>;
  }
  if (isError) {
    return <>error</>;
  }
  if (isLoading) {
    return <>loading...</>;
  }

  const Props = {
    stat: { tabIndex, setTabIndex },
    cityName,
    setCityName,
    data,
    cityListKR
  };
  return (
    <>
      <HomeTab1 Props={{ ...Props }} />
    </>
  );
}
