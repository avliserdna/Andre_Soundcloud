import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import NewComment from "./NewComment";
import "./CommentForm.css"
function CommentForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser.username) {
    sessionLinks = (
      <NewComment user={sessionUser} />
    )
    return sessionLinks
  }
  else {
    return <>
      <h1>You must be logged in to post a comment!</h1>
      <button className="button-1"><NavLink to="/login">Login</NavLink></button>
    </>
  }
}

export default CommentForm;
