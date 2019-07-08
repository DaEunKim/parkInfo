/* eslint-disable react/react-in-jsx-scope */
import React, { Component, setState, useEffect } from "react";

import axios from "axios";

export default class useAxios extends Component(url) {
  state = { data: [] };
  componentDidMount() {
    axios.get(url).then(res => {
      const datatata = res.data;
      this.setState({ datatata });
    });
  }
  render() {
    return { url };
  }
}
