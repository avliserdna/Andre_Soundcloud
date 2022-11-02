import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function NewComment({ user }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const song = useSelector((state) => state.song)
  const [body, setBody] = useState("")
  const [userId, setUserId] = useState(user.id)
  const [songId, setSongId] = useState(song.id)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      songId,
      userId,
      body
    }


  }
  return (
    <>
      <section className="new-comment">
        <form className="make-new-comment" onSubmit={handleSubmit}>
          <h3>New Comment</h3>
          <input
            type="textarea">
          </input>
          <button type="submit">
            Post Comment
          </button>
        </form>

      </section>
    </>
  )
}

export default NewComment;
