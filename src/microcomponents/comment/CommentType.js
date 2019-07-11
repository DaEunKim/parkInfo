// 포스트의 댓글에 들어가는 양식
import React, { useState } from "react";
import { calcMadeDate } from "comfunc/CommonFunction";
import moment from "moment";
import { API_URL } from "CONSTANTS/url";
import axios from "axios";

function pushLiked({ liked, auth, comment_id }) {
  axios({
    method: liked ? "delete" : "post",
    url: `${API_URL}/api/gdny/v1/comments/${comment_id}/likes`,
    headers: { ...auth }
  });
}

export default function CommentType({ Props }) {
  const { comment, auth } = Props;
  const { nickname, body, created_at, current_user_actions, id } = comment;

  const [liked, setLiked] = useState(current_user_actions.liked);

  return (
    <>
      <div key={id} className="post-comment__list__item">
        <b className="post-comment__name">{nickname}</b>
        <span className="post-comment__time">
          {calcMadeDate(moment(created_at).toISOString())}
        </span>
        <p className="post-comment__text">{body}</p>
        <button
          type="button"
          className={liked ? "post-comment__like active" : "post-comment__like"}
          onClick={e => {
            e.preventDefault();
            pushLiked({ liked, auth, comment_id: id });
            setLiked(!liked);
          }}
        >
          <span>댓글공감하기</span>
        </button>
      </div>
    </>
  );
}
