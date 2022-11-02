import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getSongComments } from "../../store/songs"
import CommentForm from "../CommentForm";

function AudioPlayer() {
  const dispatch = useDispatch();
  const { songId } = useParams()


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

      <div>
        <h2>Comments</h2>
        {comments?.map((comment) => {

          return (
            <div>
              <body>{comment.body}</body>
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
