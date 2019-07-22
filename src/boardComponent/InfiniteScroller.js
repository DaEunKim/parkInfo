import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import queryString from "query-string";
import qwest from "qwest";

// search : header에 들어갈 정보
// url : api Url : per_page 까지 넣어야 함.      ex) {`${API_URL}/api/gdny/v1/boards?mod=my_feed&per_page=${5}`}
// page_default : 시작페이지 (0)으로 해줘야 함      ex) 0
// subcomponent : 배열형으로 받을 component       ex) ProfileTimelineList
// keyword : response로 받을 keyword            ex) boards

const loader = (
  <div className="loader" key={0}>
    Loading...
  </div>
);

export default function InfiniteScroller({
  search,
  url,
  page_default,
  keyword,
  subcomponent,
  tagName,
  className,
  isOwner,
  type
}) {
  const [itemsState, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [classNameState, setClassName] = useState(0);
  const [tagNameState, setTagName] = useState(0);

  if (classNameState === 0) setClassName(className || "");
  if (tagNameState === 0) setTagName(tagName || "");

  function loadItems(page) {
    const query = queryString.parse(search);
    const headers = { uid: query.uid, "access-token": query["access-token"] };

    let curUrl = `${url}&page=${page}`;

    if (nextUrl) {
      curUrl = nextUrl;
    }

    qwest.get(curUrl, {}, { headers }).then((xhr, response) => {
      if (response) {
        const resp = JSON.parse(response);
        const curItems = itemsState;
        resp[keyword].forEach(item => {
          curItems.push(item);
        });
        setItems(curItems);

        if (resp.meta.next_page !== 0) {
          setItems(curItems);
          setNextUrl(`${url}&page=${resp.meta.next_page}`);
        } else {
          setHasMoreItems(false);
        }
      }
    });
  }

  const output = {};
  output[keyword] = itemsState;

  return (
    <>
      <InfiniteScroll
        key="url"
        pageStart={page_default}
        loadMore={loadItems}
        hasMore={hasMoreItems}
        loader={loader}
        className={tagNameState}
        element={classNameState}
      >
        {subcomponent(output, search, isOwner, type)}
        {/* {loader} */}
      </InfiniteScroll>
    </>
  );
}
