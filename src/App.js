import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Board } from "./pages";
// const Home = lazy(() => import("pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="switch/home" path="/home" component={Home} />
        <Route key="switch/board" path="/board" component={Board} />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
