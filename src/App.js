import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Main, Home, Board, DetailContent, List } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          {/* <nav className="tab_scroll">
            <ul className="tab">
              <li>
                <Link to="/">main</Link>
              </li>
              <li>
                <Link to="/list">list</Link>
              </li>
              <li>
                <Link to="/home">home</Link>
              </li>
              <li>
                <Link to="/board">board</Link>
              </li>
            </ul>
          </nav> */}
          <Route key="switch/main" exact path="/main" component={Main} />
          <Route key="switch/home" exact path="/home" component={Home} />
          <Route key="switch/list" exact path="/" component={List} />
          <Route key="switch/board" exact path="/board" component={Board} />
          <Route
            key="switch/detailcontent"
            path="/detailcontent"
            component={DetailContent}
          />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
