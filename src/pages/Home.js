/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import SwipeableViews from "react-swipeable-views";

import classNames from "classnames";
import "./Home.css";
import { HomeTab2, HomeTab3, HomeTab4, ListPost } from "../view";

function TabFunc({ Props }) {
  const { opts, stat } = Props;

  const { tabIndex, setTabIndex } = stat;

  const handleChangeIndex = index => {
    setTabIndex(index);
  };

  return (
    <>
      <div className="tab_scroll">
        <ul className="tab">
          {opts.map((opt, index) => (
            <li
              key={index}
              className={classNames("li", { active: tabIndex === index })}
            >
              <a
                key={`index_${index}`}
                type="button"
                onClick={e => {
                  setTabIndex(index);
                  e.preventDefault();
                }}
              >
                {opt}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <SwipeableViews index={tabIndex} onChangeIndex={handleChangeIndex}>
        {tabIndex === 0 && <ListPost />}
        {/* {tabIndex === 1 && <HomeTab2 Props={{ ...Props }} />} */}
        {/* {tabIndex === 2 && <HomeTab3 Props={{ ...Props }} />} */}
        {/* {tabIndex === 3 && <HomeTab4 Props={{ ...Props }} />} */}
      </SwipeableViews>
    </>
  );
}

export default function Home({ location: { search }, history }) {
  const [cityName, setCityName] = useState(1);

  // const query = queryString.parse(search);
  // const defaultTabIndex = query.tab_index ? parseInt(query.tab_index, 10) : 0;
  const defaultTabIndex = 0;
  const [tabIndex, setTabIndex] = useState(defaultTabIndex || 0);

  // const opts = ["Upper List Post", "Create Post", "List Post", "Read Post"];
  const opts = ["List Post"];
  const Props = {
    opts,
    stat: { tabIndex, setTabIndex },
    cityName,
    setCityName
  };
  return <>{TabFunc({ Props })}</>;
}
