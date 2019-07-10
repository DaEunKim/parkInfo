/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import calculRound from "../components/calculRound";
// import useAxios from "../hooks/useAxios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
  { id: 10, value: "London" }
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
  { id: 10, value: "런던" }
];
const APPID = `bf433117441b83694e383606086227c9`;
export default function Home() {
  const [cityName, setCityName] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const CityNameAPI = cityName === 1 ? "Seoul" : cityList[cityName - 1].value;

  const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${CityNameAPI}&APPID=${APPID}`;

  // const data2 = useAxios(weatherApi);

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

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>지역별 날씨</Tab>
          <Tab>지도</Tab>
          <Tab>Title 3</Tab>
        </TabList>

        <TabPanel>
          <p>도시를 고르시오</p>
          {isError && <>error</>}
          {isLoading ? (
            <>loading...</>
          ) : (
            <select
              name="city"
              value={cityName}
              onChange={e => setCityName(e.target.value)}
            >
              {cityListKR.map(city => (
                <option key={city.id} value={city.id}>
                  {city.value}
                </option>
              ))}
            </select>
          )}
          <br />
          <br />
          <div>{`위치 : ${data.name} / ${data.sys && data.sys.country}`}</div>
          <div>
            {`현재 기온 : ${data.main &&
              calculRound(data.main.temp - 273.15)}°C`}
          </div>
          <div>{`날씨 상태 : ${data.weather &&
            data.weather[0].description}`}</div>
          <div>{`풍속 : ${data.wind && data.wind.speed}m/s`}</div>
          <div>{`구름 : ${data.clouds && data.clouds.all}%`}</div>
          <div>{`현재 습도 : ${data.main && data.main.humidity}%`}</div>
          <div>{`기압 : ${data.main && data.main.pressure}hPa`}</div>
          <br />
          <div>
            {`최고 기온 : ${data.main &&
              calculRound(data.main.temp_max - 273.15)}°C`}
          </div>
          <div>
            {`최소 기온 : ${data.main &&
              calculRound(data.main.temp_min - 273.15)}°C`}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    </>
  );
}
