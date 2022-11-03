import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom"
import { getSongComments } from "../../store/songs"
import CommentForm from "../CommentForm";
import EditSong from "../EditSong";


function AudioPlayer() {
  const dispatch = useDispatch();
  const { songId } = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const [editId, setEditId] = useState(null)
  const [EditForm, setEditForm] = useState(false)
  const song = useSelector(state => state.song[songId])
  const comments = useSelector(state => state.song.comments)
  console.log(comments, "<=== comments")
  useEffect(() => {
    dispatch(getSongComments(songId))
  }, [dispatch])

  return (
    <div>
      <figure>
        <figcaption>{song?.title}</figcaption>
        <audio
          controls
          src={song?.url}>
          <a href="https://andresoundcloud.s3.us-west-1.amazonaws.com/just+friends.mp3">
            Download audio
          </a>
        </audio>
      </figure>
      {sessionUser ? (<button onClick={() => setEditForm(true)} />) : null}
      <div>
        <h2>Comments</h2>
        {comments?.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.body}</p>
              <h4>{comment.User.username}</h4>
            </div>

          )
        })}

      </div>
      <CommentForm />
    </div>
  )
}




export default AudioPlayer;
