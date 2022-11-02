import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import NewComment from "./NewComment";

function CommentForm(sessionUser) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <NewComment user={sessionUser} />
    )
  }
  else {
    return <>
      <h1>You must be logged in to post a comment!</h1>
      <button><NavLink exact to="/" /></button>
    </>
  }
}
