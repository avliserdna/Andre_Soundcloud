import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom"
import { getSongComments } from "../../store/comment"
import CommentForm from "../CommentForm";
import EditSong from "../EditSong";
import { removeSong } from "../../store/songs";
import { removeComment } from "../../store/comment"


function AudioPlayer() {
  const history = useHistory()
  const dispatch = useDispatch();
  const { songId } = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const [deletedComment, setDeleteComment] = useState(null)
  const song = useSelector(state => state.song[songId])
  const allComments = useSelector(state => state.comment)
  const comments = Object.values(allComments)
  console.log(comments, "<=== comments")
  useEffect(() => {
    dispatch(getSongComments(songId))
  }, [dispatch])

  const deleteSong = (e) => {
    e.preventDefault();
    dispatch(removeSong(song))
    alert("Song successfully removed!")
    history.push('/')
  }

  const deleteComment = (e, comment) => {
    e.preventDefault();
    dispatch(removeComment(comment))
    alert("Comment successfully removed!")
    history.push(`/songs/${songId}`)
  }
  return (
    <div class="song">
      <img src={song?.previewImage} />
      {
        console.log(song?.previewImage, "<=== preview image")
      }
      <figure>
        <figcaption>{song?.title}</figcaption>
        <audio
          controls
          src={song?.url}>
          <a href={song?.url}>
            Download audio
          </a>
        </audio>
      </figure>
      {sessionUser?.id === song?.userId && (<NavLink to={`/songs/${song?.id}/edit`}><button>Edit Song</button></NavLink>)}
      {sessionUser?.id === song?.userId ? (<button onClick={(deleteSong)}>Delete Song</button>) : null}
      <div>
        <h2>Comments</h2>
        {comments?.map((comment) => {
          return (
            <div key={comment?.id}>
              <p>{comment?.body}</p>
              <h4>{comment?.User?.username}</h4>
              {sessionUser?.id === comment?.userId ? (<button onClick={(e) => deleteComment(e, comment)}>Delete Comment</button>) : null}
            </div>
          )
        })}

      </div>
      <CommentForm user={sessionUser} />
    </div>
  )
}




export default AudioPlayer;
