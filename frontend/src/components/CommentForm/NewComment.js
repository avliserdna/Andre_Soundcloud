import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addComment } from "../../store/comment";

function NewComment({ user }) {
  const dispatch = useDispatch()
  const history = useHistory()
  // const song = useSelector((state) => state.song)
  const [body, setBody] = useState("")
  const [userId, setUserId] = useState(user?.id)
  // const [songId, setSongId] = useState(swong.id)
  const { songId } = useParams()

  // console.log(song, "<=== SONG")
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      setUserId(user?.id)
    }
    console.log(userId, "<===THIS IS THE USER ID")
    const payload = {
      songId,
      userId,
      body
    }
    console.log(payload, "<=== PAYLOAD COMMENT")
    const createdComment = dispatch(addComment(payload, user))
    console.log(user, "-------------------------------------------------------------------THIS IS THE USER OBJECT")
    if (createdComment) {
      alert("Comment successfully added!")
      setBody("")
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
