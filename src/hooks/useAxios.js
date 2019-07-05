/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
// import queryString from "query-string";
import axios from "axios";

class DataFetcher extends React.Component {
  state = {
    data: null
  };
  componentDidMount() {
    const { url, parseData } = this.props;
    axios(url).then(response => {
      const data = parseData(response.data);
      this.setState({ data });
    });
  }
  render() {
    const { children } = this.props;
    const { data } = this.state;
    if (data == null) {
      return <p> loading...</p>;
    } else {
      return children({ data });
    }
  }
}

export default function useAxios() {
  const APPID = `bf433117441b83694e383606086227c9`;
  const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=${APPID}`;
  return (
    <DataFetcher url={weatherApi}>
      {({ data }) => <div> {data}</div>}
    </DataFetcher>
  );
}
