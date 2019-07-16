import React from "react";
import calculRound from "../components/calculRound";

export default function HomeTab1({ Props }) {
  const {
    tabIndex,
    isError,
    isLoading,
    cityName,
    setCityName,
    data,
    cityListKR
  } = Props;
  return (
    <>
      <ul key={`${tabIndex}_ul1`}>
        <li key={`${tabIndex}_li1`}>
          <h2>도시를 고르시오</h2>
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
        </li>
      </ul>
    </>
  );
}
