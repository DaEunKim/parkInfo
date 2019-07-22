import React from "react";
import useAxios from "../hooks/useAxios";
import queryString from "query-string";
import "./List.css";
import { ListPost } from "../view";
export default function List({ location: { search } }) {
  return (
    <>
      <section>
        <header>Post List</header>
        <article>
          <nav>
            <button
              className="btn-post"
              onClick={e => {
                e.preventDefault();
                window.location = "./board";
              }}
            >
              글쓰기
            </button>
            <ListPost />
          </nav>
        </article>
      </section>

      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}
