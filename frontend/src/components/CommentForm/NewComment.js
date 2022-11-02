import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addComment } from "../../store/songs";

function NewComment({ user }) {
  const dispatch = useDispatch()
  const history = useHistory()
  // const song = useSelector((state) => state.song)
  const [body, setBody] = useState("")
  const [userId, setUserId] = useState(user.id)
  // const [songId, setSongId] = useState(song.id)
  const { songId } = useParams()

  // console.log(song, "<=== SONG")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      songId,
      userId,
      body
    }
    console.log(payload, "<=== PAYLOAD COMMENT")
    const createdComment = dispatch(addComment(payload))

    if (createdComment) {
      alert("Comment successfully added!")
      history.push(`/songs/${songId}`)
    }
  }
  return (
    <>
      <section className="new-comment">
        <form className="make-new-comment" onSubmit={handleSubmit}>
          <h3>New Comment</h3>
          <input
            type="textarea"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}>
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
